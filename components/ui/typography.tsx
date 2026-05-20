import { HTMLAttributes } from "react";

// ── Bare class constants for motion.span and inline-text contexts ──────────
export const h2BaseCls =
  "font-clash font-medium clash-features uppercase text-left leading-[1.2] tracking-normal not-italic text-[36px] tablet:text-[40px] desktop:text-[48px]";

export const h5BaseCls =
  "font-clash font-medium clash-features uppercase text-left leading-[1.4] tracking-normal not-italic text-[20px] tablet:text-[24px] desktop:text-[28px]";

export const h6BaseCls =
  "font-clash font-medium clash-features uppercase text-left leading-[1.4] tracking-normal not-italic text-[20px] desktop:text-[24px]";

export const bodySmBaseCls =
  "font-clash font-normal clash-features text-left tracking-normal text-[14px] leading-[1.4]";

export const subtitleSmBaseCls =
  "font-clash font-medium clash-features uppercase text-left tracking-normal text-[14px] leading-[1.4]";

export const buttonSmBaseCls =
  "font-clash font-medium clash-features uppercase text-center leading-[1.2] tracking-normal text-[14px]";

export const footerMenuBaseCls =
  "font-clash font-bold clash-features uppercase text-left leading-[1.4] tracking-normal not-italic text-[16px] tablet:text-[18px] desktop:text-[20px]";

// ── Heading components ─────────────────────────────────────────────────────
export function H1({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-black text-[40px] tablet:text-[48px] desktop:text-[56px] leading-[1.2] ${className}`}
      {...props}
    />
  );
}

export function H2({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-black text-[36px] tablet:text-[40px] desktop:text-[48px] leading-[1.2] ${className}`}
      {...props}
    />
  );
}

export function H3({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-black text-[32px] tablet:text-[36px] desktop:text-[40px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function H4({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-beige text-[24px] tablet:text-[28px] desktop:text-[32px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function H5({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-black text-[20px] tablet:text-[24px] desktop:text-[28px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function H6({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-white text-[20px] desktop:text-[24px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

// ── Body / Subtitle components ─────────────────────────────────────────────
export function SubtitleMd({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-white text-[14px] tablet:text-[16px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function SubtitleSm({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-white text-[14px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function ItalicBodyLg({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-inter font-light italic text-black text-left text-[24px] tablet:text-[28px] desktop:text-[32px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function ItalicBodyMd({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-inter font-light italic text-black text-left text-[16px] tablet:text-[20px] desktop:text-[24px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function ItalicBodySm({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-inter font-light italic text-black text-left text-[14px] tablet:text-[16px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function BodyMd({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-clash font-normal clash-features text-left tracking-normal not-italic text-white text-[14px] tablet:text-[16px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function BodySm({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-clash font-normal clash-features text-left tracking-normal not-italic text-white text-[14px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function BodySmRegular({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-clash font-normal clash-features text-left tracking-normal text-white text-[14px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

// ── Span versions of headings — safe inside <button> elements ─────────────
export function H5Span({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-black text-[20px] tablet:text-[24px] desktop:text-[28px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

export function H6Span({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`font-clash font-medium clash-features uppercase text-left tracking-normal not-italic text-white text-[20px] desktop:text-[24px] leading-[1.4] ${className}`}
      {...props}
    />
  );
}

// ── Button text components (span — safe inside <button> and <a>) ───────────
export function ButtonLg({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`font-clash font-medium clash-features uppercase text-center leading-[1.2] tracking-normal not-italic text-white text-[16px] ${className}`}
      {...props}
    />
  );
}

export function ButtonSm({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`font-clash font-medium clash-features uppercase text-center leading-[1.2] tracking-normal not-italic text-white text-[14px] ${className}`}
      {...props}
    />
  );
}

// ── Link ───────────────────────────────────────────────────────────────────
export function LinkContact({
  className = "",
  style,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & { href?: string; style?: React.CSSProperties, target?: string }) {
  return (
    <a
      className={`text-white hover:text-accent no-underline p-0 rounded-none [transition:color_0.4s_cubic-bezier(0.44,0,0.56,1)] ${className}`}
      style={style}
      {...props}
    />
  );
}
