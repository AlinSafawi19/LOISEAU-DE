"use client";

import { Suspense } from "react";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H3, SubtitleMd } from "@/components/ui/typography";
import { Logomark } from "@/components/ui/logomark";
import { ShopSection } from "@/components/ui/shop-section";

export default function ShopAll() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="sticky top-[60px] tablet:top-[68px] desktop:top-[72px] z-[1] relative w-full h-[calc(100vh-60px)] tablet:h-[calc(100vh-68px)] desktop:h-[calc(100vh-72px)] flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/VUFOdY8DyW3XNyJHXlrjZz3t8w.png?scale-down-to=2048&width=2400&height=1800"
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
            Korean skincare
          </H3>

          {/* Subtitles */}
          <div className="w-full flex flex-row justify-between items-center overflow-clip rounded-none border-b border-dashed border-white" style={{ padding: "16px 0" }}>
            <SubtitleMd className="w-auto grow !text-white !text-left">K-Beauty</SubtitleMd>
            <SubtitleMd className="w-auto grow !text-white !text-center">Rituals</SubtitleMd>
            <SubtitleMd className="w-auto grow !text-white !text-right">Radiance</SubtitleMd>
          </div>

          {/* Hero logotype */}
          <Logomark className="text-white" />

        </div>

      </section>

      {/* ShopSection reads `?collection=` — Suspense keeps the hero prerenderable. */}
      <Suspense fallback={null}>
        <ShopSection />
      </Suspense>

    </main>
  );
}
