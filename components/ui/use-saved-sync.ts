"use client";

/**
 * Shared plumbing behind the cart and wishlist hooks.
 *
 * Both lists live in localStorage first, so a signed-out shopper keeps working
 * exactly as before and nothing waits on the network. When there is an account,
 * the local list is merged with the stored one once per page load, the merged
 * result is written back to both, and later edits are pushed up debounced.
 *
 * Merging rather than picking a winner is what stops a sign-in from silently
 * throwing away whichever basket the shopper did not happen to be looking at.
 */

/** One shared in-flight request per list, so N mounted hooks pull once. */
const pulls = new Map<string, Promise<unknown>>();

export function pullOnce<T>(url: string, load: () => Promise<T>): Promise<T> {
  let existing = pulls.get(url) as Promise<T> | undefined;
  if (!existing) {
    existing = load().finally(() => {
      // Cleared on settle so a later sign-in re-pulls rather than replaying
      // the signed-out answer.
      pulls.delete(url);
    });
    pulls.set(url, existing);
  }
  return existing;
}

/** Coalesces a burst of edits into one write. */
export function makePusher(url: string, delay = 600) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let latest: unknown;

  return (payload: unknown) => {
    latest = payload;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      void fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(latest),
        keepalive: true,
      }).catch(() => {
        // Offline or signed out — localStorage still holds the truth, and the
        // next edit or page load will try again.
      });
    }, delay);
  };
}
