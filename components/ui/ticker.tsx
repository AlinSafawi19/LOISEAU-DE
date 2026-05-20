"use client";

import { useEffect, useRef } from "react";
import type React from "react";

interface TickerProps {
  items: React.ReactNode[];
  gap?: number;
  speed?: number;
  hoverSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Ticker({
  items,
  gap = 24,
  speed = 50,
  hoverSpeed = 100,
  className = "",
  style,
}: TickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const hoveredRef = useRef(false);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (t: number) => {
      const dt = Math.min((t - lastTRef.current) / 1000, 0.1);
      lastTRef.current = t;

      const half = track.scrollWidth / 2;
      if (half > 0) {
        posRef.current -= (hoveredRef.current ? hoverSpeed : speed) * dt;
        if (posRef.current <= -half) posRef.current += half;
        track.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame((t) => {
      lastTRef.current = t;
      rafRef.current = requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, hoverSpeed]);

  // Repeat enough times so half the track always exceeds the container width.
  // Reset happens at scrollWidth/2, so we need (REPS/2) sets to fill any screen.
  const REPS = 20;
  const repeated = Array.from({ length: REPS }, (_, rep) =>
    items.map((item, idx) => ({ item, key: `${rep}-${idx}` }))
  ).flat();

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={style}
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ gap: `${gap}px`, willChange: "transform" }}
      >
        {repeated.map(({ item, key }) => (
          <div key={key} style={{ flexShrink: 0 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
