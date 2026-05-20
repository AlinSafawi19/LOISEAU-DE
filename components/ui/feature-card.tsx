"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Box } from "lucide-react";
import { SubtitleMd, BodySm } from "./typography";

const SPRING = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

interface FeatureCardProps {
  icon?:        ReactNode;
  title?:       string;
  description?: string;
  className?:   string;
}

export function FeatureCard({
  icon        = <Box size={24} strokeWidth={1.5} />,
  title       = "Free Shipping",
  description = "Enjoy fast and free delivery on all orders, with no hidden fees.",
  className   = "",
}: FeatureCardProps) {
  return (
    <motion.div
      className={`flex flex-col justify-start items-start gap-[24px] p-0 overflow-clip rounded-none w-[320px] ${className}`}
      transition={SPRING}
    >
      {/* Icon */}
      <div className="text-black" style={{ width: 24, height: 24 }}>
        {icon}
      </div>

      {/* Details Wrapper */}
      <div className="flex flex-col justify-start items-start gap-[12px] p-0 overflow-clip rounded-none w-[260px]">
        <SubtitleMd className="max-w-[260px] !text-black">
          {title}
        </SubtitleMd>
        <BodySm className="w-full max-w-[260px] !text-black">
          {description}
        </BodySm>
      </div>
    </motion.div>
  );
}
