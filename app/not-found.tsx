"use client";

import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H1, H3 } from "@/components/ui/typography";
import { FilledButton } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative w-full h-screen flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/JVrIWTNQr8jpKJ4rExXI1XtAz8.png?scale-down-to=2048&width=2400&height=1800"
            distortionStrength={0.06}
            hoverRadius={0.07}
            decayTime={1400}
          />
        </div>

        {/* Container — z-2, pointer-none, relative for absolute children */}
        <div
          className="relative z-[2] w-full flex-1 max-w-[1920px] flex flex-col justify-center items-center gap-[64px] overflow-clip pointer-events-none rounded-none"
          style={{ padding: "80px 32px 32px 32px" }}
        >
          <H3 className="absolute top-[96px] left-[32px] !text-beige !text-left z-[1] w-auto">
            L'O
          </H3>
          <H3 className="absolute top-[96px] right-[32px] !text-beige !text-right z-[1] w-auto">
            ISO
          </H3>
          <H3 className="absolute bottom-[96px] left-[32px] !text-beige !text-left z-[1] w-auto">
            AU
          </H3>
          <H3 className="absolute bottom-[96px] right-[32px] !text-beige !text-right z-[1] w-auto">
            DÉ
          </H3>
          <div className="flex flex-col items-center gap-[24] pointer-events-auto">
            <H1 className="!text-pistachio !text-center z-[1] w-auto max-w-[720px]">
              404:<br/>The page not found
            </H1>
            <a href="/">
              <FilledButton icon={<CornerUpRight size={16} strokeWidth={1.5} />}>
                Back to home
              </FilledButton>
            </a>
          </div>
        </div>

      </section>

    </main>
  );
}
