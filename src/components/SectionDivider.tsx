"use client";

/**
 * SectionDivider — unified chapter break used at the top of every interior
 * section (HowItWorks, ByTheNumbers, WhatYouCanBuild, Closing). On viewport
 * entry it plays a one-shot intro: label fades in, hairline draws from center
 * outward, a small pulse dot sweeps along the line. After playing, it stays at
 * the static end-state. Honors prefers-reduced-motion (renders end-state only).
 */

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "blue";

type Props = {
  label: string;
  theme?: Theme;
  className?: string;
};

const COLORS: Record<Theme, { label: string; line: string }> = {
  light: {
    label: "var(--color-on-light-muted)",
    line: "var(--color-line-on-light-strong)",
  },
  blue: {
    label: "var(--color-on-blue-secondary)",
    line: "var(--color-line-on-blue-strong)",
  },
};

export default function SectionDivider({
  label,
  theme = "light",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPlayed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlayed(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const c = COLORS[theme];

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full max-w-7xl mx-auto px-6 lg:px-10 select-none ${className}`}
    >
      {/* label */}
      <div
        className="text-center font-mono text-10 uppercase pb-3"
        style={{
          color: c.label,
          letterSpacing: "0.22em",
          opacity: played ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {label}
      </div>

      {/* hairline that draws from center outward */}
      <div className="relative h-px">
        <div
          className="absolute inset-0"
          style={{
            background: c.line,
            transform: played ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            transition:
              "transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms",
          }}
        />
      </div>
    </div>
  );
}
