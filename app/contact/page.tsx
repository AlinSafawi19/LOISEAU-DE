"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { H2, H3, ItalicBodyLg, SubtitleMd } from "@/components/ui/typography";
import { FaqCardContact } from "@/components/ui/faq-card";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, along with secure online payment options to ensure a smooth and safe checkout experience.",
  },
  {
    question: "How long does shipping take?",
    answer: "Orders are typically processed within 1–2 business days, with delivery times varying based on your location. You'll receive tracking details once your order is shipped.",
  },
  {
    question: "Can I return or exchange an item?",
    answer: "Yes, we offer a hassle-free return and exchange policy within a specified period. Items must be unused and in their original condition.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a confirmation email with a tracking link to monitor your delivery in real time.",
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We use advanced encryption and secure systems to protect your data and ensure a safe shopping experience.",
  },
];
import { FitText } from "@/components/ui/fit-text";

const SPRING = { type: "spring" as const, duration: 0.6, bounce: 0, delay: 0 };

export default function Contact() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const formEmpty = !name.trim() || !email.trim() || !message.trim();

  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative w-full h-screen flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip">

        {/* LiquidLogo — absolute, fills hero, z-1 */}
        <div className="absolute inset-0 z-[1]">
          <LiquidLogo
            image="https://framerusercontent.com/images/ZbYyoU6EfYLcinn2akWs02lFfg.png?scale-down-to=2048&width=2400&height=1800"
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
            Get in touch
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
            CONTACT
          </FitText>

        </div>

      </section>

      {/* ── FAQ ── */}
      <motion.section
        className="w-full flex flex-col justify-start items-center gap-[10px] p-0 overflow-clip rounded-none bg-lavender"
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
          <div className="w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none z-[2]
            gap-[24px] pt-[48px] px-0 pb-[48px]
            tablet:gap-[24px] tablet:pt-[80px] tablet:px-[24px] tablet:pb-[80px]
            desktop:pt-[120px] desktop:px-[32px] desktop:pb-[120px]">

            {/* Title top wrapper */}
            <div className="w-full flex flex-col justify-start items-center gap-[4px] p-0 overflow-clip rounded-none">
              <H2 className="w-full max-w-[800px] !text-black !text-center [text-wrap:balance]">
                WE CARE OUR CLIENTS
              </H2>
            </div>

            {/* Imgs wrapper */}
            <div className="w-full flex flex-row justify-center items-start overflow-clip rounded-none p-0
              gap-[8px]
              tablet:gap-[16px]
              desktop:gap-[16px]">

              <div className="relative overflow-clip rounded-none
                w-full h-[203px]
                tablet:w-[320px] tablet:h-[372px]
                desktop:w-[320px] desktop:h-[372px]">
                <Image
                  src="https://framerusercontent.com/images/XilcCuWEC92ZjdYJQZwYxEFU.png?width=1200&height=900"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 100vw, 320px"
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                />
              </div>

              <div className="relative overflow-clip rounded-none
                w-full h-[203px]
                tablet:w-[320px] tablet:h-[372px]
                desktop:w-[320px] desktop:h-[372px]">
                <Image
                  src="https://framerusercontent.com/images/qk804I3NvFQTrlK961CHb0Skqtc.png?width=1200&height=1200"
                  alt=""
                  fill
                  sizes="(max-width: 809px) 100vw, 320px"
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                />
              </div>

            </div>

            {/* Title bottom wrapper */}
            <div className="w-full flex flex-col justify-start items-center gap-[4px] p-0 overflow-clip rounded-none">
              <H3 className="w-full max-w-[800px] !text-black !text-center [text-wrap:balance]">
                A refined shopping experience
              </H3>
              <ItalicBodyLg className="w-full max-w-[800px] !text-black !text-center [text-wrap:balance]">
                answers to help you shop with confidence
              </ItalicBodyLg>
            </div>

          </div>

          {/* Questions wrapper */}
          <motion.div
            className="w-full flex flex-col justify-start items-center overflow-visible rounded-none p-0
              gap-[21px]
              tablet:gap-[24px]
              desktop:gap-[24px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ ...SPRING, delay: 0.1 }}
          >
            {FAQS.map((faq) => (
              <FaqCardContact
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                className="w-full max-w-[800px]"
              />
            ))}
          </motion.div>

        </motion.div>

      </motion.section>

      {/* ── Contact Form ── */}
      <section className="relative w-full flex flex-col justify-start items-center gap-0 p-0 overflow-clip rounded-none">

        {/* Background image */}
        <div className="absolute inset-0 z-[1]">
          <Image
            src="https://framerusercontent.com/images/0HdXEs0k8N5xPfXR0yBSj8ogjrI.png?scale-down-to=2048&width=2400&height=1800"
            alt=""
            fill
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Outer container */}
        <div className="relative w-full max-w-[1920px] flex flex-col justify-start items-center overflow-clip rounded-none z-[2]
          gap-[56px] pt-[64px] px-[16px] pb-[64px]
          tablet:gap-[64px] tablet:pt-[80px] tablet:px-[32px] tablet:pb-[80px]
          desktop:gap-[64px] desktop:pt-[80px] desktop:px-[32px] desktop:pb-[80px]">

          {/* Inner container */}
          <div className="w-full max-w-[720px] flex flex-col justify-start items-center overflow-clip rounded-none bg-white
            gap-[64px] p-[32px]
            tablet:p-[80px]
            desktop:p-[80px]">

            {/* Title */}
            <H2 className="w-full !text-black !text-center">Say hello</H2>

            {/* Form */}
            <form className="w-full flex flex-col justify-start items-start gap-[48px] p-0 overflow-hidden rounded-none">

              {/* Inputs wrapper */}
              <div className="w-full flex flex-col justify-start items-start gap-[32px] p-0 overflow-clip rounded-none">

                {/* Name */}
                <div className="w-full flex flex-col justify-start items-center gap-[32px] p-0 overflow-visible rounded-none">
                  <SubtitleMd className="w-full !text-brown !text-left">Name</SubtitleMd>
                  <input
                    type="text"
                    name="Name"
                    placeholder="Jane Smith"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full h-[48px] bg-transparent outline-none border-0 border-b border-beige px-0 pt-0 pb-[8px] font-inter font-normal text-[20px] leading-[1.2] tracking-[0em] text-black placeholder:text-beige"
                    style={{ transition: "border-color 0.3s cubic-bezier(0.44,0,0.56,1)" }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = "var(--color-brown)")}
                    onBlur={e  => (e.currentTarget.style.borderBottomColor = "var(--color-beige)")}
                  />
                </div>

                {/* Email */}
                <div className="w-full flex flex-col justify-start items-center gap-[32px] p-0 overflow-visible rounded-none">
                  <SubtitleMd className="w-full !text-brown !text-left">Email</SubtitleMd>
                  <input
                    type="email"
                    name="Email"
                    placeholder="jane@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-[48px] bg-transparent outline-none border-0 border-b border-beige px-0 pt-0 pb-[8px] font-inter font-normal text-[20px] leading-[1.2] tracking-[0em] text-black placeholder:text-beige"
                    style={{ transition: "border-color 0.3s cubic-bezier(0.44,0,0.56,1)" }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = "var(--color-brown)")}
                    onBlur={e  => (e.currentTarget.style.borderBottomColor = "var(--color-beige)")}
                  />
                </div>

                {/* Message */}
                <div className="w-full flex flex-col justify-start items-center gap-[32px] p-0 overflow-visible rounded-none">
                  <SubtitleMd className="w-full !text-brown !text-left">Message</SubtitleMd>
                  <textarea
                    name="Message"
                    placeholder="Write here"
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full min-h-[100px] bg-transparent outline-none border-0 border-b border-beige px-0 pt-0 pb-[8px] font-inter font-normal text-[20px] leading-[1.2] tracking-[0em] text-black placeholder:text-beige"
                    style={{ resize: "vertical", transition: "border-color 0.3s cubic-bezier(0.44,0,0.56,1)" }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = "var(--color-brown)")}
                    onBlur={e  => (e.currentTarget.style.borderBottomColor = "var(--color-beige)")}
                  />
                </div>

              </div>

              {/* Submit */}
              <div className="w-full flex justify-center">
                <Button type="submit" disabled={formEmpty} />
              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}
