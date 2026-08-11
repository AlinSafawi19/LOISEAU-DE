"use client";

import { useEffect } from "react";

/**
 * Freezes the page behind an open overlay. `overflow: hidden` alone does not
 * hold on mobile Safari, so the body is pinned at its current offset and the
 * scroll position is restored when the overlay closes.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top:      body.style.top,
      left:     body.style.left,
      right:    body.style.right,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top      = `-${scrollY}px`;
    body.style.left     = "0";
    body.style.right    = "0";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = previous.position;
      body.style.top      = previous.top;
      body.style.left     = previous.left;
      body.style.right    = previous.right;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
