"use client";

import { useEffect, useRef } from "react";
import type React from "react";

interface FitTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FitText({ children, className = "", style = {} }: FitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      if (!el.parentElement) return;
      el.style.fontSize = "100px";
      el.style.width = "max-content";
      const textW = el.getBoundingClientRect().width;
      el.style.width = "";
      const containerW = el.getBoundingClientRect().width;
      if (textW > 0) el.style.fontSize = `${(100 * containerW) / textW}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "block", whiteSpace: "nowrap", ...style }}
    >
      {children}
    </span>
  );
}
