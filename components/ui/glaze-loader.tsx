/**
 * The GLAZE wordmark drawn stroke by stroke. Purely presentational —
 * {@link PageLoader} decides when it is on screen and for how long.
 *
 * The letterforms are single open strokes rather than the filled outlines of
 * `/glaze-monochrome-*.svg`: `stroke-dashoffset` can only animate a path that is
 * actually drawn, so the wordmark is redrawn here as geometry.
 */

/** `at` is a fraction of one cycle, so the stagger holds at any speed. */
const STROKES: { d: string; at: number }[] = [
  { d: "M 439 466 C 421 451 395 444 369 444 C 319 444 284 474 284 515 C 284 556 316 584 366 584 C 397 584 422 575 443 559 L 443 514 L 388 514", at: 0     },
  { d: "M 544 447 V 582 H 650",                                                                                                                      at: 0.038 },
  { d: "M 716 586 L 789 447 L 862 586",                                                                                                              at: 0.077 },
  { d: "M 935 447 H 1070 L 938 582 H 1073",                                                                                                          at: 0.115 },
  { d: "M 1146 447 H 1253",                                                                                                                          at: 0.154 },
  { d: "M 1146 514 H 1238",                                                                                                                          at: 0.177 },
  { d: "M 1147 583 H 1260",                                                                                                                          at: 0.200 },
];

interface GlazeLoaderProps {
  /** Length of one draw-and-erase cycle, as a CSS duration. */
  cycle?:    string;
  className?: string;
}

export function GlazeLoader({ cycle = "2.6s", className = "" }: GlazeLoaderProps) {
  return (
    <svg
      // Cropped tight to the artwork — the reference file padded it out to a
      // 1536×1024 poster, which would leave the wordmark tiny on a phone.
      viewBox="244 404 1056 227"
      role="img"
      aria-label="Loading"
      className={`glz-loader block w-[min(88vw,760px)] h-auto max-h-[60vh] ${className}`}
      style={{ "--glz-cycle": cycle } as React.CSSProperties}
    >
      <g
        fill="none"
        stroke="var(--color-plum)"
        strokeWidth={8.5}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
      >
        {STROKES.map(({ d, at }) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            style={{ animationDelay: `calc(var(--glz-cycle) * ${at})` }}
          />
        ))}
      </g>
    </svg>
  );
}
