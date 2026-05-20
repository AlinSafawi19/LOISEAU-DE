"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { H6, BodySm } from "./typography";

interface BookProps {
  title?: string;
  author?: string;
  coverSrc?: string;
  className?: string;
}

const SPRING = { type: "spring" as const, duration: 0.6, bounce: 0 };

const containerVariants = {
  closed: { boxShadow: "0 0px 0px rgba(0,0,0,0)" },
  open:   { boxShadow: "0 6px 6px rgba(0,0,0,0.30), 0 10px 15px rgba(0,0,0,0.18), 0 20px 30px rgba(0,0,0,0.12)" },
  mobile: { boxShadow: "0 0px 0px rgba(0,0,0,0)" },
};

const wrapperVariants = {
  closed:  { z: 0 },
  open:    { z: 50 },
  mobile:  { z: 0 },
};

const coverVariants = {
  closed: { rotateX: 0, rotateY: 0,   rotateZ: 0, z: 0,  x: 0 },
  open:   { rotateX: 0, rotateY: -75, rotateZ: 0, z: 10, x: 1 },
  mobile: { rotateX: 0, rotateY: -80, rotateZ: 0, z: 10, x: 0 },
};

export function Book({
  title    = "Steve Jobs",
  author   = "Walter Isaacson",
  coverSrc = "https://framerusercontent.com/images/JXL9OqyS9HXAxdkH6ZGIV5PQXQQ.jpg",
  className = "",
}: BookProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 809;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const variant = isMobile ? (isOpen ? "mobile" : "closed") : "closed";

  return (
    <motion.div
      className={`flex flex-row items-center justify-center gap-[10px] w-[200px] h-[305px] p-0 overflow-visible rounded-none ${isMobile ? "cursor-pointer" : ""} ${className}`}
      style={{ perspective: "1200px" }}
      variants={containerVariants}
      whileHover={isMobile ? undefined : "open"}
      initial={variant}
      animate={variant}
      onClick={isMobile ? () => setIsOpen((v) => !v) : undefined}
    >
      {/* Book Wrapper — lifts in Z on desktop hover; plain 3D context on mobile */}
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center gap-0 p-0 overflow-visible rounded-none"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: isMobile ? "50% 50%" : "100% 50%",
        }}
        variants={wrapperVariants}
        transition={SPRING}
      >
        {/* Paper Wrapper */}
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-[10px] p-[30px] overflow-hidden rounded-none"
          style={{
            background: "linear-gradient(to bottom, #ffffff, #E0E0E0)",
            zIndex: 0,
            transform: "translateZ(-10px)",
          }}
        >
          <H6 className="!text-black" style={{ textAlign: "center" }}>
            {title}
          </H6>
          <BodySm className="!text-black" style={{ textAlign: "center", opacity: 0.3 }}>
            {author}
          </BodySm>
        </div>

        {/* Cover Wrapper */}
        <motion.div
          className="absolute inset-0 flex flex-row items-center justify-center overflow-hidden rounded-none"
          style={{ zIndex: 1, transformOrigin: "0% 50%" }}
          variants={coverVariants}
          transition={SPRING}
        >
          {/* Cover Image */}
          <div className="relative w-full h-full overflow-visible rounded-none">
            <Image
              src={coverSrc}
              alt={title}
              fill
              sizes="(max-width: 809px) 50vw, 320px"
              quality={90}
              className="object-cover object-top"
            />
          </div>

          {/* Visible Light — spine highlight strip */}
          <div
            className="absolute top-0 left-0 overflow-hidden rounded-none"
            style={{
              width: 24,
              height: "100%",
              opacity: 0.2,
              zIndex: 1,
              background:
                "linear-gradient(to right, #483F36 0%, #ffffff 33%, #483F36 66%, #ffffff 100%)",
            }}
          />

          {/* Hidden Light — top-to-bottom white gloss */}
          <div
            className="absolute inset-0 overflow-hidden rounded-none"
            style={{
              zIndex: 1,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
