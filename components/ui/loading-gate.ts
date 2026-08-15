"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * How many loads the app is still waiting on. Anything a page needs before it is
 * worth looking at registers here while it is in flight, and {@link PageLoader}
 * holds its overlay up until the count is back to zero — so a route is revealed
 * whole, rather than as a frame of empty boxes that fill in afterwards.
 *
 * A module-level counter rather than a context: the loader sits in the root
 * layout above every route, so a provider would re-render the entire tree on
 * each register, and there is only ever one loader to inform.
 */
let pending = 0;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((notify) => notify());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Count `active` as one outstanding load for as long as it stays true. */
export function useLoadingGate(active: boolean) {
  useEffect(() => {
    if (!active) return;
    pending++;
    emit();
    return () => { pending--; emit(); };
  }, [active]);
}

/** Server render has no in-flight work, and the overlay starts up regardless. */
export function usePendingLoads() {
  return useSyncExternalStore(subscribe, () => pending, () => 0);
}

/**
 * Resolve once every image the shopper would land on has finished — data being
 * in place is not the same as the page being ready to look at.
 *
 * Only images intersecting the viewport are waited on: everything below the
 * fold is `loading="lazy"` and will not so much as start until it is scrolled
 * to, so counting those would stall every reveal until `cap`.
 */
export function whenImagesSettled(signal: AbortSignal, cap = 3000): Promise<void> {
  if (typeof document === "undefined" || signal.aborted) return Promise.resolve();

  const watched = Array.from(document.images).filter((img) => {
    if (img.complete) return false;
    const box = img.getBoundingClientRect();
    if (!box.width && !box.height) return false;
    return box.top < window.innerHeight && box.bottom > 0;
  });

  if (watched.length === 0) return Promise.resolve();

  return new Promise<void>((resolve) => {
    let outstanding = watched.length;

    const finish = () => {
      watched.forEach((img) => {
        img.removeEventListener("load", settleOne);
        img.removeEventListener("error", settleOne);
      });
      signal.removeEventListener("abort", finish);
      clearTimeout(timer);
      resolve();
    };

    // A broken image still counts as settled — the layout is final either way.
    function settleOne() {
      if (--outstanding === 0) finish();
    }

    watched.forEach((img) => {
      img.addEventListener("load", settleOne);
      img.addEventListener("error", settleOne);
    });

    const timer = window.setTimeout(finish, cap);
    signal.addEventListener("abort", finish, { once: true });
  });
}
