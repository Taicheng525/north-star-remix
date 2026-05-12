"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
  /** Stronger "blur-in" entrance — used for hero content so it
   *  echoes the intro film's headline reveal. */
  blur?: boolean;
};

export default function RevealOnScroll({
  children,
  delayMs = 0,
  className = "",
  as = "div",
  blur = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  // `settled` flips to true ~750ms after `revealed`. We use it to drop
  // `transform` and `will-change` once the reveal animation finishes —
  // both create a CSS "backdrop root", which would otherwise prevent
  // descendant frosted-glass cards from blurring the page-wide atom
  // canvas (their `backdrop-filter` would only see content inside this
  // wrapper, not the global backdrop).
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      setSettled(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    function attachObserver() {
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
      if (node) obs.observe(node);
      return obs;
    }

    // If the intro film is currently covering the viewport, defer
    // setting up the observer until it dismisses — otherwise this
    // wrapper's contents (e.g. the Hero hero) reveal *while* the
    // intro is still on top of them, so the user never sees it.
    const introPlaying = (
      window as unknown as { __nsIntroPlaying?: boolean }
    ).__nsIntroPlaying;

    let obs: IntersectionObserver | null = null;
    if (introPlaying) {
      const onIntroDismissed = () => {
        obs = attachObserver();
      };
      window.addEventListener("ns:intro-dismissed", onIntroDismissed, {
        once: true,
      });
      return () => {
        window.removeEventListener("ns:intro-dismissed", onIntroDismissed);
        if (obs) obs.disconnect();
      };
    }

    obs = attachObserver();
    return () => {
      if (obs) obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!revealed) return;
    // 700ms animation + delay + tiny safety margin → settle.
    const t = window.setTimeout(() => setSettled(true), 750 + delayMs);
    return () => window.clearTimeout(t);
  }, [revealed, delayMs]);

  const Tag = as as "div";
  // `blur` variant — bigger upward travel + blur-fade, matching the
  // intro film's Seq 2 headline reveal. Used on Hero copy so the
  // transition from intro → page feels continuous.
  const initialTranslate = blur ? "translateY(40px)" : "translateY(20px)";
  const initialFilter = blur ? "blur(14px)" : "";
  const transitionFilter = blur
    ? `, filter 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`
    : "";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: settled
          ? "none"
          : revealed
            ? "translateY(0)"
            : initialTranslate,
        filter: settled ? "" : revealed ? "blur(0px)" : initialFilter,
        transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms${transitionFilter}`,
        willChange: settled
          ? "auto"
          : blur
            ? "opacity, transform, filter"
            : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
