"use client";

import { useEffect, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

const USECASE_GREEN = "#0F8F5C";

type UseCaseRow = {
  num: string;
  label: string;
  shortLabel: string;
  headline: string;
  body: string;
  // Standard cards have a stat + visual; the SDK card has a code
  // snippet + Copy button instead. Both shapes share the same active
  // frame, just the bottom-half content differs.
  statValue?: string;
  statLabel?: string;
  viz?: React.ReactNode;
  // `code` is the plain string used by the Copy button (clipboard
  // payload). `codeDisplay` is the syntax-highlighted JSX rendered
  // inside <pre>. They must stay in sync.
  code?: string;
  codeDisplay?: React.ReactNode;
};

const SDK_CODE = `import { NorthStarSDK } from "@sonicsvm/northstar-sdk";

const sdk = new NorthStarSDK({
  portalProgramId: PORTAL,
  customEndpoints: { solana: L1_RPC, ephemeralRollup: ER_RPC },
});

// Open a session, delegate accounts, run your workload at real-time.
await sdk.openSession(user, gridId, ttlSlots, feeCap, signTx, signers);
await sdk.delegate(user, gridId, ownerProgram, signTx, signers);
// ... your existing program calls run inside the session ...`;

// Hand-rolled syntax highlight palette. Keeping this inline instead
// of pulling in shiki / prism — the snippet is fixed, so a tokenised
// JSX render is cheaper than a runtime highlighter.
const HL = {
  keyword: "#FF73B6",  // import / from / const / new / await
  string: "#FFB86C",   // string literals + class names
  constant: "#F1E58E", // SCREAMING_SNAKE constants (PORTAL, L1_RPC…)
  fn: "#FF7AB6",       // method calls after `.`
  comment: "rgba(255, 255, 255, 0.45)",
};

function T({
  c,
  children,
}: {
  c: string;
  children: React.ReactNode;
}) {
  return <span style={{ color: c }}>{children}</span>;
}

const SDK_CODE_DISPLAY = (
  <>
    <T c={HL.keyword}>import</T>
    {" { "}
    <T c={HL.string}>NorthStarSDK</T>
    {" } "}
    <T c={HL.keyword}>from</T>{" "}
    <T c={HL.string}>{'"@sonicsvm/northstar-sdk"'}</T>
    {";\n\n"}
    <T c={HL.keyword}>const</T>
    {" sdk = "}
    <T c={HL.keyword}>new</T>{" "}
    <T c={HL.string}>NorthStarSDK</T>
    {"({\n"}
    {"  portalProgramId: "}
    <T c={HL.constant}>PORTAL</T>
    {",\n"}
    {"  customEndpoints: { solana: "}
    <T c={HL.constant}>L1_RPC</T>
    {", ephemeralRollup: "}
    <T c={HL.constant}>ER_RPC</T>
    {" },\n"}
    {"});\n\n"}
    <T c={HL.comment}>
      {"// Open a session, delegate accounts, run your workload at real-time."}
    </T>
    {"\n"}
    <T c={HL.keyword}>await</T>
    {" sdk."}
    <T c={HL.fn}>openSession</T>
    {"(user, gridId, ttlSlots, feeCap, signTx, signers);\n"}
    <T c={HL.keyword}>await</T>
    {" sdk."}
    <T c={HL.fn}>delegate</T>
    {"(user, gridId, ownerProgram, signTx, signers);\n"}
    <T c={HL.comment}>
      {"// ... your existing program calls run inside the session ..."}
    </T>
  </>
);

export default function WhatYouCanBuild() {
  const rows: UseCaseRow[] = [
    {
      num: "01",
      label: "On-Chain Oracles",
      shortLabel: "Oracles",
      headline: "Near-Free Price Feeds. Always Fresh.",
      body: "Oracle updates become a near-free operation on a dedicated runtime. Write as often as you need. Every read returns current state.",
      statValue: "≈ $0",
      statLabel: "per price update",
      viz: <PriceTickerViz />,
    },
    {
      num: "02",
      label: "Autonomous Agents",
      shortLabel: "Agents",
      headline: "Faster Loops. Smarter Agents.",
      body: "Each agent runs on its own dedicated runtime. Decision loops drop from 400ms to under 50ms. Strategies iterate faster, adapt sooner.",
      statValue: "< 50ms",
      statLabel: "per decision cycle",
      viz: <AgentLoopViz />,
    },
    {
      num: "03",
      label: "On-Chain Orderbooks",
      shortLabel: "Orderbooks",
      headline: "Exchange-Grade Throughput. On-Chain.",
      body: "Thousands of order operations per second on a dedicated runtime. No contention, no throughput ceiling, no compromises.",
      statValue: "> 1M",
      statLabel: "ops per second",
      viz: <OrderbookLadderViz />,
    },
    {
      num: "04",
      label: "Open A Session",
      shortLabel: "SDK",
      headline: "Open a Session In Minutes.",
      body: "One small integration path: open a session, delegate accounts, and run your existing program calls.",
      code: SDK_CODE,
      codeDisplay: SDK_CODE_DISPLAY,
    },
  ];

  // Active card index for the desktop hover-expand interaction.
  // Default to 0 so the first card is pre-expanded on initial render.
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full">
      <div className="pt-14 md:pt-18">
        <SectionDivider label="Use Cases" theme="light" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 py-12 md:py-18">
        <RevealOnScroll className="w-full">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
              What You Can Build With{" "}
              <span className="text-primary-blue">North{" "}Star</span>
            </h2>
            <p className="mt-4 font-body text-14 md:text-16 text-on-light-secondary leading-relaxed">
              Workloads that need dedicated throughput, not a shared queue.
            </p>
            <p className="mt-3 font-mono text-10 uppercase tracking-wide text-on-light-faint">
              Hover a card to explore →
            </p>
          </div>
        </RevealOnScroll>

        {/* Desktop: hover-expand row of 3 cards (flex-grow ratio active:inactive = 5:1) */}
        <RevealOnScroll className="w-full" delayMs={120}>
          <div
            className="hidden md:flex gap-3 lg:gap-4"
            style={{ height: 380 }}
            onMouseLeave={() => setActive(0)}
          >
            {rows.map((row, i) => (
              <ExpandCard
                key={row.num}
                row={row}
                active={i === active}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>
        </RevealOnScroll>

        {/* Mobile: stacked vertical cards (always fully expanded) */}
        <div className="md:hidden flex flex-col gap-3">
          {rows.map((row, i) => (
            <RevealOnScroll key={row.num} className="w-full" delayMs={i * 120}>
              <MobileCard row={row} />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        /* WhatYouCanBuild.Oracles — fresh status pip ping */
        @keyframes ns-fresh-ping {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        /* WhatYouCanBuild.Orderbooks — bid/ask bars subtle width breath, staggered */
        @keyframes ns-ladder-breath {
          0%, 100% { transform: scaleX(1);    opacity: 0.85; }
          50%      { transform: scaleX(0.94); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ns-fresh-"],
          [style*="ns-ladder-"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * ExpandCard — the desktop hover-expand card.
 * - inactive state: only number + a vertically-rotated label are visible
 * - active state: full content (headline / body / stat / viz) fades in
 * - flex-grow toggles 5 (active) ↔ 1 (inactive) over 500ms for the
 *   width transition; content opacity transitions independently with a
 *   small delay so they don't fight each other visually.
 */
function ExpandCard({
  row,
  active,
  onActivate,
}: {
  row: UseCaseRow;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <article
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      // Click also activates so it works on touch devices that hit md+.
      onClick={onActivate}
      aria-expanded={active}
      className="relative overflow-hidden rounded-xl border outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-blue/40"
      style={{
        flexBasis: 0,
        flexShrink: 1,
        flexGrow: active ? 5 : 1,
        // Snappy ease-out: most of the motion is in the first 40% of the
        // duration, then it glides to a stop. No slow start = no "pause
        // before opening" feel.
        transition:
          "flex-grow 460ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease-out",
        // Active + inactive both themed — light uses the original
        // bright sonic + pearl-glass duo, dark uses deep-navy + a
        // darker-navy "ghost" slab so the row stays in one tonal
        // family on near-black.
        background: active
          ? "var(--whyc-active-bg)"
          : "var(--whyc-inactive-bg)",
        // Inactive drops the `saturate(1.15)` — it was amplifying any
        // colour bleeding in from neighbouring cards' shadows (15%
        // boost made the active blue glow visible through the
        // inactive's translucent layer). Plain blur keeps the glass
        // feel without colour amplification.
        backdropFilter: active
          ? "blur(18px) saturate(1.15)"
          : "blur(18px)",
        WebkitBackdropFilter: active
          ? "blur(18px) saturate(1.15)"
          : "blur(18px)",
        borderColor: active
          ? "var(--whyc-active-border)"
          : "var(--whyc-inactive-border)",
        // Active outer shadow uses NEGATIVE spread (`-8px`, `-16px`) so
        // the blur is pulled inward on all sides. Net effect: shadow
        // mostly drops below the card, only a few px on the sides.
        // Doesn't reach into the neighbouring card's area through the
        // gap, so no more diagonal blue bleed on inactive cards.
        boxShadow: active
          ? "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.10), 0 12px 24px -8px rgba(0,0,255,0.28), 0 24px 40px -16px rgba(0,0,255,0.16)"
          : "var(--whyc-inactive-shadow)",
      }}
    >
      {/* Decoration layers — only visible when active. Adds a faint
          white grid + a soft top-right radial highlight to the solid
          blue bg so it feels like a printed schematic / control panel
          surface, not a flat block of colour. All low-opacity so the
          foreground text + viz stay crisp. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 240ms ease-out 80ms",
          // Layer 1 = faint top-right radial highlight (slight depth)
          // Layer 2 = horizontal grid line every 36px
          // Layer 3 = vertical grid line every 36px
          backgroundImage: [
            "radial-gradient(ellipse 480px 320px at 88% 8%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
          backgroundPosition: "0 0",
          maskImage:
            "linear-gradient(180deg, black 0%, black 78%, rgba(0,0,0,0.6) 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 78%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Vertical accent line — thin white hairline on the LEFT edge
          of the active card, runs top-to-bottom. Reads as a circuit
          bus / data spine. Fades in/out with active state. */}
      <div
        aria-hidden
        className="absolute left-0 top-[16%] bottom-[16%] w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(255,255,255,0.45) 25%, rgba(255,255,255,0.45) 75%, transparent)",
          opacity: active ? 1 : 0,
          transition: "opacity 240ms ease-out 80ms",
        }}
      />

      {/* INACTIVE state: number + short horizontal label, vertically centered.
          On-light colors since the card bg is now white magnesia glass. */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-3"
        style={{
          opacity: active ? 0 : 1,
          pointerEvents: active ? "none" : "auto",
          transition: "opacity 180ms ease-out",
        }}
      >
        <div
          className="font-heading text-32 font-extrabold tracking-tight tabular-nums leading-none mb-3"
          style={{ color: "var(--whyc-inactive-num)" }}
        >
          {row.num}
        </div>
        <span className="font-mono text-10 uppercase tracking-[0.18em] text-on-light-muted text-center">
          {row.shortLabel}
        </span>
      </div>

      {/* ACTIVE state: full content panel.
          On-blue colors since the active card bg is now sonic blue. */}
      <div
        className="absolute inset-0 p-7 md:p-8 flex flex-col"
        style={{
          opacity: active ? 1 : 0,
          pointerEvents: active ? "auto" : "none",
          transition: "opacity 220ms ease-out",
          transitionDelay: active ? "140ms" : "0ms",
        }}
      >
        {/* top row: number + label */}
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-heading text-on-blue-primary text-32 font-extrabold tracking-tight tabular-nums leading-none">
            {row.num}
          </span>
          <span className="font-mono text-10 uppercase tracking-wide text-on-blue-secondary">
            {row.label}
          </span>
        </div>

        {/* headline */}
        <h3 className="font-heading text-on-blue-primary text-20 lg:text-22 font-semibold tracking-tight mb-3 leading-snug max-w-md">
          {row.headline}
        </h3>

        {/* body */}
        <p className="font-body text-14 text-on-blue-secondary leading-relaxed mb-5 max-w-md">
          {row.body}
        </p>

        {row.code ? (
          /* SDK card — CodeBlock fills the remaining flex space and
             scrolls vertically if the snippet is taller than the card
             body. No spacer here: the block self-fills. */
          <CodeBlock code={row.code} display={row.codeDisplay} />
        ) : (
          <>
            {/* spacer pushes stat + viz to the bottom */}
            <div className="flex-1" />
            <div className="flex items-end justify-between gap-6">
              <div className="font-heading text-12 text-on-blue-secondary tabular-nums">
                <span className="text-on-blue-primary font-medium">
                  {row.statValue}
                </span>
                <span className="text-on-blue-faint mx-2">/</span>
                <span>{row.statLabel}</span>
              </div>
              <div className="shrink-0" aria-hidden style={{ width: 200 }}>
                {row.viz}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

/**
 * MobileCard — fully-expanded card for mobile (< md). The hover-expand
 * interaction does not work on touch, so on small screens we just show
 * all 3 cards stacked, each with full content.
 */
function MobileCard({ row }: { row: UseCaseRow }) {
  return (
    <article
      className="relative rounded-xl border p-5"
      style={{
        // Same frosted-glass recipe as Problem cards.
        background: "var(--card-glass-gradient)",
        backdropFilter: "blur(18px) saturate(1.15)",
        WebkitBackdropFilter: "blur(18px) saturate(1.15)",
        borderColor: "var(--card-glass-border)",
        boxShadow: "var(--card-glass-shadow)",
      }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-heading text-primary-blue text-22 font-extrabold tracking-tight tabular-nums leading-none">
          {row.num}
        </span>
        <span className="font-mono text-10 uppercase tracking-wide text-on-light-muted">
          {row.label}
        </span>
      </div>
      <h3 className="font-heading text-on-light-primary text-16 font-semibold tracking-tight mb-2 leading-snug">
        {row.headline}
      </h3>
      <p className="font-body text-12 text-on-light-secondary leading-relaxed mb-4">
        {row.body}
      </p>
      {row.code ? (
        <CodeBlock code={row.code} display={row.codeDisplay} compact />
      ) : (
        <div className="font-heading text-12 text-on-light-secondary tabular-nums">
          <span className="text-on-light-primary font-medium">
            {row.statValue}
          </span>
          <span className="text-on-light-faint mx-2">/</span>
          <span>{row.statLabel}</span>
        </div>
      )}
    </article>
  );
}

/**
 * CodeBlock — renders the SDK snippet inside the active card with a
 * Copy button in the top-right. Two visual variants:
 *   - default (desktop active card): white text on saturated blue,
 *     a darkened pane so the code stands out from the active card bg.
 *   - compact (mobile): a slightly smaller, on-light glass treatment
 *     so it pairs with the rest of the mobile glass cards.
 */
function CodeBlock({
  code,
  display,
  compact = false,
}: {
  code: string;
  display?: React.ReactNode;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable (rare); fail silently */
    }
  }
  // Two themed appearances. Desktop sits inside the saturated-blue
  // active card → darken-on-blue. Mobile sits inside a light glass
  // card → light glass.
  const wrapStyle: React.CSSProperties = compact
    ? {
        background: "rgba(0, 0, 0, 0.05)",
        borderColor: "var(--color-line-on-light-soft)",
        color: "var(--color-on-light-primary)",
      }
    : {
        background: "rgba(0, 0, 0, 0.28)",
        borderColor: "rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.92)",
      };
  return (
    <div
      // `flex-1 min-h-0` lets this wrapper fill the active card's
      // remaining height and shrink so the inner <pre> can scroll.
      // `cursor-default` overrides the parent card's `cursor-pointer`
      // — the code area is NOT clickable; only the Copy button is.
      className="relative w-full rounded-lg border overflow-hidden flex-1 min-h-0 cursor-default"
      style={wrapStyle}
    >
      <pre
        // Vertical scroll for long snippets, horizontal scroll for
        // long lines. h-full so it occupies the full wrapper height.
        className="font-mono text-10 md:text-12 leading-relaxed h-full overflow-x-auto overflow-y-auto"
        style={{
          margin: 0,
          padding: compact ? "10px 12px" : "12px 14px",
          paddingRight: compact ? 56 : 72,
        }}
      >
        <code>{display ?? code}</code>
      </pre>
      <button
        type="button"
        onClick={(e) => {
          // Don't bubble up to the ExpandCard's onClick (which would
          // re-trigger onActivate — harmless but redundant).
          e.stopPropagation();
          copy();
        }}
        className="cursor-pointer absolute top-2 right-2 font-mono text-10 tracking-wide uppercase px-2 py-1 rounded transition-colors"
        style={
          compact
            ? {
                background: "rgba(0, 0, 0, 0.04)",
                color: "var(--color-on-light-secondary)",
                border: "1px solid var(--color-line-on-light)",
              }
            : {
                background: "rgba(255, 255, 255, 0.10)",
                color: "rgba(255, 255, 255, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.20)",
              }
        }
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ============ WhatYouCanBuild row mini-vizes ============
 * 3 different *chart paradigms* per use-case semantic:
 *   - Oracles    → live price ticker (digit feed)
 *   - Agents     → loop diagram (dot orbiting a closed path)
 *   - Orderbooks → bid/ask depth ladder
 *
 * Each uses the shared visual language (sonic blue palette, mono labels,
 * thin strokes) but expresses its concept with a different layout.
 */

/**
 * PriceTickerViz (Oracles) — HTML viz showing a live-updating mark
 * price (4 decimal places). Updates every 250ms via a small interval
 * so the digits visibly tick up. A green `FRESH` pip with a ping
 * indicates "always-fresh" semantics.
 */
function PriceTickerViz() {
  const [price, setPrice] = useState(1.2345);
  useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => {
        // mostly tick up, with occasional micro dips for realism
        const drift = (Math.random() - 0.35) * 0.0028;
        return p + drift;
      });
    }, 240);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-end gap-2" style={{ width: 200 }}>
      <span className="font-mono text-10 uppercase tracking-[0.2em] text-on-blue-faint">
        Mark Price
      </span>
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-mono text-on-blue-primary font-bold tabular-nums"
          style={{ fontSize: 28, lineHeight: 1, letterSpacing: "-0.01em" }}
        >
          ${price.toFixed(4)}
        </span>
        <span
          style={{
            color: "#00FF94",
            fontSize: 16,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          ↑
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="relative inline-flex w-2 h-2">
          <span
            className="absolute inset-0 rounded-full bg-secondary-green opacity-60"
            style={{
              animation:
                "ns-fresh-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            className="relative w-2 h-2 rounded-full bg-secondary-green"
            style={{ boxShadow: "0 0 6px rgba(0,255,148,0.85)" }}
          />
        </span>
        <span
          className="font-mono text-10 uppercase tracking-[0.2em] font-semibold"
          style={{ color: "#00FF94" }}
        >
          Fresh
        </span>
      </div>
    </div>
  );
}

/**
 * AgentLoopViz (Agents) — bigger pill loop with 3 staggered orbiting
 * dots (representing 3 concurrent agents on dedicated runtimes) +
 * a center `×3 AGENTS` indicator. READ / ACT labels anchor the
 * decision-cycle semantic.
 */
function AgentLoopViz() {
  const W = 200;
  const H = 80;
  // Pill at (16, 26) with width 168 and height 28, rx 14
  const PX = 16;
  const PY = 26;
  const PW = 168;
  const PH = 28;
  const RX = 14;
  const cy = PY + PH / 2;
  // path matches the rounded rect so dots ride its outline
  const pillD = `M ${PX + RX},${PY} H ${PX + PW - RX} A ${RX},${RX} 0 0 1 ${PX + PW - RX},${PY + PH} H ${PX + RX} A ${RX},${RX} 0 0 1 ${PX + RX},${PY} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full"
      style={{ maxWidth: 200 }}
      role="img"
    >
      {/* visible pill loop (dashed) */}
      <rect
        x={PX}
        y={PY}
        width={PW}
        height={PH}
        rx={RX}
        ry={RX}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={0.7}
        strokeDasharray="3 2"
      />
      {/* invisible motion path */}
      <path id="ns-agent-loop" d={pillD} fill="none" />
      {/* READ label (top) */}
      <text
        x={W / 2}
        y={20}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={7}
        letterSpacing={1.4}
        fill="var(--color-on-blue-secondary)"
        textAnchor="middle"
        fontWeight={600}
      >
        READ
      </text>
      {/* ACT label (bottom) */}
      <text
        x={W / 2}
        y={H - 6}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={7}
        letterSpacing={1.4}
        fill="var(--color-on-blue-secondary)"
        textAnchor="middle"
        fontWeight={600}
      >
        ACT
      </text>
      {/* center indicator: ×3 / AGENTS */}
      <text
        x={W / 2}
        y={cy - 1}
        fontFamily="var(--font-heading), sans-serif"
        fontSize={11}
        letterSpacing={-0.2}
        fill="#00FF94"
        textAnchor="middle"
        fontWeight={700}
      >
        ×3
      </text>
      <text
        x={W / 2}
        y={cy + 8}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={5.4}
        letterSpacing={1}
        fill="var(--color-on-blue-faint)"
        textAnchor="middle"
      >
        AGENTS
      </text>
      {/* 3 chip "cars" rolling on the loop track. rect is offset to (-4,-4)
          so its center sits on the motion point; rotate="auto" tilts each
          chip to match the path tangent (so they tilt at the rounded ends
          like train cars on a curved track). begin staggered by CYCLE/3
          so the 3 chips are evenly distributed on the loop. */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={-4}
          y={-4}
          width={8}
          height={8}
          rx={1.5}
          fill={i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)"}
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={0.6}
        >
          <animateMotion
            dur="4.5s"
            repeatCount="indefinite"
            begin={`${(i * 4.5) / 3}s`}
            rotate="auto"
          >
            <mpath href="#ns-agent-loop" />
          </animateMotion>
        </rect>
      ))}
    </svg>
  );
}

/**
 * OrderbookLadderViz (Orderbooks) — 3 ask bars above a midline, 3 bid
 * bars below it. Bars width represents depth; widths breath subtly
 * (scaleX) staggered so the ladder feels alive. Asks use blue (sell),
 * bids use green (buy / accept) — keeps red out of the palette.
 */
function OrderbookLadderViz() {
  const W = 200;
  const H = 80;
  const cx = W / 2;
  const ROW_H = 6;
  const GAP = 3;
  // ask widths (top → bottom), bid widths (top → bottom)
  const askWidths = [60, 84, 110];
  const bidWidths = [110, 84, 60];
  const MID_Y = H / 2;
  const startAskY = MID_Y - GAP - askWidths.length * (ROW_H + GAP);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full"
      style={{ maxWidth: 200 }}
      role="img"
    >
      {/* 3 ask bars (top, white-tinted on blue bg) */}
      {askWidths.map((w, i) => (
        <rect
          key={`ask-${i}`}
          x={cx - w / 2}
          y={startAskY + i * (ROW_H + GAP)}
          width={w}
          height={ROW_H}
          rx={1}
          fill="rgba(255,255,255,0.35)"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth={0.4}
          style={{
            animation: "ns-ladder-breath 2.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      ))}
      {/* mid line + price label — bright sonic green for visibility on blue */}
      <line
        x1={6}
        y1={MID_Y}
        x2={W - 6}
        y2={MID_Y}
        stroke="#00FF94"
        strokeWidth={0.6}
        strokeDasharray="2 2"
      />
      <text
        x={W - 6}
        y={MID_Y - 2}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={7}
        letterSpacing={0.5}
        fill="#00FF94"
        textAnchor="end"
        fontWeight={600}
      >
        $1.2345
      </text>
      {/* 3 bid bars (bottom, bright sonic green) */}
      {bidWidths.map((w, i) => (
        <rect
          key={`bid-${i}`}
          x={cx - w / 2}
          y={MID_Y + GAP + i * (ROW_H + GAP)}
          width={w}
          height={ROW_H}
          rx={1}
          fill="rgba(0,255,148,0.35)"
          stroke="#00FF94"
          strokeWidth={0.4}
          style={{
            animation: "ns-ladder-breath 2.2s ease-in-out infinite",
            animationDelay: `${i * 0.18 + 1.1}s`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      ))}
      {/* tiny side labels: ASK (top right) / BID (bottom right) */}
      <text
        x={W - 6}
        y={startAskY - 2}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={6.5}
        letterSpacing={1}
        fill="rgba(255,255,255,0.75)"
        textAnchor="end"
        fontWeight={600}
      >
        ASK
      </text>
      <text
        x={W - 6}
        y={H - 2}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={6.5}
        letterSpacing={1}
        fill="#00FF94"
        textAnchor="end"
        fontWeight={600}
      >
        BID
      </text>
    </svg>
  );
}
