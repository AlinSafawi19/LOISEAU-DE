"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Logo } from "./logo";
import { HeaderMenu } from "./header-menu";
import { BodySm } from "./typography";

const OPEN  = { ease: [0.15, 0.45, 0.15, 1.35] as [number,number,number,number], duration: 0.6, delay: 0 };
const CLOSE = { ease: [0.44, 0, 0.56, 1]       as [number,number,number,number], duration: 0.4, delay: 0 };

export function LogoXMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="w-full desktop:w-[300px] flex flex-col justify-start items-center gap-[32px] bg-white overflow-clip rounded-none border border-dusty"
      style={{ padding: "12px 16px" }}
    >
      {/* Top Wrapper */}
      <div
        className="w-full flex flex-row justify-between items-center p-0 overflow-visible rounded-none cursor-pointer select-none"
        onClick={() => setIsOpen((v) => !v)}
      >
        <Logo />

        {/* Hamburger Icon Wrapper */}
        <div className="relative w-6 h-[11px] p-0 overflow-clip rounded-none shrink-0">
          {/* Line 1 — closed: full width top / open: half width left */}
          <motion.span
            className="absolute h-px bg-black z-[1] rounded-none"
            animate={isOpen
              ? { width: 12, left: 0, top: 5 }
              : { width: 24, left: 0, top: 0 }
            }
            initial={{ width: 24, left: 0, top: 0 }}
            transition={isOpen ? OPEN : CLOSE}
          />
          {/* Line 2 — closed: full width bottom / open: half width offset right + up */}
          <motion.span
            className="absolute h-px bg-black z-[1] rounded-none"
            animate={isOpen
              ? { width: 12, left: 12, top: 5 }
              : { width: 24, left: 0, top: 10 }
            }
            initial={{ width: 24, left: 0, top: 10 }}
            transition={isOpen ? OPEN : CLOSE}
          />
        </div>
      </div>

      {/* Bottom Wrapper */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="w-full flex flex-col justify-start items-start gap-[80px] p-0 overflow-visible rounded-none"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: OPEN }}
            exit={{ height: 0, opacity: 0, transition: CLOSE }}
          >
            {/* Menus Wrapper */}
            <div className="w-full flex flex-col justify-start items-start gap-[12px] p-0 overflow-visible rounded-none">
              <HeaderMenu title="Home"     href="/"        />
              <HeaderMenu title="Shop All" href="/shop-all"/>
              <HeaderMenu title="About"    href="/about"   />
              <HeaderMenu title="Contact"  href="/contact" />
            </div>

            {/* Img Wrapper */}
            <div className="w-full flex flex-col justify-start items-start gap-[10px] p-0 overflow-visible rounded-none">
              <BodySm className="w-full grow !text-black !text-left">
                Happy to see you again
              </BodySm>
              <div className="relative w-full h-[160px] rounded-none overflow-hidden">
                <Image
                  src="https://framerusercontent.com/images/0HdXEs0k8N5xPfXR0yBSj8ogjrI.png"
                  alt=""
                  fill
                  sizes="(max-width: 1199px) calc(100vw - 32px), 268px"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
