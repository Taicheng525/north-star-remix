"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Bolt, Book, Document } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

const LINKS = {
  demo: "https://orderbook-northstar.vercel.app/",
  litepaper: "https://northstar.sonicsvm.org/",
  docs: "https://docs.sonicsvm.org/",
};

/**
 * Closing — light card on light surface.
 * Right side: a single calm geometric North Star mark (breathing) inside a
 * blueprint frame. No dither, no random tracks — content reads cleanly.
 * Honors prefers-reduced-motion.
 */
export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="pt-20 md:pt-24">
        <SectionDivider label="Launch" theme="light" />
      </div>

      <div className="relative w-full max-w-[1240px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        {/* Ambient blue glow behind the card */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "var(--color-primary-blue)",
            filter: "blur(140px)",
            opacity: 0.08,
          }}
        />

        <div
          className="relative w-full overflow-hidden rounded-3xl border border-line-on-light"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 22px 44px rgba(0,0,0,0.05), 0 60px 120px rgba(0,0,0,0.06)",
          }}
        >
          {/* ===== Card background layers ===== */}
          {/* 24px structural grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-40 z-[1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,255,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "center center",
            }}
          />

          {/* Soft blue radial glow at right (visual side) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                "radial-gradient(ellipse at 78% 50%, rgba(0,0,255,0.10) 0%, transparent 55%)",
            }}
          />

          {/* Inner highlight for the rounded edge */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              borderRadius: "inherit",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,1), inset 0 -1px 2px rgba(0,0,0,0.06)",
            }}
          />

          {/* ===== Content ===== */}
          <div className="relative flex flex-col lg:flex-row z-10">
            {/* ===== LEFT: copy + CTA cluster ===== */}
            <div className="w-full lg:w-[58%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <RevealOnScroll>
                <div
                  className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-md w-max"
                  style={{
                    background: "var(--color-primary-blue-on-light-bg-strong)",
                    border:
                      "1px solid var(--color-primary-blue-on-light-border)",
                  }}
                >
                  <Bolt
                    size={12}
                    className="text-primary-blue"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(0,0,255,0.5))",
                    }}
                  />
                  <span className="font-heading text-10 uppercase tracking-wide text-primary-blue font-medium">
                    North Star Engine
                  </span>
                </div>
              </RevealOnScroll>

              {/* Headline with mask reveal per line */}
              <h2 className="font-heading section-title text-on-light-primary font-extrabold tracking-tight mb-6">
                <RevealMaskLine delay={120}>
                  The{" "}Fast{" "}Lane
                </RevealMaskLine>
                <RevealMaskLine delay={260} className="text-on-light-faint">
                  Is{" "}Open
                </RevealMaskLine>
              </h2>

              <RevealOnScroll delayMs={420}>
                <p className="font-body text-16 md:text-20 text-on-light-secondary mb-10 max-w-md leading-relaxed">
                  Try the live demo, read the litepaper, or start building with
                  the North Star SDK.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delayMs={520}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a
                    href={LINKS.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-12 font-bold tracking-wider uppercase px-5 py-3 rounded-lg bg-primary-blue text-white inline-flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.97]"
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 28px rgba(0,0,255,0.32)",
                    }}
                  >
                    Try the live demo
                    <ArrowRight size={16} />
                  </a>

                  <SecondaryLink
                    href={LINKS.litepaper}
                    icon={<Document size={14} />}
                  >
                    Read the litepaper
                  </SecondaryLink>

                  <SecondaryLink href={LINKS.docs} icon={<Book size={14} />}>
                    View docs
                  </SecondaryLink>
                </div>
              </RevealOnScroll>
            </div>

            {/* ===== RIGHT: simple geometric mark ===== */}
            <div
              className="w-full lg:w-[42%] relative flex items-center justify-center px-8 py-12 md:py-0"
              style={{ minHeight: "420px" }}
            >
              {/* Corner brackets */}
              <CornerBracket pos="tl" />
              <CornerBracket pos="tr" />
              <CornerBracket pos="bl" />
              <CornerBracket pos="br" />

              {/* North Star geometric mark, breathing */}
              <NorthStarMark />

              {/* Status label bottom-right */}
              <div className="absolute bottom-6 right-8 z-20 pointer-events-none">
                <div className="flex flex-col gap-1 text-right">
                  <span className="font-mono text-10 text-on-light-muted uppercase tracking-[0.2em]">
                    Node Status
                  </span>
                  <div className="flex items-center justify-end gap-2 text-12 text-on-light-primary font-heading font-medium">
                    Synced
                    <span className="relative inline-flex w-1.5 h-1.5">
                      <span
                        className="absolute inset-0 rounded-full bg-secondary-green opacity-60"
                        style={{
                          animation:
                            "ns-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
                        }}
                      />
                      <span
                        className="relative w-1.5 h-1.5 rounded-full bg-secondary-green"
                        style={{ boxShadow: "0 0 6px rgba(0,255,148,0.6)" }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ns-ping {
          75%, 100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes ns-mask-rise {
          from { transform: translateY(110%); }
          to   { transform: translateY(0%); }
        }
        @keyframes ns-star-breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        @keyframes ns-ring-expand {
          0%   { transform: scale(0.6); opacity: 0; }
          15%  { opacity: 0.45; }
          100% { transform: scale(2.0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ============ helper components ============ */

function NorthStarMark() {
  return (
    <div className="relative w-[260px] h-[260px] flex items-center justify-center">
      {/* Expanding rings (3 staggered) */}
      {[0, 1.6, 3.2].map((delay, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: "1px solid var(--color-primary-blue-on-light-border-strong)",
            animation: `ns-ring-expand 4.8s ease-out infinite`,
            animationDelay: `${delay}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Static circle frame */}
      <span
        aria-hidden
        className="absolute inset-12 rounded-full"
        style={{
          border: "1px dashed rgba(0,0,255,0.18)",
        }}
      />

      {/* The North Star geometric mark */}
      <svg
        viewBox="-50 -50 100 100"
        width="120"
        height="120"
        aria-hidden
        style={{
          animation: "ns-star-breathe 4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <defs>
          <radialGradient id="closing-star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0000FF" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0000FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="46" fill="url(#closing-star-glow)" />
        {/* outer 8-point star */}
        <polygon
          points="0,-32 6,-6 32,0 6,6 0,32 -6,6 -32,0 -6,-6"
          fill="#0000FF"
          opacity="0.92"
        />
        {/* inner highlight star */}
        <polygon
          points="0,-16 3,-3 16,0 3,3 0,16 -3,3 -16,0 -3,-3"
          fill="#FFFFFF"
          opacity="0.88"
        />
        {/* compass tick marks */}
        <line x1="-44" y1="0" x2="-36" y2="0" stroke="#0000FF" strokeWidth="0.6" opacity="0.45" />
        <line x1="36" y1="0" x2="44" y2="0" stroke="#0000FF" strokeWidth="0.6" opacity="0.45" />
        <line x1="0" y1="-44" x2="0" y2="-36" stroke="#0000FF" strokeWidth="0.6" opacity="0.45" />
        <line x1="0" y1="36" x2="0" y2="44" stroke="#0000FF" strokeWidth="0.6" opacity="0.45" />
      </svg>
    </div>
  );
}

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const pin: Record<typeof pos, string> = {
    tl: "top-6 left-6 border-t border-l hidden lg:block",
    tr: "top-6 right-6 border-t border-r",
    bl: "bottom-6 left-6 border-b border-l hidden lg:block",
    br: "bottom-6 right-6 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`absolute w-3 h-3 z-30 pointer-events-none ${pin[pos]}`}
      style={{ borderColor: "var(--color-line-on-light-strong)" }}
    />
  );
}

function SecondaryLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 font-heading text-12 font-bold uppercase tracking-wider text-on-light-secondary hover:text-on-light-primary transition-colors hover:gap-2.5"
    >
      <span className="text-primary-blue/70 group-hover:text-primary-blue transition-colors shrink-0">
        {icon}
      </span>
      {children}
      <ArrowUpRight
        size={12}
        className="text-primary-blue/70 group-hover:text-primary-blue transition-colors shrink-0"
      />
    </a>
  );
}

function RevealMaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <span
      ref={ref}
      className="block overflow-hidden align-top pb-1"
      style={{ lineHeight: 1.05 }}
    >
      <span
        className={`inline-block ${className}`}
        style={{
          transform: shown ? "translateY(0%)" : "translateY(110%)",
          transition: `transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
}
