"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY  = "glaze:cart";
const CHANGE_EVENT = "glaze:cart-change";
// Adding a product asks the global cart drawer to slide open.
const OPEN_EVENT   = "glaze:cart-open";

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

function write(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage full or blocked */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Cart of product slugs and quantities, persisted in localStorage and shared
 * across every component that calls this hook. `ready` stays false until the
 * first client read so server and client markup match on the initial render.
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
