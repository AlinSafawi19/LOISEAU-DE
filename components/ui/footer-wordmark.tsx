"use client";

import Image from "next/image";
import Link from "next/link";

interface WordmarkImageProps {
  src:   string;
  /** Intrinsic viewBox width; every wordmark is drawn 152 units tall. */
  width: number;
  alt?:  string;
}

/**
 * A stroked wordmark sized by height rather than width, so a long phrase keeps
 * the same cap height as a short one no matter how much wider it runs.
 */
export function WordmarkImage({ src, width, alt = "" }: WordmarkImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={152}
      className="h-[9px] tablet:h-[10px] desktop:h-[11px] w-auto max-w-full object-contain"
    />
  );
}

interface FooterWordmarkProps extends WordmarkImageProps {
  label: string;
  href:  string;
  className?: string;
}

/**
 * Footer nav item drawn as a wordmark rather than set in type, so the links
 * share the logotype's construction. The link carries the accessible name, so
 * the artwork itself stays decorative.
 */
export function FooterWordmark({ src, width, label, href, className = "" }: FooterWordmarkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`flex flex-row justify-start items-center min-w-0 transition-opacity duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] hover:opacity-70 ${className}`}
    >
      <WordmarkImage src={src} width={width} />
    </Link>
  );
}
