"use client";

import Image from "next/image";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H2, H3, H5, ItalicBodyLg, SubtitleMd } from "@/components/ui/typography";
import { FitText } from "@/components/ui/fit-text";
import { ImgBox } from "@/components/ui/img-box";
import { Ticker } from "@/components/ui/ticker";
import { BrandLogo } from "@/components/ui/brand-logo";

const TICKER_1 = [
  { src: "https://framerusercontent.com/images/HAqoJmC6uDrBF5GXDT2oLWXODlo.svg?width=389&height=183", alt: "Brand 1" },
  { src: "https://framerusercontent.com/images/i2Wr6QOsjNJApfHVu4YkrI8.svg?width=364&height=130",    alt: "Brand 2" },
  { src: "https://framerusercontent.com/images/3UOx28WKBALj0p66HA3ixV2Dd5w.svg?width=355&height=121", alt: "Brand 3" },
  { src: "https://framerusercontent.com/images/8RiK4o7scZpKeUhmcaiRY8H4TOQ.svg?width=357&height=150", alt: "Brand 4" },
];

const TICKER_2 = [
  { src: "https://framerusercontent.com/images/23P6ZwK7caiEddSzPFWMb5psTMk.svg?width=407&height=160", alt: "Brand 5" },
  { src: "https://framerusercontent.com/images/GDMYF8sGVMu1nKIKy5GNl7SSFM.svg?width=334&height=166",  alt: "Brand 6" },
  { src: "https://framerusercontent.com/images/3wDVzgrP4w3cOYZkBTQmZFDRvY.svg?width=487&height=196",  alt: "Brand 7" },
];

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

      {/* ── About Info ── */}
      <section className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">

        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none bg-dusty
          gap-[24px] pt-[32px] px-[16px] pb-[48px]
          tablet:gap-[64px] tablet:pt-[48px] tablet:px-[24px] tablet:pb-[64px]
          desktop:gap-[64px] desktop:pt-[64px] desktop:px-[32px] desktop:pb-[80px]">

          {/* Primary title wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center gap-[8px] p-0 overflow-clip rounded-none z-[1]">
            <ItalicBodyLg className="w-auto h-auto z-[1] !text-brown !text-center">
              L&apos;OISEAU DÉ PARADIS
            </ItalicBodyLg>
          </div>

          {/* Img info wrapper */}
          <div className="w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">
            <ImgBox />
          </div>

          {/* Secondary title wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center gap-[8px] p-0 overflow-clip rounded-none z-[1]">
            <H5 className="w-auto h-auto z-[1] !text-brown !text-center [text-wrap:balance]">
              Pairing modern minimalist design with meaningful messaging, we craft exquisite identities that reveal each brand&apos;s unique story.
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
              Our work communicates quality at every touchpoint to create a presence that resonates deeply, generating the trust that leads to marketplace success.
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

        {/* Container 1 */}
        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none
          gap-[24px] pt-[32px] px-[16px] pb-[48px]
          tablet:gap-[64px] tablet:pt-[48px] tablet:px-[24px] tablet:pb-[64px]
          desktop:gap-[64px] desktop:pt-[80px] desktop:px-[32px] desktop:pb-[8px]">

          {/* Title wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center gap-[8px] p-0 overflow-clip rounded-none z-[1]">
            <H3 className="w-auto h-auto !text-brown !text-center">Brands</H3>
            <ItalicBodyLg className="w-auto h-auto !text-brown !text-center">we are partners</ItalicBodyLg>
          </div>

          {/* Brands wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center overflow-clip rounded-none p-0
            gap-[16px]
            tablet:gap-[24px]
            desktop:gap-[16px]">

            {/* Ticker 1 — direction right */}
            <Ticker
              items={TICKER_1.map((b) => (
                <div key={b.src} className="flex flex-row justify-start items-center gap-0 p-0 overflow-clip rounded-none">
                  <BrandLogo src={b.src} alt={b.alt} />
                </div>
              ))}
              gap={16}
              speed={30}
              hoverSpeed={100}
              direction="right"
              className="w-full overflow-clip rounded-none"
            />

            {/* Ticker 2 — direction right */}
            <Ticker
              items={TICKER_2.map((b) => (
                <div key={b.src} className="flex flex-row justify-start items-center gap-0 p-0 overflow-clip rounded-none">
                  <BrandLogo src={b.src} alt={b.alt} />
                </div>
              ))}
              gap={16}
              speed={30}
              hoverSpeed={100}
              direction="right"
              className="w-full overflow-clip rounded-none"
            />

          </div>

        </div>

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
