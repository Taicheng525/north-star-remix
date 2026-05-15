"use client";

import { useEffect, useState } from "react";
import { Bolt, ChartLine } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

export default function ByTheNumbers() {
  return (
    <section className="relative w-full">
      <SectionDivider label="Performance" theme="light" />

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 py-12 md:py-18">
        <RevealOnScroll className="w-full">
          <div className="max-w-3xl mb-10 md:mb-14">
            <div className="flex items-center gap-2 mb-5 font-mono text-10 uppercase tracking-wide text-primary-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
              <span>Benchmarks</span>
            </div>
            <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
              Performance{" "}That{" "}Changes the{" "}<span className="text-primary-blue">Math</span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Per-card stagger reveal — the 3 cards cascade in left-to-right
            as the section enters the viewport, instead of all 3 popping
            in together. */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <RevealOnScroll delayMs={150}>
            <BigStat
              num="01"
              category="Latency"
              icon={<Bolt size={18} className="text-primary-blue" />}
              prefix="<"
              value="50"
              suffix="ms"
              label="Confirmation"
              context={
                <>
                  <span className="text-on-light-primary font-medium">8×</span>{" "}
                  faster than a standard blockchain slot
                </>
              }
              viz={<LatencyPing />}
            />
          </RevealOnScroll>
          <RevealOnScroll delayMs={330}>
            <BigStat
              num="02"
              category="Throughput"
              icon={<ChartLine size={18} className="text-primary-blue" />}
              prefix=">"
              value="1M"
              suffix="tps"
              label="Throughput"
              context={
                <>
                  <span className="text-on-light-primary font-medium">15×</span>{" "}
                  more than Solana L1
                </>
              }
              viz={<ThroughputMatrix />}
            />
          </RevealOnScroll>
          <RevealOnScroll delayMs={510}>
            <BigStat
              num="03"
              category="Cost"
              icon={
                <span className="font-heading text-primary-blue text-16 font-semibold">
                  $
                </span>
              }
              prefix="≈"
              value="$0"
              label="Per-transaction cost"
              context={
                <>
                  vs.{" "}
                  <span className="text-on-light-primary font-medium">
                    $236K/year
                  </span>{" "}
                  on shared infrastructure
                </>
              }
              viz={<CostTxFeeLog />}
            />
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        /* Card hover — lift up + sonic-blue glow + blue-tinted border.
           !important is needed because the base styles are inline (higher
           CSS specificity). */
        .bty-card:hover {
          transform: translateY(-6px);
          border-color: var(--card-glass-hover-border) !important;
          box-shadow: var(--card-glass-hover-shadow) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .bty-card:hover {
            transform: none;
          }
        }
        /* Latency — outgoing blue ping dot (0–35%), then idle until next loop */
        @keyframes ns-ping-out {
          0%, 5%    { transform: translateX(0);                opacity: 0; }
          10%       { opacity: 1; }
          35%       { transform: translateX(var(--ping-travel)); opacity: 1; }
          40%, 100% { transform: translateX(var(--ping-travel)); opacity: 0; }
        }
        /* Latency — incoming green ping dot (50–85%), reverse direction */
        @keyframes ns-ping-back {
          0%, 50%   { transform: translateX(0);                                 opacity: 0; }
          55%       { opacity: 1; }
          85%       { transform: translateX(calc(var(--ping-travel) * -1));     opacity: 1; }
          90%, 100% { transform: translateX(calc(var(--ping-travel) * -1));     opacity: 0; }
        }
        /* Latency — target chip flashes green when ping arrives (35–50%) */
        @keyframes ns-ping-target-flash {
          0%, 30%, 60%, 100% { stroke: rgba(0,0,255,0.7); fill: none; }
          35%, 50%           { stroke: #0F8F5C;            fill: rgba(15,143,92,0.18); }
        }
        /* Throughput — dot-matrix flicker (chip pulses opacity at randomized stagger) */
        @keyframes ns-throughput-flicker {
          0%, 100% { opacity: 0.25; }
          35%, 50% { opacity: 1; }
        }
        /* Cost — TX feed row entry fade-in */
        @keyframes ns-tx-row-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ns-ping-"],
          [style*="ns-throughput-"],
          [style*="ns-tx-"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function BigStat({
  num,
  category,
  icon,
  prefix,
  value,
  suffix,
  label,
  context,
  viz,
}: {
  num: string;
  category: string;
  icon: React.ReactNode;
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
  context: React.ReactNode;
  viz: React.ReactNode;
}) {
  return (
    <article
      // bty-card class hooks the `:hover` rule in the section <style>
      // block (lift + blue border tint + blue glow shadow on hover).
      className="bty-card relative rounded-xl border p-6 md:p-8 lg:p-10 h-full"
      style={{
        // Same frosted-glass recipe as Problem cards — the 3 stat cards
        // now have the same material quality.
        background: "var(--card-glass-gradient)",
        backdropFilter: "blur(18px) saturate(1.15)",
        WebkitBackdropFilter: "blur(18px) saturate(1.15)",
        borderColor: "var(--card-glass-border)",
        boxShadow: "var(--card-glass-shadow)",
        transition:
          "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease-out, border-color 320ms ease-out",
      }}
    >
      {/* eyebrow row */}
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <div className="flex items-center gap-2 font-mono text-10 uppercase tracking-wide text-on-light-muted">
          <span className="text-primary-blue">{num}</span>
          <span className="w-6 h-px bg-on-light-faint opacity-60" />
          <span>{category}</span>
        </div>
        {icon}
      </div>

      {/* value */}
      <div className="flex items-baseline gap-2 flex-wrap">
        {prefix && (
          <span className="font-heading text-on-light-faint text-16 md:text-22">
            {prefix}
          </span>
        )}
        <span
          className="font-heading text-on-light-primary font-extrabold tracking-tight"
          style={{ fontSize: "clamp(32px, 4vw, 50px)", lineHeight: 1 }}
        >
          {value}
        </span>
        {suffix && (
          <span className="font-heading text-on-light-muted text-16 md:text-20 font-medium">
            {suffix}
          </span>
        )}
      </div>

      {/* label */}
      <div
        className="mt-4 font-heading text-on-light-primary text-14 lg:text-16 font-semibold tracking-tight leading-tight"
        style={{ minHeight: "2.5rem" }}
      >
        {label}
      </div>

      <div className="mt-1.5 font-body text-12 text-on-light-secondary leading-relaxed">
        {context}
      </div>

      {/* mini chip viz — bottom decorative reinforcement of the data above */}
      <div className="mt-6 md:mt-7" aria-hidden>
        {viz}
      </div>
    </article>
  );
}

/* ============ ByTheNumbers mini-vizes ============
 * 3 different forms (no overlap):
 *   - Latency    → vertical tick lines (metronome rhythm)
 *   - Throughput → dense chip dot-matrix (concurrent swarm)
 *   - Cost       → minimal single-bar with tiny fill ($0 floor indicator)
 */

const COST_GREEN = "#0F8F5C";

/**
 * LatencyPing — horizontal ping round-trip. A blue chip "source" on the
 * left and a hollow chip "target" on the right are connected by a dashed
 * line. A blue dot (request) flies left→right in the first half of the
 * cycle; the target chip flashes green on arrival; then a green dot
 * (response) flies right→left in the second half. Total cycle ~1.6s
 * communicates "very low round-trip latency".
 *
 * Distinct from Solution.SequenceDiagram (which has APP/RUNTIME UML
 * lifelines + 2 arrows + labels) — this is a single-line ping with no
 * lifelines, just the round-trip motion.
 */
function LatencyPing() {
  const W = 200;
  const H = 28;
  const SRC_X = 12;
  const TGT_X = W - 12;
  const TRAVEL = TGT_X - SRC_X;
  const cy = H / 2;
  const CHIP = 8;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full max-w-[200px] h-auto"
      role="img"
    >
      {/* dashed line connecting source and target */}
      <line
        x1={SRC_X + CHIP / 2}
        y1={cy}
        x2={TGT_X - CHIP / 2}
        y2={cy}
        stroke="rgba(0,0,255,0.3)"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      {/* source chip — saturated, static */}
      <rect
        x={SRC_X - CHIP / 2}
        y={cy - CHIP / 2}
        width={CHIP}
        height={CHIP}
        rx={1.5}
        fill="rgba(0,0,255,0.6)"
        stroke="rgba(0,0,255,0.85)"
        strokeWidth={0.6}
      />
      {/* target chip — hollow, flashes green when ping arrives */}
      <rect
        x={TGT_X - CHIP / 2}
        y={cy - CHIP / 2}
        width={CHIP}
        height={CHIP}
        rx={1.5}
        fill="none"
        stroke="rgba(0,0,255,0.7)"
        strokeWidth={0.7}
        style={{
          animation: "ns-ping-target-flash 1.6s linear infinite",
        }}
      />
      {/* outgoing blue ping dot, 0–40% phase */}
      <circle
        cx={SRC_X}
        cy={cy}
        r={2.2}
        fill="rgba(0,0,255,0.95)"
        style={{
          animation: "ns-ping-out 1.6s linear infinite",
          ["--ping-travel" as string]: `${TRAVEL}px`,
        }}
      />
      {/* incoming green ping dot, 50–90% phase */}
      <circle
        cx={TGT_X}
        cy={cy}
        r={2.2}
        fill="#0F8F5C"
        style={{
          animation: "ns-ping-back 1.6s linear infinite",
          ["--ping-travel" as string]: `${TRAVEL}px`,
        }}
      />
    </svg>
  );
}

/**
 * ThroughputMatrix — 3×12 chip "swarm" matrix where each chip flickers
 * with a pseudo-random stagger via `(idx * PRIME) % TOTAL` (PRIME coprime
 * to TOTAL → unique delay phase per chip), suggesting massive concurrent
 * activity.
 */
function ThroughputMatrix() {
  const ROWS = 3;
  const COLS = 12;
  const CHIP = 6;
  const GAP = 3;
  const W = COLS * CHIP + (COLS - 1) * GAP + 4;
  const H = ROWS * CHIP + (ROWS - 1) * GAP + 4;
  const TOTAL = ROWS * COLS;
  const PRIME = 7;
  const CYCLE = 1.5;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full max-w-[140px] h-auto"
      role="img"
    >
      {Array.from({ length: ROWS }).map((_, r) =>
        Array.from({ length: COLS }).map((_, c) => {
          const idx = r * COLS + c;
          const delay = (((idx * PRIME) % TOTAL) / TOTAL) * CYCLE;
          return (
            <rect
              key={`${r}-${c}`}
              x={2 + c * (CHIP + GAP)}
              y={2 + r * (CHIP + GAP)}
              width={CHIP}
              height={CHIP}
              rx={1.2}
              fill="rgba(0,0,255,0.45)"
              stroke="rgba(0,0,255,0.75)"
              strokeWidth={0.5}
              style={{
                animation: `ns-throughput-flicker ${CYCLE}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })
      )}
    </svg>
  );
}

/**
 * CostTxFeeLog — terminal-style live transaction fee log. 3 most-recent
 * TX rows are shown; every ~800ms a new TX is prepended with a tiny
 * randomized fee, the oldest is dropped. Each fee is in the
 * micro-cent range (≈ $0 in practice, but explicitly *non-zero* so
 * the animation has motion — addresses the "if cost is truly 0 there
 * is no animation" feedback). Each row shows `TX #id  $0.000xxx ✓`.
 */
function CostTxFeeLog() {
  type Tx = { id: number; fee: string };
  const [txs, setTxs] = useState<Tx[]>([
    { id: 4203, fee: "0.000091" },
    { id: 4202, fee: "0.000128" },
    { id: 4201, fee: "0.000087" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxs((prev) => {
        const newId = prev[0].id + 1;
        // values intentionally tiny: ~7e-5 to ~2.5e-4 USD per TX
        const newFee = (0.00006 + Math.random() * 0.00018).toFixed(6);
        return [{ id: newId, fee: newFee }, ...prev.slice(0, 2)];
      });
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      // Responsive width: fills the card content area but never exceeds
      // 200px. Prevents the rightmost ✓ from overflowing the card edge
      // when the section is on a narrower viewport.
      className="font-mono text-10 leading-tight space-y-0.5 w-full max-w-[200px]"
      aria-hidden
    >
      {txs.map((tx, i) => (
        <div
          // key includes id so React re-mounts the top row each tick,
          // re-triggering the row-fade-in animation for new entries.
          key={tx.id}
          className="flex items-baseline justify-between tabular-nums"
          style={{
            opacity: 1 - i * 0.32,
            animation: i === 0 ? "ns-tx-row-in 280ms ease-out" : undefined,
          }}
        >
          <span className="text-on-light-faint">
            TX #{tx.id.toString().padStart(4, "0")}
          </span>
          <span className="text-on-light-secondary">${tx.fee}</span>
          <span style={{ color: COST_GREEN, fontWeight: 700 }}>✓</span>
        </div>
      ))}
    </div>
  );
}
