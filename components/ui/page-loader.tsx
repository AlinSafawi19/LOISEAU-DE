"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { GlazeLoader } from "./glaze-loader";
import { usePendingLoads, whenImagesSettled } from "./loading-gate";

/**
 * The first open gets the full, unhurried draw; a page change gets a quicker
 * beat so the loader reads as a transition rather than a wait. `min` keeps a
 * page that was already warm from flashing the overlay for two frames; `cap` is
 * the safety net for a load, a fetch or a navigation that never reports back.
 */
const INTRO = { cycle: "2.6s", min: 1600, cap: 8000 };
const ROUTE = { cycle: "1.6s", min:  700, cap: 8000 };

/** How long the reveal will wait on above-the-fold imagery before giving up. */
const IMAGES = 3000;

/** Matches the fade-out duration on the overlay below. */
const FADE = 420;

type Mode = "intro" | "route";

/**
 * Full-screen GLAZE loader: on the first paint of a fresh page load, and again
 * over every client-side route change. It is the app's only waiting state —
 * pages render nothing until it lifts, rather than putting a spinner of their
 * own in the hole where their data will go.
 *
 * The overlay comes down only once three things are true: the navigation has
 * committed, nothing registered with {@link useLoadingGate} is still in flight,
 * and the imagery on screen has finished. So a page is never revealed half
 * built — if a fetch is slow, the loader keeps drawing until it lands.
 *
 * Route changes are picked up from link clicks at the document level rather
 * than per-`<Link>` `onNavigate`, so every link in the app is covered without
 * each one having to opt in.
 */
export function PageLoader() {
  const pathname = usePathname();
  const pending  = usePendingLoads();

  // Starts as a run in progress so the server-rendered HTML already carries the
  // overlay — the page underneath is never glimpsed before hydration.
  const [run,     setRun]     = useState<{ id: number; mode: Mode } | null>({ id: 0, mode: "intro" });
  const [arrived, setArrived] = useState(false); // navigation committed / window loaded
  const [expired, setExpired] = useState(false); // safety cap reached
  const [leaving, setLeaving] = useState(false);

  const shownAt = useRef(0);
  const runId   = useRef(0);
  const nextId  = useRef(1);
  const current = useRef(pathname);
  const first   = useRef(true);

  const show = useCallback(() => {
    const id = nextId.current++;
    runId.current   = id;
    shownAt.current = Date.now();
    setArrived(false);
    setExpired(false);
    setLeaving(false);
    setRun({ id, mode: "route" });
  }, []);

  // First open — wait for the window `load` event so fonts and hero imagery are
  // in place behind the overlay. Guarded on the run id: a link clicked before
  // `load` fires starts a route run, which must not be settled by this.
  useEffect(() => {
    shownAt.current = Date.now();

    const finish = () => { if (runId.current === 0) setArrived(true); };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => window.removeEventListener("load", finish);
  }, []);

  // Navigation start.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Anything but a plain left click opens a tab or a menu instead.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Same page: an in-page anchor, or a filter that only rewrites the query
      // — neither is worth covering the screen for.
      if (url.pathname === window.location.pathname) return;

      show();
    };

    const onPopState = () => {
      if (window.location.pathname !== current.current) show();
    };

    // Capture phase, so a handler that stops propagation cannot hide the
    // navigation from us.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [show]);

  // Navigation end — the new route has rendered. Its data is very likely still
  // loading at this point, which is exactly what `pending` is for.
  useEffect(() => {
    current.current = pathname;
    if (first.current) {
      first.current = false;
      return;
    }
    setArrived(true);
  }, [pathname]);

  // Nothing may hold the overlay hostage: a dead API or an image that never
  // arrives still ends with the page on screen.
  useEffect(() => {
    if (!run) return;
    const timer = window.setTimeout(
      () => setExpired(true),
      run.mode === "intro" ? INTRO.cap : ROUTE.cap,
    );
    return () => clearTimeout(timer);
  }, [run]);

  // The reveal. Re-runs whenever any input changes, so work that starts *after*
  // the overlay was ready to lift — a second fetch, say — cancels the fade and
  // keeps the loader up until that finishes too.
  useEffect(() => {
    if (!run) return;
    if (!expired && !(arrived && pending === 0)) return;

    const abort  = new AbortController();
    const timers: number[] = [];
    const min    = run.mode === "intro" ? INTRO.min : ROUTE.min;

    (async () => {
      if (!expired) await whenImagesSettled(abort.signal, IMAGES);
      if (abort.signal.aborted) return;

      const wait = Math.max(0, min - (Date.now() - shownAt.current));
      timers.push(
        window.setTimeout(() => {
          setLeaving(true);
          timers.push(
            window.setTimeout(() => {
              setRun(null);
              setLeaving(false);
            }, FADE),
          );
        }, wait),
      );
    })();

    return () => {
      abort.abort();
      timers.forEach(clearTimeout);
    };
  }, [run, arrived, pending, expired]);

  // Freeze the page behind the overlay. Deliberately not `use-scroll-lock`:
  // that one restores the previous offset on release, which would undo the
  // scroll-to-top that comes with landing on a new route.
  useEffect(() => {
    if (!run) return;
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => { style.overflow = previous; };
  }, [run]);

  if (!run) return null;

  return (
    <div
      className={`glz-overlay fixed inset-0 z-[500] grid place-items-center bg-blush transition-opacity duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Nothing can dismiss the overlay without JS, so it must not render. */}
      <noscript>
        <style>{".glz-overlay{display:none}"}</style>
      </noscript>
      <GlazeLoader cycle={run.mode === "intro" ? INTRO.cycle : ROUTE.cycle} />
    </div>
  );
}
