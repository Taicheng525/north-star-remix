"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
};

export default function RevealOnScroll({
  children,
  delayMs = 0,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
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

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
