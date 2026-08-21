"use client";

import Image from "next/image";
import { H2, H5, ItalicBodyLg, SubtitleMd } from "@/components/ui/typography";
import { ImgBox } from "@/components/ui/img-box";

export default function About() {
  return (
    <main>

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

        <div className="w-full max-w-[1920px] flex flex-col justify-start items-center gap-[32px] overflow-clip rounded-none bg-dusty
          px-[16px] pb-[48px]
          tablet:px-[24px] tablet:pb-[64px]
          desktop:px-[32px] desktop:pb-[80px]">

          {/* Title wrapper */}
          <div className="w-full max-w-[800px] flex flex-col justify-start items-center gap-[8px] p-0 overflow-clip rounded-none z-[1]">
            <SubtitleMd className="w-auto h-auto z-[1] !text-brown !text-center [text-wrap:balance]">
              Every product we list is made in Korea by the brand named on it. We are a shop, not a laboratory — what we add is the selection, never the formula.
            </SubtitleMd>
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
              <H2 className="w-full max-w-[800px] !text-black !text-center">The selection</H2>
            </div>

            {/* Img wrapper */}
            <div className="w-full flex flex-col justify-start items-center content-center flex-nowrap overflow-clip rounded-none p-0
              gap-[8px]
              desktop:gap-[16px]">
              <div className="relative w-full max-w-[500px] overflow-clip rounded-none
                h-[360px]
                desktop:h-[581px]">
                <Image
                  src="/images/selection.jpg"
                  alt=""
                  fill
                  sizes="500px"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Selection caption */}
            <ItalicBodyLg className="w-auto h-auto !text-black !text-center [text-wrap:balance]">
              Korean skincare, chosen one bottle at a time
            </ItalicBodyLg>

          </div>

        </div>

      </section>

    </main>
  );
}
