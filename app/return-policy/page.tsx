"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H3, SubtitleMd } from "@/components/ui/typography";
import { FitText } from "@/components/ui/fit-text";

const UTILITY_URL  = `${process.env.CMS_BACKEND_URL}/loiseau-d/utility-pages`;
const API_HEADERS  = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_API_KEY}` };
const SPRING = { type: "spring" as const, duration: 0.6, bounce: 0, delay: 0 };

export default function ReturnPolicy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(UTILITY_URL, { headers: API_HEADERS })
      .then((r) => r.json())
      .then((data) => {
        const entry = (data?.data ?? []).find(
          (e: { Slug: string }) => e.Slug === "return-policy"
        );
        if (entry) setContent(entry.Content ?? "");
      });
  }, []);

  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative w-full h-screen flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/XIIaKxTWNKPpJtjOyvLJ0KYZ2jk.png?scale-down-to=2048&width=2400&height=1800"
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
            Customs
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
            RETURN POLICY
          </FitText>

        </div>

      </section>

      {/* ── Content ── */}
      <motion.section
        className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip rounded-none bg-pistachio"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={SPRING}
      >

        {/* Container */}
        <motion.div
          className="w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none
            gap-[24px] pt-[32px] px-[16px] pb-[48px]
            tablet:gap-0 tablet:pt-[48px] tablet:px-[24px] tablet:pb-[64px]
            desktop:gap-0 desktop:pt-[64px] desktop:px-[32px] desktop:pb-[80px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ ...SPRING, delay: 0.05 }}
        >

          {/* Title wrapper */}
          <div className="w-full flex flex-col tablet:flex-row justify-start items-start gap-[32px] p-0 overflow-clip rounded-none z-[1]">

            {/* Imgs wrapper */}
            <div className="relative tablet:sticky tablet:top-[96px] tablet:self-start w-full flex flex-row justify-center items-start gap-[16px] p-0 overflow-clip rounded-none z-[1]">
              <div className="relative w-full h-[400px] max-h-[400px] overflow-clip rounded-none">
                <Image
                  src="https://framerusercontent.com/images/MAUYaHGrGJiCBtHgnx0o5QQ7sww.png"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 100vw, 50vw"
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Texting wrapper */}
            <div className="w-full flex flex-col justify-start items-start gap-[32px] tablet:gap-[48px] p-0 overflow-clip rounded-none">
              <div className="w-full flex flex-col justify-start items-start gap-[20px] p-0 overflow-clip rounded-none">
                <div
                  className="policy-richtext"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>

          </div>

        </motion.div>

      </motion.section>

    </main>
  );
}
