"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { H3, ItalicBodyMd } from "./typography";

const EASE = [0.44, 0, 0.56, 1] as const;

interface NewInTitleItem {
  id: string;
  label: string;
  number: number;
}

const DEFAULT_ITEMS: NewInTitleItem[] = [
  { id: "elegance", label: "Elegance", number: 1 },
  { id: "amenity",  label: "Amenity",  number: 2 },
  { id: "nature",   label: "Nature",   number: 3 },
];

interface NewInTitleProps {
  items?: NewInTitleItem[];
  className?: string;
}

export function NewInTitle({ items = DEFAULT_ITEMS, className = "" }: NewInTitleProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers = items.map(({ id }, index) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(index); },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [items]);

  const active = items[activeIndex];

  return (
    <div className={`relative w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="flex flex-row items-start gap-[8px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <H3 className="whitespace-nowrap !text-accent">{active.label}</H3>
          <ItalicBodyMd className="!text-accent">{active.number}</ItalicBodyMd>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
