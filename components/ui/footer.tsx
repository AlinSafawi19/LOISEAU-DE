"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { H4, SubtitleMd, BodyMd, LinkContact } from "./typography";
import { FooterMenu } from "./footer-menu";
import { FitText } from "./fit-text";

function TruchetOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [c, setC] = useState(14);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = (w: number) => setC(w / 400);
    update(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => update(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const r = c / 2;
  const sw = Math.max(0.3, c * 0.08);

  const arcs = [
    // A(0,0): top-mid → left-mid, CCW
    `M${r},0 A${r},${r} 0 0,0 0,${r}`,
    // B(c,0): top-mid → right-mid, CW
    `M${c+r},0 A${r},${r} 0 0,1 ${c*2},${r}`,
    // B(0,c): top-mid → right-mid, CW
    `M${r},${c} A${r},${r} 0 0,1 ${c},${c+r}`,
    // A(c,c): top-mid → left-mid, CCW
    `M${c+r},${c} A${r},${r} 0 0,0 ${c},${c+r}`,
  ].join(" ");

  return (
    <svg ref={svgRef} className="absolute inset-0 w-full h-full" aria-hidden style={{ zIndex: 2 }}>
      <defs>
        <pattern id="tp" x="0" y="0" width={c * 2} height={c * 2} patternUnits="userSpaceOnUse">
          <path d={arcs} fill="none" stroke="var(--color-accent)" strokeWidth={sw} strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tp)" />
    </svg>
  );
}

function CopyrightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <text x="8" y="11.5" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="inherit">
        C
      </text>
    </svg>
  );
}


export function Footer() {
  return (
    <footer className="w-full flex flex-col justify-start items-center gap-[10px] p-0 bg-black overflow-clip">

      {/* Footer Wrapper */}
      <div className="w-full max-w-[1920px] flex flex-col justify-start items-center gap-[24px]
        px-[16px] pt-[40px] pb-[24px]
        tablet:px-[24px] tablet:pt-[64px]
        desktop:px-[32px] desktop:pt-[80px]">

        {/* ── 1. Graphic Wrapper ── */}
        <div className="w-full flex flex-col desktop:flex-row justify-start items-start
          gap-[40px] desktop:gap-[16px]
          pb-[80px] desktop:pb-[200px]
          overflow-clip rounded-none
          border-b border-dashed border-accent">

          <H4 className="!text-accent w-full desktop:flex-1 !text-left [text-wrap:balance]">
            An e-commerce platform dedicated to quality goods, refined aesthetics, and effortless purchasing.
          </H4>

          {/* Contact details */}
          <div className="w-full desktop:flex-1 flex flex-col tablet:flex-row justify-start items-start gap-[16px] overflow-clip rounded-none">

            <div className="flex-1 flex flex-col justify-start items-start gap-[10px] overflow-clip rounded-none">
              <SubtitleMd className="w-full !text-white [text-wrap:balance]">Address</SubtitleMd>
              <BodyMd className="w-full !text-white [text-wrap:balance]">Market str. 42, CA 10028, USA</BodyMd>
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-[10px] overflow-clip rounded-none">
              <SubtitleMd className="w-full !text-white [text-wrap:balance]">New projects</SubtitleMd>
              <LinkContact href="mailto:sales@loiseau.com" target="_blank" rel="noopener noreferrer">
                sales@loiseau.com
              </LinkContact>
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-[10px] overflow-clip rounded-none">
              <SubtitleMd className="w-full !text-white [text-wrap:balance]">Call us</SubtitleMd>
              <LinkContact href="tel:+12345678900" target="_blank" rel="noopener noreferrer">
                +1 234 56 7890
              </LinkContact>
            </div>

          </div>
        </div>

        {/* ── 2. Content Wrapper ── */}
        <div className="w-full flex flex-col tablet:flex-row justify-between items-center gap-[16px] overflow-clip rounded-none">

          {/* Logo inner wrapper */}
          <div className="w-full tablet:flex-1 flex flex-row justify-start items-center gap-[10px] overflow-clip rounded-none">
            <FooterMenu title="L'OISEAU DÉ" href="/" className="flex-1" />

            {/* Copyright wrapper */}
            <div className="flex-1 flex flex-row justify-start items-center gap-[10px] overflow-clip rounded-none">
              <span className="text-accent flex-shrink-0">
                <CopyrightIcon />
              </span>
              <BodyMd className="!text-accent !text-left [text-wrap:balance]">2026</BodyMd>
            </div>
          </div>

          {/* Footer menu wrapper */}
          <div className="w-full tablet:flex-1 flex flex-row justify-start items-center gap-[10px] overflow-clip rounded-none">
            <FooterMenu title="RETURN POLICY" href="/return-policy" className="flex-1" />
            <FooterMenu title="TERMS OF USE"  href="/terms-of-use"  className="flex-1" />
          </div>

        </div>

        {/* ── 3. Logo wrapper ── */}
        <div className="w-full relative
          pt-[40px] desktop:pt-[80px] pb-0 px-[32px]
          overflow-clip rounded-none">

          {/* Truchet background */}
          {/* Image base layer */}
          <div className="absolute inset-0 z-[1]">
            <Image
              src="https://framerusercontent.com/images/eJz6nSHKQGwj2a2fxzK5jYek.png"
              alt=""
              fill
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </div>

          {/* Truchet overlay (accent background + arc pattern) */}
          <TruchetOverlay />

          {/* Large logotype — font-size scales to fill container */}
          <FitText
            className="relative z-[3] font-clash font-normal clash-features text-center text-white not-italic"
            style={{ letterSpacing: "0em", lineHeight: "1.2" }}
          >
            L&apos;OISEAU DÉ
          </FitText>

        </div>

      </div>
    </footer>
  );
}
