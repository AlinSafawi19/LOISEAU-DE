"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H2, H3, H4, SubtitleMd, ItalicBodyLg, ItalicBodySm } from "@/components/ui/typography";
import { FitText } from "@/components/ui/fit-text";
import { Ticker } from "@/components/ui/ticker";
import { Book } from "@/components/ui/book";
import { OutlineButton } from "@/components/ui/button";
import { NewInTitle } from "@/components/ui/new-in-title";
import { ProductCard } from "@/components/ui/product-card";
import { BrandCard } from "@/components/ui/brand-card";

const EASE = [0.44, 0, 0.56, 1] as const;

function FormingTruchet() {
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
    <svg ref={svgRef} className="absolute inset-0 w-full h-full" aria-hidden>
      <defs>
        <pattern id="forming-tp" x="0" y="0" width={c * 2} height={c * 2} patternUnits="userSpaceOnUse">
          <path d={arcs} fill="none" stroke="var(--color-accent)" strokeWidth={sw} strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#forming-tp)" />
    </svg>
  );
}

const categories = [
  {
    name: "SKINCARE",
    description: "gentle, nourishing, essential",
    mainImage: "https://framerusercontent.com/images/Q47VLts0wZHYv6m7pTOGrZXbPQ.png",
    previewImage: "https://framerusercontent.com/images/dM2O8O1L9vG9OPpdktWUlo5BEH8.png",
    bgColor: "bg-accent",
    reversed: false,
    zIndex: 1,
  },
  {
    name: "COSMETICS",
    description: "Stay beautiful",
    mainImage: "https://framerusercontent.com/images/ODQ36qkhe7tR0sipiZD6Nfl5gg.png",
    previewImage: "https://framerusercontent.com/images/yXRxnphuCuHdNpribjI8JPEnrQU.png",
    bgColor: "bg-warm",
    reversed: true,
    zIndex: 2,
  },
  {
    name: "FACE HEALTH",
    description: "Close-up smiles",
    mainImage: "https://framerusercontent.com/images/VUFOdY8DyW3XNyJHXlrjZz3t8w.png",
    previewImage: "https://framerusercontent.com/images/PglvvWAeYN6FDLuONhirTL5iA.png",
    bgColor: "bg-pistachio",
    reversed: false,
    zIndex: 3,
  },
];

export default function Home() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative w-full h-screen flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/JMlFxkbPdV16dtqSqtwzOcRoCZs.png"
            distortionStrength={0.06}
            hoverRadius={0.07}
            decayTime={1400}
          />
        </div>

        {/* Container — z-2, pointer-none, relative for absolute children */}
        <div
          className="relative z-[2] w-full flex-1 max-w-[1920px] flex flex-col justify-end items-center gap-[64px] overflow-clip pointer-events-none rounded-none"
          style={{ padding: "80px 32px 32px 32px" }}
        >
          {/* Paradis */}
          <H3 className="absolute top-[120px] right-[32px] !text-accent !text-right z-[1] w-auto">
            Paradis
          </H3>

          {/* Subtitles */}
          <div className="w-full flex flex-row justify-between items-center overflow-clip rounded-none border-b border-dashed border-white" style={{ padding: "16px 0" }}>
            <SubtitleMd className="w-auto grow !text-white !text-left">E-commerce</SubtitleMd>
            <SubtitleMd className="w-auto grow !text-white !text-center">Cosmetics</SubtitleMd>
            <SubtitleMd className="w-auto grow !text-white !text-right">Beauty</SubtitleMd>
          </div>

          {/* Hero logotype */}
          <FitText
            className="w-full font-clash font-normal clash-features text-center text-white not-italic"
            style={{ letterSpacing: "0em", lineHeight: "1.2" }}
          >
            L&apos;OISEAU DÉ
          </FitText>

        </div>

      </section>

      {/* ── Discount ── */}
      <section className="w-full flex flex-col justify-end items-center gap-[10px] p-0 overflow-clip rounded-none">

        <div className="w-full flex flex-col justify-end items-center gap-[23px] overflow-clip rounded-none bg-accent py-[24px] px-0 tablet:py-[32px]">

          <Ticker
            items={["NEW IN", "50%", "Discount", "*"].map((t) => (
              <H4 key={t} className="w-auto !text-black !text-center [text-wrap:balance]">{t}</H4>
            ))}
            gap={24}
            speed={50}
            hoverSpeed={100}
            className="w-full z-[2] rounded-[10px] overflow-clip"
          />

        </div>

      </section>

      {/* ── Short Intro ── */}
      <section className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip rounded-none">

        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center gap-[32px] overflow-clip rounded-none z-[2]
          pt-[48px] px-[16px] pb-[48px]
          tablet:pt-[80px] tablet:px-[24px] tablet:pb-[80px]
          desktop:pt-[120px] desktop:px-[32px] desktop:pb-[120px]">

          {/* 1. Title Wrapper */}
          <div className="w-full flex flex-col justify-start items-center gap-[4px] p-0 overflow-clip rounded-none">
            <H2 className="w-full !text-black !text-center [text-wrap:balance]">
              L&apos;OISEAU DÉ IS A MODERN ATELIER
            </H2>
            <ItalicBodyLg className="w-full !text-black !text-center [text-wrap:balance]">
              L&apos;OISEAU DÉ IS A MODERN ATELIER
            </ItalicBodyLg>
          </div>

          {/* 2. Imgs Wrapper */}
          <div className="w-full flex flex-row justify-center items-start overflow-visible rounded-none z-[2] gap-[8px] tablet:gap-[24px]">
            <Book
              title="VELVET CITRUS"
              author="fresh, radiant, uplifting"
              coverSrc="https://framerusercontent.com/images/E6a7MjNJfTJwoQIGy9vZkAmbo.png"
              className="flex-1 !w-full !max-w-[320px] !h-[218px] tablet:!h-[400px]"
            />
            <Book
              title="EARTH NOIR"
              author="warm, sensual, timeless"
              coverSrc="https://framerusercontent.com/images/1KcvzweNQm6syDDQO50GYtIL1g.png"
              className="flex-1 !w-full !max-w-[320px] !h-[218px] tablet:!h-[400px]"
            />
          </div>

          {/* 3. Bottom Body */}
          <div className="w-full flex flex-row justify-center items-center overflow-clip rounded-none gap-[12px] tablet:gap-[16px]">
            <ItalicBodyLg className="w-auto !text-black !text-right [text-wrap:balance]">
              best style for
            </ItalicBodyLg>
            <div className="flex-1 tablet:flex-none tablet:w-[300px] desktop:w-[400px] h-[1px] bg-black overflow-clip rounded-none flex-shrink-0" />
            <ItalicBodyLg className="w-auto !text-black !text-left [text-wrap:balance]">
              and live with
            </ItalicBodyLg>
          </div>

        </div>

      </section>

      {/* ── Categories ── */}
      <section className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">

        {categories.map(({ name, description, mainImage, previewImage, bgColor, reversed, zIndex }) => (
          <div
            key={name}
            className={`sticky top-0 w-full max-w-[1920px] flex flex-col p-0 overflow-clip rounded-none tablet:items-stretch ${reversed ? "tablet:flex-row-reverse" : "tablet:flex-row"}`}
            style={{ zIndex }}
          >

            {/* Imgs Wrapper */}
            <div className="w-full h-[400px] tablet:w-1/2 tablet:h-[692px] relative overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ ease: EASE, duration: 0.6 }}
              >
                <Image
                  src={mainImage}
                  alt={name}
                  fill
                  sizes="(max-width: 809px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-top"
                />
              </motion.div>
            </div>

            {/* Title Wrapper */}
            <div className={`w-full tablet:w-1/2 ${bgColor} flex flex-col justify-start items-center py-[48px] px-[16px] gap-[80px] tablet:py-[80px] tablet:px-[24px] desktop:gap-[184px] desktop:py-[120px] desktop:px-[32px]`}>

              {/* Text block */}
              <div className="w-full flex flex-col gap-[8px] items-center">
                <H4 className="!text-black !text-center">{name}</H4>
                <ItalicBodySm className="!text-black !text-center" style={{ opacity: 0.6 }}>{description}</ItalicBodySm>
              </div>

              {/* Explore sub-wrapper */}
              <div className="flex flex-col items-center gap-[16px]">
                <div className="relative w-[200px] h-[120px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={previewImage}
                    alt=""
                    fill
                    sizes="200px"
                    quality={90}
                    className="object-cover object-top"
                  />
                </div>
                <OutlineButton>Explore</OutlineButton>
              </div>

            </div>

          </div>
        ))}

      </section>

      {/* ── Gallery ── */}
      <section className="w-full flex flex-col items-center justify-start gap-[10px] overflow-visible bg-dark-green rounded-none
        py-[64px] px-0
        tablet:py-[80px]
        desktop:py-[120px]">

        {/* Container */}
        <div className="w-full max-w-[1920px] flex flex-col items-start justify-start overflow-visible rounded-none z-[2]
          gap-[64px] px-[16px]
          tablet:flex-row tablet:gap-[32px] tablet:px-[24px]
          desktop:gap-[32px] desktop:px-[32px]">

          {/* Titles Wrapper */}
          <div className="relative w-full tablet:sticky tablet:top-0 tablet:self-start tablet:max-w-[400px] flex flex-col items-start justify-start gap-[8px] overflow-visible rounded-none
            p-0
            tablet:pt-[80px]
            desktop:pt-[80px]">
            <H4 className="w-full !text-pistachio !text-left [text-wrap:balance]">
              We bring brands to life through
            </H4>
            <NewInTitle className="w-full z-[1]" />
          </div>

          {/* Covers Wrapper */}
          <div className="flex-1 flex flex-col items-start justify-start gap-0 overflow-visible rounded-none">

            {/* Row 1 */}
            <div className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-1 overflow-hidden">
                <Image
                  src="https://framerusercontent.com/images/O6XBkcg3hFpjBWW691c6ywRc4.png"
                  alt=""
                  width={1200}
                  height={900}
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Row 2 — #elegance */}
            <div id="elegance" className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-2 overflow-hidden">
                <Image
                  src="https://framerusercontent.com/images/zbbDbXoot8SIyCil65WxCX1VTI.png"
                  alt=""
                  width={2400}
                  height={1800}
                  sizes="(max-width: 809px) 100vw, 50vw"
                  quality={90}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-1 relative overflow-hidden" style={{ height: 160 }}>
                <Image
                  src="https://framerusercontent.com/images/Zhb1XtfWB8pYnL51t1R3B1RzXxE.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 relative overflow-hidden" style={{ height: 160 }}>
                <Image
                  src="https://framerusercontent.com/images/4ea6FQ9E1U5BMApwsOB29CdxxFE.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 relative overflow-hidden" style={{ height: 146 }}>
                <Image
                  src="https://framerusercontent.com/images/bPNXTyIDbTqSUMEVHfTFZfqs.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Row 5 — #amenity */}
            <div id="amenity" className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-2 overflow-hidden">
                <Image
                  src="https://framerusercontent.com/images/dbOxER3vt6fUIxnLYrhjRH4g7c.png"
                  alt=""
                  width={1200}
                  height={900}
                  sizes="(max-width: 809px) 100vw, 50vw"
                  quality={90}
                  className="w-full h-auto block"
                />
              </div>
              <div className="col-span-1 opacity-0" style={{ height: 160 }} />
              <div className="col-span-1 opacity-0" style={{ height: 160 }} />
            </div>

            {/* Row 6 */}
            <div className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 relative overflow-hidden" style={{ height: 142 }}>
                <Image
                  src="https://framerusercontent.com/images/HKEFVGd6ys7beHYKYOu93dTs14.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
            </div>

            {/* Row 7 — #nature */}
            <div id="nature" className="w-full grid grid-cols-4 gap-0 items-center">
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 relative overflow-hidden" style={{ height: 142 }}>
                <Image
                  src="https://framerusercontent.com/images/Lf1OF5PRh9mPBCHe8MYHsdwdFCk.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
              <div className="col-span-1 opacity-0" style={{ height: 142 }} />
              <div className="col-span-1 relative overflow-hidden" style={{ height: 142 }}>
                <Image
                  src="https://framerusercontent.com/images/JPj0I8zAAq66MSX9CECf0MVNswg.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 50vw, 25vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ── Forming ── */}
      <section className="relative w-full flex flex-col items-center justify-start gap-[10px] p-0 overflow-clip rounded-none">

        {/* Scrolling image ticker */}
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <motion.div
            className="flex flex-row absolute top-0 bottom-0 left-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative flex-shrink-0 h-full" style={{ width: "100vw" }}>
                <Image
                  src="https://framerusercontent.com/images/5NNKQ4BSIWoSfBzymrR6KDmQee8.png"
                  alt=""
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Truchet overlay */}
        <div className="absolute inset-0 z-[2]">
          <FormingTruchet />
        </div>

        {/* Container */}
        <div className="relative w-full max-w-[1920px] flex flex-col items-center justify-center overflow-clip rounded-none z-[3]
          gap-[40px] py-[64px] px-[16px]
          tablet:gap-[160px] tablet:py-[80px] tablet:px-[24px]
          desktop:gap-[120px] desktop:py-[160px] desktop:px-[32px]">

          {([ ["CURATED", "Grace"], ["DAILY LIFE", "For"], ["The", "Simplicity"] ] as const).map(([left, right]) => (
            <div key={left} className="w-full flex flex-row justify-between items-center p-0 overflow-clip rounded-none">
              <H2 className="w-auto !text-accent">{left}</H2>
              <H2 className="w-auto !text-accent">{right}</H2>
            </div>
          ))}

        </div>

      </section>

      {/* ── Featured ── */}
      <section className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-visible rounded-none bg-caledon
        py-[64px]
        tablet:py-[80px]
        desktop:py-[120px]">

        {/* Container */}
        <div className="w-full max-w-[1920px] flex flex-col justify-start items-start overflow-visible rounded-none z-[2]
          gap-[40px] px-[16px]
          tablet:gap-[32px] tablet:px-[24px]
          desktop:gap-[32px] desktop:px-[32px]">

          {/* Title Wrapper */}
          <div className="sticky top-0 w-full max-w-[400px] flex flex-col justify-start items-start gap-[8px] overflow-visible rounded-none p-0 z-[1]">
            <H4 className="w-full !text-brown !text-left [text-wrap:balance]">Featured Products</H4>
          </div>

          {/* Products Wrapper — TODO: replace with /api/loiseau/products?type=new_in&limit=3 */}
          <div
            className="w-full grid grid-cols-1 tablet:grid-cols-3 overflow-visible rounded-none p-0"
            style={{ columnGap: "16px", rowGap: "48px" }}
          >
            <ProductCard className="!w-full" />
            <ProductCard className="!w-full" />
            <ProductCard className="!w-full" />
          </div>

        </div>

      </section>

      {/* ── Brands ── */}
      <section className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip rounded-none bg-pistachio">

        {/* Container */}
        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none
          gap-[24px] py-[48px] px-[16px]
          tablet:py-[64px] tablet:px-[24px]
          desktop:py-[80px] desktop:px-[32px]">

          {/* Brand Wrapper */}
          <div className="w-full flex flex-col justify-start items-start gap-[32px] overflow-clip rounded-none p-0">

            {/* Title Wrapper */}
            <div className="sticky top-0 w-full max-w-[400px] flex flex-col justify-start items-start gap-[8px] overflow-visible rounded-none p-0 z-[1]">
              <H4 className="w-full !text-brown !text-left [text-wrap:balance]">Brands</H4>
            </div>

            {/* Brand Logos Wrapper */}
            <div
              className="w-full flex flex-row flex-wrap justify-start items-start overflow-clip rounded-none py-[24px] px-0"
              style={{
                columnGap: "32px",
                rowGap: "16px",
                borderTop: "1px dashed var(--color-dark-green)",
                borderBottom: "1px dashed var(--color-dark-green)",
              }}
            >
              <BrandCard title="Dior" description="Luxury Fashion" productCount={12} href="/shop-all" />
              <BrandCard title="Estée Lauder" description="Premium Beauty" productCount={8} href="/shop-all" />
              <BrandCard title="Clinique" description="Dermatologist Skincare" productCount={23} href="/shop-all" />
              <BrandCard title="Kiehl's" description="Apothecary Skincare" productCount={34} href="/shop-all" />
              <BrandCard title="L'Oréal" description="Beauty Innovation" productCount={38} href="/shop-all" />
              <BrandCard title="Lancôme" description="Luxury Beauty" productCount={9} href="/shop-all" />
              <BrandCard title="Mac Cosmetics" description="Professional Makeup" productCount={14} href="/shop-all" />
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
