"use client";

import { useCallback, useEffect, useState } from "react";

import { makePusher, pullOnce } from "./use-saved-sync";

const STORAGE_KEY = "glaze:wishlist";
// Fires on every change so each mounted card/counter re-reads the same list,
// including the tab that made the change (the native `storage` event does not).
const CHANGE_EVENT = "glaze:wishlist-change";
const SYNC_URL = "/api/account/wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

const push = makePusher(SYNC_URL);

/** Set once the first pull confirms there is an account behind this browser. */
let signedIn = false;

/** `remote` skips the push, so pulling the server's own list does not echo back. */
function write(slugs: string[], remote = true) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* storage full or blocked — the in-memory list still updates */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  if (remote && signedIn) push({ slugs });
}

async function hydrate(): Promise<void> {
  const res = await fetch(SYNC_URL, { cache: "no-store" });
  const data = (await res.json()) as { signedIn: boolean; slugs: string[] };

  signedIn = data.signedIn;
  if (!data.signedIn) return;

  // A wishlist is a set, so merging is simply the union — nothing a shopper
  // saved on either side is dropped by signing in.
  const merged = [...new Set([...data.slugs, ...read()])];

  write(merged, false);
  push({ slugs: merged });
}

/**
 * Wishlist of product slugs. Held in localStorage and shared across every
 * component that calls this hook; for a signed-in shopper it is also saved to
 * their account, so it survives a cleared browser and follows them between
 * devices. `ready` stays false until the first client read so server and client
 * markup match on the initial render.
 */
export function useWishlist() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSlugs(read());
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

  const toggle = useCallback((slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, count: slugs.length, ready, has, toggle, remove, clear };
}
