"use client";

import { useEffect, useState } from "react";
import { motion, type Easing } from "framer-motion";
import Image from "next/image";

const IMAGES = [
  "https://framerusercontent.com/images/MAUYaHGrGJiCBtHgnx0o5QQ7sww.png",
  "https://framerusercontent.com/images/stui7nLH0W6suNpRBxaAAz6OFU.png",
  "https://framerusercontent.com/images/Gc6O1F954hURQV76jJmtv0eKhc.png",
];

// Duplicate first image so the loop jump is invisible
const EXTENDED = [...IMAGES, IMAGES[0]];

// spring(duration:2, bounce:0) ≈ expo-out cubic-bezier
const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Per-image: 3s hold + 2s spring transition = 5s. 3 images = 15s total cycle.
const DURATION = 15;
const TIMES    = [0, 3/15, 5/15, 8/15, 10/15, 13/15, 1];
const EASES: Easing[]    = ["linear", SPRING_EASE, "linear", SPRING_EASE, "linear", SPRING_EASE];

interface ImgBoxProps {
  className?: string;
}

export function ImgBox({ className = "" }: ImgBoxProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 810);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const wrapperW = isMobile ? 360 : 600;
  const wrapperH = isMobile ? 420 : 698;
  const imageH   = isMobile ? 420 : 700;

  // y keyframes: hold → spring to next → hold → … → spring to A_dup
  const yVals = [0, 0, -imageH, -imageH, -imageH * 2, -imageH * 2, -imageH * 3];

  if (!mounted) return null;

  return (
    <div
      className={`overflow-clip rounded-none shrink-0 ${className}`}
      style={{ width: wrapperW, height: wrapperH, maxWidth: 600 }}
    >
      <motion.div
        key={isMobile ? "mobile" : "desktop"}
        className="flex flex-col"
        animate={{ y: yVals }}
        transition={{
          duration:   DURATION,
          times:      TIMES,
          ease:       EASES,
          repeat:     Infinity,
          repeatType: "loop",
        }}
      >
        {EXTENDED.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-clip"
            style={{ width: wrapperW, height: imageH, maxWidth: 600 }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 809px) 360px, 600px"
              quality={100}
              unoptimized
              className="object-cover object-center"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
