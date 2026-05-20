"use client";

import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H3, SubtitleMd } from "@/components/ui/typography";
import { FitText } from "@/components/ui/fit-text";

export default function About() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative w-full h-screen flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/uVIYzrvlrxs0dswtq4SIwUbJRgw.png?scale-down-to=2048&width=2400&height=1600"
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
          <H3 className="absolute top-[120px] right-[32px] !text-accent !text-right z-[1] w-auto">
            Who we are
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
            ABOUT US
          </FitText>

        </div>

      </section>

    </main>
  );
}
