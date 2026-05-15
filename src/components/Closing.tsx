"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Book, Document } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

const LINKS = {
  demo: "https://orderbook-northstar.vercel.app/",
  litepaper: "https://northstar.sonicsvm.org/",
  docs: "https://docs.sonicsvm.org/",
};

/**
 * Closing — light-surface CTA section with a dark terminal mockup
 * floating in the centre, plus a soft low-saturation blue gradient
 * fade at the bottom that bridges into the saturated-blue Footer
 * (no hard colour break).
 *
 * Page colour rhythm at the tail:
 *   ... light → light → light (Closing) → faint blue tint (gradient) → saturated blue (Footer)
 *
 * The terminal stays internally dark (it's a real-looking terminal
 * window mockup), but the *section* around it is light, matching
 * the rest of the page above.
 */
export default function Closing() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        // Top portion TRANSPARENT — so the page-wide atom canvas
        // (rendered behind <main>) shows through here too, keeping
        // the atom lattice continuous across all non-Hero sections.
        // Bottom 35% fades into a low-saturation blue tint to bridge
        // into the saturated-blue Footer (no hard colour break).
        background:
          "linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,0,255,0.05) 88%, rgba(0,0,255,0.12) 100%)",
      }}
    >
      {/* very subtle sonic-blue radial halo behind the terminal */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,255,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Footer bleed-up glow — reads as a long horizontal "light bar"
          sitting at the top edge of the Footer below, radiating
          straight UP across the full width into Closing. Linear (not
          radial) so the brightness is uniform across the row instead
          of falling off at the sides like a spotlight. Height 45%
          + the gradient fades to transparent before reaching the CTA
          cluster, so the buttons sitting above stay uncovered. */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{
          height: "45%",
          background: "var(--closing-bleed-glow)",
        }}
      >
        {/* LED light bar itself — sits flush at the Closing/Footer
            seam (bottom: 0 inside the glow wrapper above). Uniform
            brightness across the full width (like a real LED strip),
            with the vertical halo handled by box-shadow + the
            fade-up glow above it. */}
        <div
          aria-hidden
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "1.5px",
            background: "rgba(160, 190, 255, 0.95)",
            boxShadow:
              "0 0 6px rgba(120, 160, 255, 0.85), 0 -2px 14px rgba(80, 120, 255, 0.55)",
            animation: "ns-footer-line 6s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative pt-14 md:pt-18">
        <SectionDivider label="Launch" theme="light" />
      </div>

      {/* Centered single-column content */}
      <div className="relative w-full max-w-3xl mx-auto px-6 lg:px-10 pt-10 md:pt-14 pb-20 md:pb-28 flex flex-col items-center text-center">
        {/* headline — dark text on light bg */}
        <RevealOnScroll>
          <h2
            className="font-heading text-on-light-primary font-extrabold tracking-tight mb-3"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.04 }}
          >
            The Fast Lane Is Open
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={140}>
          <p className="font-body text-14 md:text-16 text-on-light-secondary mb-10 max-w-md leading-relaxed">
            Spin up your own dedicated runtime in three commands.
          </p>
        </RevealOnScroll>

        {/* Terminal mockup — stays dark (real terminal aesthetic) */}
        <RevealOnScroll delayMs={300} className="w-full mb-12">
          <TerminalWindow />
        </RevealOnScroll>

        {/* CTAs — back to light-bg styling: blue-solid primary + ghost secondaries */}
        <RevealOnScroll delayMs={500}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a
              href={LINKS.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-12 font-bold tracking-wider uppercase px-5 py-3 rounded-lg bg-primary-blue text-white inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-px hover:brightness-110 active:scale-[0.97]"
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

      <style>{`
        /* CTA link arrow — translates 3px up/right ON HOVER ONLY.
           Subtle, contained motion. Color is handled by the existing
           group-hover Tailwind classes. */
        .closing-cta-arrow {
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), color 240ms ease-out;
        }
        .closing-cta-link:hover .closing-cta-arrow {
          transform: translate(2px, -2px);
        }
        /* terminal cursor blink */
        @keyframes ns-cursor-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        /* LED bar breathing — kept in sync with the old footer
           hairline animation name so its 6s slow pulse continues. */
        @keyframes ns-footer-line {
          0%, 100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
        /* hide the scrollbar inside the terminal scroll zone */
        .terminal-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .closing-cta-link:hover .closing-cta-arrow { transform: none; }
          [class*="ns-cursor"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ============ Terminal mockup ============ */

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "log"; text: string }
  | { kind: "ok"; label: string; value: string; highlight?: boolean }
  | { kind: "ok-msg"; text: string }
  | { kind: "result"; text: string }
  | { kind: "blank" }
  | { kind: "prompt" };

const ALL_LINES: Line[] = [
  { kind: "cmd", text: "npm install @northstar/sdk" },
  { kind: "result", text: "added @northstar/sdk@1.0.0  (412 packages)" },
  { kind: "blank" },
  { kind: "cmd", text: "northstar init --tps 1000000" },
  { kind: "log", text: "allocating private runtime..." },
  { kind: "ok", label: "cluster", value: "ready" },
  { kind: "ok", label: "latency", value: "47ms", highlight: true },
  { kind: "ok", label: "throughput", value: "1.2M tps", highlight: true },
  { kind: "ok", label: "cost / tx", value: "$0.000089", highlight: true },
  { kind: "blank" },
  { kind: "cmd", text: "northstar connect mainnet" },
  { kind: "ok-msg", text: "connected to solana mainnet" },
  { kind: "blank" },
  { kind: "prompt" },
];

const COLOR = {
  promptDim: "rgba(255,255,255,0.4)",
  cmdText: "#FFFFFF",
  outText: "rgba(255,255,255,0.78)",
  outDim: "rgba(255,255,255,0.5)",
  // brand-only accents — Sonic Green for ✓ and value highlights,
  // Sonic secondary-blue (`#3399EE`) for arrows. No off-brand colors.
  ok: "var(--color-secondary-green)",
  highlight: "var(--color-secondary-green)",
  arrow: "var(--color-secondary-blue)",
};

/**
 * TerminalWindow — fixed-height macOS-style terminal window with two
 * internal zones:
 *
 *  • PINNED ZONE (top) — the first `PINNED_COUNT` lines (the
 *    `npm install` command + its result). These render once and stay
 *    visible at the top of the window forever, so users always see
 *    the key setup command no matter how much output appears below.
 *
 *  • SCROLLING ZONE (below) — the rest of the boot sequence types
 *    here. The zone is fixed-height with hidden overflow + a
 *    programmatic `scrollTop = scrollHeight` after each new line, so
 *    new output scrolls in at the bottom while the pinned commands
 *    above never move.
 *
 * The entire window has a fixed total height — the page no longer
 * shifts as the terminal types.
 */
function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  // Lines 0..PINNED_COUNT-1 render in the pinned zone (always visible).
  // Lines from PINNED_COUNT onward render in the scrolling zone.
  // Indices: 0 = "npm install …", 1 = "added @northstar/sdk@1.0.0 …",
  //          2 = blank divider → pin 3 lines total.
  const PINNED_COUNT = 3;
  const pinnedVisible = Math.min(count, PINNED_COUNT);
  const scrollingVisible = Math.max(0, count - PINNED_COUNT);

  // start when in view (or immediately for prefers-reduced-motion)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setStarted(true);
      setCount(ALL_LINES.length);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // typing animation: variable per-line delay
  useEffect(() => {
    if (!started) return;
    if (count >= ALL_LINES.length) return;
    const next = ALL_LINES[count];
    const delay = (() => {
      switch (next.kind) {
        case "cmd":
          return 360;
        case "blank":
          return 80;
        case "log":
          return 240;
        case "result":
          return 240;
        case "ok":
          return 170;
        case "ok-msg":
          return 220;
        case "prompt":
          return 100;
      }
    })();
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [started, count]);

  // Keep the scrolling zone pinned to the bottom as new lines are added,
  // so the latest line (and eventually the blinking prompt) stays in view.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [scrollingVisible]);

  return (
    <div
      ref={ref}
      className="w-full rounded-xl overflow-hidden text-left flex flex-col"
      style={{
        // slightly lighter than section bg so the terminal "floats"
        background: "#0A0D24",
        border: "1px solid rgba(255,255,255,0.08)",
        // Shadow softened — was 0 30px 80px rgba(0,0,0,0.5) which
        // bled darkness all the way down onto the CTA buttons below
        // the terminal. Halved offset + blur and dropped alpha to 0.22
        // so the terminal still "floats" but its underside stays
        // contained to the area immediately below the window.
        boxShadow:
          "0 16px 40px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
        // FIXED HEIGHT — content overflow handled internally by the
        // scrolling zone, never by the page layout.
        height: 380,
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 shrink-0"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#FF5F57" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#FEBC2E" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#28C840" }}
        />
        <span
          className="ml-3 font-mono text-10 uppercase tracking-[0.18em]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          northstar — zsh
        </span>
      </div>

      {/* PINNED zone — always visible, never scrolls */}
      <div
        className="px-5 md:px-6 pt-4 font-mono text-12 md:text-14 shrink-0"
        style={{
          color: COLOR.outText,
          lineHeight: 1.7,
        }}
      >
        {ALL_LINES.slice(0, pinnedVisible).map((line, i) => (
          <TerminalLine key={`pinned-${i}`} line={line} />
        ))}
      </div>

      {/* Separator hairline — appears once the pin section finishes */}
      <div
        aria-hidden
        className="mx-5 md:mx-6 mt-2 mb-1 h-px shrink-0 transition-opacity duration-300"
        style={{
          background: "rgba(255,255,255,0.08)",
          opacity: pinnedVisible >= PINNED_COUNT ? 1 : 0,
        }}
      />

      {/* SCROLLING zone — fills remaining height, auto-scrolls to bottom */}
      <div
        ref={scrollRef}
        className="terminal-scroll px-5 md:px-6 pt-2 pb-4 font-mono text-12 md:text-14 flex-1"
        style={{
          color: COLOR.outText,
          lineHeight: 1.7,
          overflowY: "auto",
          // hide native scrollbar (CSS in <style> handles ::-webkit)
          scrollbarWidth: "none",
        }}
      >
        {ALL_LINES.slice(PINNED_COUNT, PINNED_COUNT + scrollingVisible).map(
          (line, i) => (
            <TerminalLine key={`scroll-${i}`} line={line} />
          ),
        )}
      </div>
    </div>
  );
}

function TerminalLine({ line }: { line: Line }) {
  switch (line.kind) {
    case "cmd":
      return (
        <div>
          <span style={{ color: COLOR.promptDim }}>$ </span>
          <span style={{ color: COLOR.cmdText }}>{line.text}</span>
        </div>
      );
    case "result":
      return (
        <div style={{ color: COLOR.outDim }}>{line.text}</div>
      );
    case "log":
      return (
        <div>
          <span style={{ color: COLOR.arrow }}>→ </span>
          <span style={{ color: COLOR.outDim }}>{line.text}</span>
        </div>
      );
    case "ok": {
      const labelW = "12ch";
      return (
        <div>
          <span style={{ color: COLOR.ok }}>✓ </span>
          <span
            style={{
              color: COLOR.outDim,
              display: "inline-block",
              width: labelW,
            }}
          >
            {line.label}
          </span>
          <span
            style={{
              color: line.highlight ? COLOR.highlight : COLOR.outText,
              fontWeight: line.highlight ? 600 : 400,
            }}
          >
            {line.value}
          </span>
        </div>
      );
    }
    case "ok-msg":
      return (
        <div>
          <span style={{ color: COLOR.ok }}>✓ </span>
          <span style={{ color: COLOR.outText }}>{line.text}</span>
        </div>
      );
    case "blank":
      return <div>&nbsp;</div>;
    case "prompt":
      return (
        <div>
          <span style={{ color: COLOR.promptDim }}>$ </span>
          <span
            aria-hidden
            className="inline-block align-middle"
            style={{
              width: "0.55em",
              height: "1.1em",
              background: COLOR.cmdText,
              animation: "ns-cursor-blink 1s steps(2) infinite",
            }}
          />
        </div>
      );
  }
}

/* ============ helpers ============ */

/** SecondaryLink — ghost text-link styled for the light section bg. */
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
      // Subtle hover: text + icon brighten together, and ONLY the
      // trailing ArrowUpRight icon translates a tiny bit (3px up/right
      // via transform on .closing-cta-arrow). No `hover:gap-*` here —
      // changing flex gap on hover jerks both ends sideways at once,
      // which reads as rigid. Translating just the icon keeps the
      // motion contained and subtle.
      className="closing-cta-link group inline-flex items-center gap-1.5 font-heading text-12 font-bold uppercase tracking-wider text-on-light-secondary hover:text-on-light-primary transition-colors"
    >
      <span className="text-primary-blue/70 group-hover:text-primary-blue transition-colors shrink-0">
        {icon}
      </span>
      {children}
      <ArrowUpRight
        size={12}
        className="closing-cta-arrow text-primary-blue/70 group-hover:text-primary-blue shrink-0"
      />
    </a>
  );
}
