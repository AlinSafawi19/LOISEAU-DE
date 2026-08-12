"use client";

import Image from "next/image";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H2, H3, H5, ItalicBodyLg, SubtitleMd } from "@/components/ui/typography";
import { Logomark } from "@/components/ui/logomark";
import { ImgBox } from "@/components/ui/img-box";

export default function About() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative w-full h-[calc(100vh-60px)] tablet:h-[calc(100vh-68px)] desktop:h-[calc(100vh-72px)] flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/TkVzmeVSBibyrsJOcu5U4ccoM.png?scale-down-to=2048&width=2400&height=1800"
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
            <SubtitleMd className="w-auto grow !text-white !text-left">K-Beauty</SubtitleMd>
            <SubtitleMd className="w-auto grow !text-white !text-center">Rituals</SubtitleMd>
            <SubtitleMd className="w-auto grow !text-white !text-right">Radiance</SubtitleMd>
          </div>

          {/* Hero logotype */}
          <Logomark className="text-white" />

        </div>

      </section>

      {/* ── About Info ── */}
      <section className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">

        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none bg-dusty
          gap-[24px] pt-[32px] px-[16px] pb-[48px]
          tablet:gap-[64px] tablet:pt-[48px] tablet:px-[24px] tablet:pb-[64px]
          desktop:gap-[64px] desktop:pt-[64px] desktop:px-[32px] desktop:pb-[80px]">

          {/* Img info wrapper */}
          <div className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">
            <ImgBox />
          </div>

          {/* Secondary title wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center gap-[8px] p-0 overflow-clip rounded-none z-[1]">
            <H5 className="w-auto h-auto z-[1] !text-brown !text-center [text-wrap:balance]">
              We source skincare from the Korean houses that formulate it, and pass it on unchanged. Same formula, same bottle, nothing relabelled.
            </H5>
          </div>

        </div>

      </section>

      {/* ── Banner ── */}
      <section className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">

        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center gap-[32px] p-0 overflow-clip rounded-none bg-dusty">

          {/* Title wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center gap-[8px] p-0 overflow-clip rounded-none z-[1]">
            <SubtitleMd className="w-auto h-auto z-[1] !text-brown !text-center [text-wrap:balance]">
              Every product we list is made in Korea by the brand named on it. We are a shop, not a laboratory — what we add is the selection, never the formula.
            </SubtitleMd>
          </div>

          {/* Banner image */}
          <div className="relative w-full overflow-clip rounded-none
            h-[300px] min-h-[300px]
            tablet:h-[445px]
            desktop:h-[700px]">
            <Image
              src="https://framerusercontent.com/images/1jmOTaaHGvnxZVgefdpHOgbt8.png?width=2400&height=1600"
              alt=""
              fill
              sizes="100vw"
              quality={100}
              unoptimized
              className="object-cover object-center"
            />
          </div>

        </div>

      </section>

      {/* ── Our Shop ── */}
      <section className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none bg-beige">

        {/* Container 2 */}
        <div className="relative w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none z-[2]
          gap-[24px] pt-[48px] px-[16px] pb-[48px]
          tablet:pt-[80px] tablet:px-[24px] tablet:pb-[80px]
          desktop:pt-[120px] desktop:px-[32px] desktop:pb-[120px]">

          {/* Shop inner wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center content-center flex-nowrap overflow-clip rounded-none bg-dusty
            gap-[32px] px-[24px] py-[40px]
            desktop:px-[32px] desktop:py-[80px]">

            {/* Title wrapper */}
            <div className="w-full flex flex-col justify-start items-center gap-[4px] p-0 overflow-clip rounded-none">
              <H2 className="w-full max-w-[800px] !text-black !text-center">Our shop</H2>
            </div>

            {/* Img wrapper */}
            <div className="w-full flex flex-col justify-start items-center content-center flex-nowrap overflow-clip rounded-none p-0
              gap-[8px]
              desktop:gap-[16px]">
              <div className="relative w-full max-w-[500px] overflow-clip rounded-none
                h-[360px]
                desktop:h-[581px]">
                <Image
                  src="https://framerusercontent.com/images/WXEexLcx5ozx1Cx5j1y50W2oY0A.png?width=1808&height=2400"
                  alt=""
                  fill
                  sizes="500px"
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Happy to serve you */}
            <ItalicBodyLg className="w-auto h-auto !text-black !text-center [text-wrap:balance]">
              Happy to serve you
            </ItalicBodyLg>

          </div>

        </div>

      </section>

      {/* ── Img Section ── */}
      <section className="w-full flex flex-col justify-start items-center content-center flex-nowrap overflow-clip rounded-none gap-[10px] p-0">
        <div className="relative w-full overflow-clip rounded-none
          h-[300px] min-h-[300px]
          tablet:h-[472px]
          desktop:h-[700px]">
          <Image
            src="https://framerusercontent.com/images/TzT9C4H14CF7XP6sZCbZ0YjNw.png?width=2400&height=1600"
            alt=""
            fill
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-center"
          />
        </div>
      </section>

    </main>
  );
}
