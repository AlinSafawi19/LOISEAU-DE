import Image from "next/image";

interface LogomarkProps {
  className?: string;
  label?:     string;
  /** `white` for dark surfaces, `plum` for the light lavender header/drawer. */
  tone?:      "white" | "plum";
}

const SRC = {
  white: "/glaze-monochrome-white.svg",
  plum:  "/glaze-monochrome-plum.svg",
} as const;

/**
 * The GLAZE wordmark, used in the hero, footer and header logotype slots. Scales
 * to the full width of its container. The artwork carries its own colour, so
 * callers pick a `tone` to match the surface rather than a text utility.
 */
export function Logomark({ className = "", label = "GLAZE", tone = "white" }: LogomarkProps) {
  return (
    <Image
      src={SRC[tone]}
      alt={label}
      width={982}
      height={152}
      priority
      className={`w-full h-auto block ${className}`}
    />
  );
}
