"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "./use-wishlist";

interface WishlistButtonProps {
  slug:       string;
  title?:     string;
  className?: string;
}

/**
 * Heart toggle for a single product. Sits inside product links, so it stops the
 * click from bubbling up into the surrounding anchor.
 */
export function WishlistButton({ slug, title = "this product", className = "" }: WishlistButtonProps) {
  const { has, toggle, ready } = useWishlist();
  const saved = ready && has(slug);

  return (
    <motion.button
      type="button"
      aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      aria-pressed={saved}
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border-none cursor-pointer transition-colors duration-300 hover:bg-white w-[32px] h-[32px] tablet:w-[37px] tablet:h-[37px] desktop:w-[41px] desktop:h-[41px] ${className}`}
    >
      <Heart
        strokeWidth={1.5}
        className={`${saved ? "text-plum" : "text-brown"} w-[16px] h-[16px] tablet:w-[19px] tablet:h-[19px] desktop:w-[23px] desktop:h-[23px]`}
        fill={saved ? "var(--color-plum)" : "none"}
      />
    </motion.button>
  );
}
