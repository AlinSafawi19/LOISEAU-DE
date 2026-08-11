interface LogomarkProps {
  className?: string;
  label?:     string;
}

/**
 * Placeholder brand mark for the hero and footer wordmark slots, standing in
 * until the real logo artwork lands. Scales to the full width of its container
 * and inherits the surrounding `color`, so callers set the colour with a text
 * utility rather than a fill.
 */
export function Logomark({ className = "", label = "GLAZE" }: LogomarkProps) {
  return (
    <svg
      viewBox="0 0 1000 240"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      className={`w-full h-auto block ${className}`}
    >
      <text
        x="500"
        y="190"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-clash)"
        fontSize="220"
        fontWeight="400"
        letterSpacing="12"
      >
        {label}
      </text>
    </svg>
  );
}
