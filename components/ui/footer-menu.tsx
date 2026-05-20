"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SPRING = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

interface FooterMenuProps {
  title?: string;
  href?: string;
  className?: string;
}

export function FooterMenu({ title = "RETURN POLICY", href = "#", className = "" }: FooterMenuProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.a
      href={href}
      className={`flex flex-row justify-start items-center gap-[10px] p-0 overflow-visible rounded-none w-[275px] cursor-pointer ${className}`}
      initial="default"
      whileHover={isDesktop ? "hover" : undefined}
    >
      <motion.span
        className="font-clash font-normal clash-features text-left tracking-normal not-italic text-[14px] tablet:text-[16px] leading-[1.4]"
        variants={{
          default: { color: "var(--color-accent)" },
          hover:   { color: "var(--color-beige)" },
        }}
        transition={SPRING}
      >
        {title}
      </motion.span>
    </motion.a>
  );
}
