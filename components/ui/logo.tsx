"use client";

import { motion } from "framer-motion";
import { ButtonLg } from "./typography";

const SPRING = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <motion.div
      className={`flex flex-row justify-start items-center gap-[10px] p-0 overflow-visible rounded-none ${className}`}
      transition={SPRING}
    >
      <ButtonLg className="text-left flex-1 !text-[20px] desktop:!text-[24px] !text-black">
        L&apos;OISEAU DÉ
      </ButtonLg>
    </motion.div>
  );
}
