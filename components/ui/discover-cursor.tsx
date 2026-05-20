"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ButtonSm } from "./typography";

const SPRING = { type: "spring" as const, duration: 0.4, bounce: 0.2 };

interface DiscoverCursorProps {
  visible?: boolean;
}

export function DiscoverCursor({ visible = false }: DiscoverCursorProps) {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Arrow uses raw values — no lag, feels like the real cursor.
  // Pill uses spring — smooth trailing effect.
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Arrow cursor — tip pinned to exact mouse position */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[51]"
        style={{ x: mouseX, y: mouseY }}
        animate={{ opacity: visible ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={visible ? SPRING : { duration: 0 }}
      >
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden>
          <path
            d="M1 1L1 15L5 11L7.5 17L10 16L7.5 10L13 10Z"
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Discover pill — centered at mouse position, spring-smoothed */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[50]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="flex flex-row items-center justify-center gap-[10px] px-[20px] py-[8px] bg-black rounded-none"
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={visible ? SPRING : { duration: 0 }}
        >
          <ButtonSm className="!text-accent">
            Discover
          </ButtonSm>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}
