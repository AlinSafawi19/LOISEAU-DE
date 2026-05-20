"use client";

import { motion } from "framer-motion";
import { H2, BodySm } from "./typography";

const SPRING = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const MotionH2     = motion(H2);
const MotionBodySm = motion(BodySm);

const titleVariants = {
  default: { color: "var(--color-black)" },
  hover:   { color: "var(--color-dark-green)" },
};

const detailVariants = {
  default: { color: "var(--color-brown)" },
  hover:   { color: "var(--color-dark-green)" },
};

interface BrandCardProps {
  title?:        string;
  description?:  string;
  productCount?: number;
  href?:         string;
  className?:    string;
}

export function BrandCard({
  title        = "Dior",
  description  = "Beauty and Makeup",
  productCount = 12,
  href         = "#",
  className    = "",
}: BrandCardProps) {
  return (
    <motion.a
      href={href}
      className={`flex flex-col tablet:flex-row justify-start items-start gap-0 tablet:gap-[12px] p-0 rounded-none overflow-visible cursor-pointer ${className}`}
      initial="default"
      whileHover="hover"
      transition={SPRING}
    >
      {/* Title */}
      <MotionH2
        className="leading-[1.2]"
        variants={titleVariants}
        transition={SPRING}
      >
        {title}
      </MotionH2>

      {/* Details Wrapper */}
      <div className="flex flex-col justify-center items-start gap-0 p-0 overflow-clip rounded-none">

        {/* Description */}
        <MotionBodySm
          className=""
          variants={detailVariants}
          transition={SPRING}
        >
          {description}
        </MotionBodySm>

        {/* Counts Wrapper */}
        <div className="flex flex-row justify-start items-center gap-[10px] p-0 overflow-clip rounded-none">
          <MotionBodySm className="" variants={detailVariants} transition={SPRING}>
            {productCount}
          </MotionBodySm>
          <MotionBodySm className="" variants={detailVariants} transition={SPRING}>
            Products
          </MotionBodySm>
        </div>
      </div>
    </motion.a>
  );
}
