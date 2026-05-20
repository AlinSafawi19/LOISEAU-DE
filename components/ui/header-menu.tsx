"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ButtonSm } from "./typography";

function SquareArrowRightArrow({ size = 16, strokeWidth = 1.5, className = "" }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 12h8" />
      <path d="m12 8 4 4-4 4" />
    </svg>
  );
}

const MotionButtonSm = motion(ButtonSm);

const TRANSITION = {
  duration: 0.4,
  ease: [0.44, 0, 0.56, 1] as [number, number, number, number],
  delay: 0,
};

interface HeaderMenuProps {
  title?: string;
  href?: string;
  className?: string;
}

export function HeaderMenu({ title = "Home", href = "#", className = "" }: HeaderMenuProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = isDesktop && hovered;

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <a
      href={href}
      className={`flex flex-row justify-start items-center gap-[10px] p-0 overflow-visible rounded-none w-[268px] ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Text */}
      <MotionButtonSm
        className="text-left shrink-0"
        style={{ zIndex: 1 }}
        animate={{ color: active ? "var(--color-brown)" : "var(--color-black)" }}
        transition={TRANSITION}
      >
        {title}
      </MotionButtonSm>

      {/* Line */}
      <div className="flex-1 h-[1px] relative overflow-visible">
        <motion.div
          className="absolute top-0 right-0 h-full bg-brown rounded-none"
          animate={{ width: active ? "100%" : 1 }}
          transition={TRANSITION}
        />
      </div>

      {/* Arrow Right */}
      <motion.span
        className="shrink-0 flex items-center"
        animate={{ opacity: active ? 1 : 0 }}
        transition={TRANSITION}
      >
        <SquareArrowRightArrow size={16} strokeWidth={1.5} className="text-brown" />
      </motion.span>
    </a>
  );
}
