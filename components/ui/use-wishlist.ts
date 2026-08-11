"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "glaze:wishlist";
// Fires on every change so each mounted card/counter re-reads the same list,
// including the tab that made the change (the native `storage` event does not).
const CHANGE_EVENT = "glaze:wishlist-change";

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

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* storage full or blocked — the in-memory list still updates */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Wishlist of product slugs, persisted in localStorage and shared across every
 * component that calls this hook. `ready` stays false until the first client
 * read so server and client markup match on the initial render.
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
