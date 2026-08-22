"use client";

import { useCallback, useEffect, useState } from "react";

import { makePusher, pullOnce } from "./use-saved-sync";

const STORAGE_KEY  = "glaze:cart";
const CHANGE_EVENT = "glaze:cart-change";
// Adding a product asks the global cart drawer to slide open.
const OPEN_EVENT   = "glaze:cart-open";
const SYNC_URL     = "/api/account/cart";

export interface CartLine {
  slug: string;
  qty:  number;
}

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => l && typeof l.slug === "string" && Number.isFinite(l.qty))
      .map((l) => ({ slug: l.slug as string, qty: Math.max(1, Math.floor(l.qty)) }));
  } catch {
    return [];
  }
}

const push = makePusher(SYNC_URL);

/** `remote` skips the push, so pulling the server's own list does not echo back. */
function write(lines: CartLine[], remote = true) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage full or blocked */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  if (remote && signedIn) {
    push({ items: lines.map((l) => ({ Slug: l.slug, Qty: l.qty })) });
  }
}

/** Set once the first pull confirms there is an account behind this browser. */
let signedIn = false;

/**
 * Both baskets are kept, but a quantity is the larger of the two rather than
 * the sum.
 *
 * Summing reads correctly for the case this was written for — a signed-out
 * basket meeting the account's own at sign-in — and is wrong for the case that
 * happens on every page load. `write` pushes to the account the moment the
 * cart changes, so from the second load onwards `local` and `stored` are the
 * same basket read twice, and adding them doubled every line on every
 * navigation: one added to the cart reached checkout as two, and four after
 * that.
 *
 * Distinct products still union, so nothing saved on either side is dropped.
 */
function merge(local: CartLine[], stored: CartLine[]): CartLine[] {
  const totals = new Map<string, number>();
  for (const line of [...stored, ...local]) {
    totals.set(line.slug, Math.max(totals.get(line.slug) ?? 0, line.qty));
  }
  return [...totals].map(([slug, qty]) => ({ slug, qty: Math.min(qty, 999) }));
}

async function hydrate(): Promise<void> {
  const res = await fetch(SYNC_URL, { cache: "no-store" });
  const data = (await res.json()) as {
    signedIn: boolean;
    items: Array<{ Slug: string; Qty: number }>;
  };

  signedIn = data.signedIn;
  if (!data.signedIn) return;

  const stored = data.items.map((i) => ({ slug: i.Slug, qty: i.Qty }));
  const merged = merge(read(), stored);

  // Write locally without pushing, then push the merged result once.
  write(merged, false);
  push({ items: merged.map((l) => ({ Slug: l.slug, Qty: l.qty })) });
}

/**
 * Cart of product slugs and quantities. Held in localStorage and shared across
 * every component that calls this hook; for a signed-in shopper it is also
 * saved to their account, so it survives a cleared browser and follows them
 * between devices. `ready` stays false until the first client read so server
 * and client markup match on the initial render.
 */
export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setLines(read());
    sync();
    setReady(true);
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);

    // Fires the shared pull; the CHANGE_EVENT it raises updates every hook.
    void pullOnce(SYNC_URL, hydrate).catch(() => undefined);

    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    const current  = read();
    const existing = current.find((l) => l.slug === slug);
    write(
      existing
        ? current.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
        : [...current, { slug, qty }]
    );
    window.dispatchEvent(new Event(OPEN_EVENT));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const next = Math.floor(qty);
    write(next < 1 ? read().filter((l) => l.slug !== slug) : read().map((l) => (l.slug === slug ? { ...l, qty: next } : l)));
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return { lines, count, ready, add, setQty, remove, clear };
}

/** Subscribes the global cart drawer to add-to-cart events. */
export function useCartDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  return { open, setOpen };
}
