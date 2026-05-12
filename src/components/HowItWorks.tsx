"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

export default function HowItWorks() {
  return (
    <section className="relative w-full">
      <div className="pt-12 md:pt-16">
        <SectionDivider label="Mechanics" theme="light" />
      </div>

      {/* PROBLEM HALF */}
      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 pt-10 md:pt-12 pb-12 md:pb-18">
        <RevealOnScroll>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
            <span className="font-heading text-10 uppercase tracking-wide text-on-light-muted">
              The Problem
            </span>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 md:mb-14">
          <RevealOnScroll className="lg:col-span-7">
            <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
              Some Workloads{" "}Need{" "}a{" "}
              <span className="text-primary-blue">
                Dedicated{" "}Runtime
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-5" delayMs={150}>
            <p className="font-body text-14 md:text-16 text-on-light-secondary leading-relaxed">
              High-frequency updates, real-time pricing, autonomous agents. These
              workloads need guaranteed throughput, not a shared queue.
            </p>
          </RevealOnScroll>
        </div>

        <div className="flex flex-col gap-5">
          <RevealOnScroll delayMs={120} className="w-full">
            <ProblemRow
              label="On-Chain Oracles"
              body="Every write costs gas and queues behind unrelated traffic. Every read returns stale data while updates are stuck waiting."
              visual={<OracleVisual />}
            />
          </RevealOnScroll>
          <RevealOnScroll delayMs={240} className="w-full">
            <ProblemRow
              label="Autonomous Agents"
              body="Every decision loop is bottlenecked by block time. Agents can't react faster than the chain confirms."
              visual={<AgentsVisual />}
            />
          </RevealOnScroll>
          <RevealOnScroll delayMs={360} className="w-full">
            <ProblemRow
              label="On-Chain Orderbooks"
              body="Thousands of updates per second, but shared throughput can only carry a fraction."
              visual={<OrderbookVisual />}
            />
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={250}>
          <div className="mt-10 flex items-center gap-4">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(15,23,42,0.15), transparent)",
              }}
            />
            <p className="font-body text-12 md:text-14 text-on-light-muted italic text-center">
              …and any workload that demands guaranteed throughput
            </p>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(15,23,42,0.15), transparent)",
              }}
            />
          </div>
        </RevealOnScroll>
      </div>

      {/* TRANSITION DIVIDER */}
      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10">
        <div className="relative h-10 md:h-12 flex items-center justify-center">
          <div
            className="absolute inset-x-0 top-1/2 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,255,0.4) 50%, transparent)",
            }}
          />
          <div
            className="relative flex items-center gap-3 px-5 py-2 rounded-full bg-surface-light border border-line-on-light"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), 0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <ArrowDown size={14} className="text-primary-blue" />
            <span className="font-heading text-10 uppercase tracking-wide text-on-light-secondary">
              The North Star Approach
            </span>
          </div>
        </div>
      </div>

      {/* SOLUTION HALF — pt/pb removed; the SolutionTimeline already
          pins the entire group (label + heading + intro + cards +
          italic) inside its 100vh sticky child, so any wrapper padding
          here just pushes the lock region away from the surrounding
          sections without adding visible spacing inside it. */}
      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10">
        {/* "THE SOLUTION" label + heading + intro + scroll-stack are ALL
            inside SolutionTimeline now. They pin together inside the
            sticky child so the entire group (label, heading, intro,
            cards, italic) shares the same lock phase — no orphaned
            elements floating above the sticky region. */}
        <SolutionTimeline />
      </div>

      <style>{`
        /* Problem-card hover — lift + sonic-blue border tint + blue
           glow. Matches .bty-card:hover in ByTheNumbers exactly so
           hover interaction language is consistent across the page. */
        .problem-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 0, 255, 0.30) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(255,255,255,0.4),
            0 1px 0 rgba(0,0,0,0.02),
            0 18px 40px rgba(0, 0, 255, 0.18),
            0 28px 60px rgba(15,23,42,0.05) !important;
        }
        /* Tiny "live alert" indicator next to each Problem label —
           6px red dot with a slow expanding halo (1.8s breath). */
        .problem-pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b91c1c;
          position: relative;
          flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(185, 28, 28, 0.55);
          animation: ns-problem-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ns-problem-pulse {
          0%, 100% {
            opacity: 0.75;
            box-shadow: 0 0 0 0 rgba(185, 28, 28, 0.5);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 0 6px rgba(185, 28, 28, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .problem-card:hover { transform: none; }
          .problem-pulse-dot { animation: none; }
        }
        /* Oracle write row — strip of blocks scrolls left, simulating queue ingress */
        @keyframes ns-oracle-stream {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* Oracle read row — stale labels fade in & out */
        @keyframes ns-oracle-stale {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 1; }
        }
        /* Agents WAIT — red glow pulse */
        @keyframes ns-agents-wait {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(185,28,28,0);
            background: rgba(185,28,28,0.05);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(185,28,28,0.12);
            background: rgba(185,28,28,0.14);
          }
        }
        /* Agents connector — flowing dashes (right-to-left) */
        @keyframes ns-agents-rail {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -14; }
        }
        /* Solution 01 (sequence) — request dot APP→RUNTIME, blue, 0–40% */
        @keyframes ns-seq-req {
          0%, 5%    { transform: translateX(0);                opacity: 0; }
          10%       { opacity: 1; }
          35%       { transform: translateX(var(--seq-travel)); opacity: 1; }
          40%, 100% { transform: translateX(var(--seq-travel)); opacity: 0; }
        }
        /* Solution 01 (sequence) — response dot RUNTIME→APP, green, 50–85% */
        @keyframes ns-seq-res {
          0%, 50%   { transform: translateX(0);                  opacity: 0; }
          55%       { opacity: 1; }
          85%       { transform: translateX(calc(var(--seq-travel) * -1)); opacity: 1; }
          90%, 100% { transform: translateX(calc(var(--seq-travel) * -1)); opacity: 0; }
        }
        /* Solution 02 (resource pool) — chip pulses in clockwise stagger */
        @keyframes ns-runtime-pulse {
          0%, 60%, 100% { opacity: 0.35; }
          15%, 30%      { opacity: 1; }
        }
        /* Orderbook bars — clear scaleY oscillation, staggered */
        @keyframes ns-orderbook-bar {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.55); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ns-oracle-"],
          [style*="ns-agents-"],
          [style*="ns-orderbook-"],
          [style*="ns-seq-"],
          [style*="ns-runtime-"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProblemRow({
  label,
  body,
  visual,
}: {
  label: string;
  body: string;
  visual: React.ReactNode;
}) {
  return (
    <article
      // problem-card class hooks the `:hover` rule in the section
      // <style> block (lift + red border tint + red glow shadow on
      // hover — red because the Problem section reads as "alert").
      className="problem-card relative grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] gap-6 md:gap-12 items-stretch rounded-xl px-6 md:px-8 py-6 md:py-7 border"
      style={{
        // Frosted glass — translucent white with backdrop blur so the page
        // behind shows through softly (echoes the reference site's feel).
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.36), rgba(255,255,255,0.22) 55%, rgba(255,255,255,0.30))",
        backdropFilter: "blur(18px) saturate(1.15)",
        WebkitBackdropFilter: "blur(18px) saturate(1.15)",
        borderColor: "rgba(255,255,255,0.75)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.4), 0 1px 0 rgba(0,0,0,0.02), 0 14px 32px rgba(15,23,42,0.06), 0 28px 60px rgba(15,23,42,0.05)",
        transition:
          "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease-out, border-color 320ms ease-out",
        // All 3 cards lock to this min-height for visual consistency.
        minHeight: "200px",
      }}
    >
      {/* LEFT: copy */}
      <div className="relative flex flex-col justify-center">
        <div className="font-heading text-14 uppercase tracking-[0.18em] text-primary-blue font-semibold mb-3 flex items-center gap-2">
          {/* Tiny pulsing red dot — "live alert" indicator matching
              the problem-row visual vocabulary (the visuals all use
              red for WAIT / STALE / GAS↑). */}
          <span aria-hidden className="problem-pulse-dot" />
          {label}
        </div>
        <p className="font-body text-14 text-on-light-secondary leading-relaxed max-w-sm">
          {body}
        </p>
      </div>
      {/* RIGHT: visual — vertically centered */}
      <div className="relative w-full flex items-center justify-center">
        {visual}
      </div>
    </article>
  );
}

/* ============ visuals (SVG-based) ============ */

const RED = "#b91c1c";
const RED_BG = "rgba(185,28,28,0.08)";
const VIS_WIDTH = 360;

/**
 * OracleVisual
 * - "write" row: a stream of small blue blocks scrolling LEFT continuously
 *   (suggesting writes piling into the chain queue). Each block has a small
 *   gas-cost ticker on the right.
 * - "read" row: 3 dashed "stale" pills that fade in / fade out in a clear
 *   2.4s breath, staggered.
 */
function OracleVisual() {
  const COUNT = 26;
  const BLOCK = 13;
  const BLOCK_GAP = 5;
  const ROW_X = 38;
  const ROW_W = 286;
  const ROW_H = 26;
  const WRITE_Y = 6;
  const READ_Y = 40;

  return (
    <svg
      viewBox={`0 0 ${VIS_WIDTH} 84`}
      className="block w-full"
      style={{ maxWidth: 420 }}
      aria-hidden
      role="img"
    >
      <defs>
        <clipPath id="ns-oracle-write-clip">
          <rect x={ROW_X} y={WRITE_Y} width={ROW_W - 36} height={ROW_H} rx={3} />
        </clipPath>
      </defs>

      {/* WRITE label */}
      <text
        x={4}
        y={WRITE_Y + ROW_H / 2 + 3}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={8}
        letterSpacing={1.6}
        fill="var(--color-on-light-muted)"
      >
        WRITE
      </text>
      {/* WRITE row container */}
      <rect
        x={ROW_X}
        y={WRITE_Y}
        width={ROW_W}
        height={ROW_H}
        rx={3}
        fill="rgba(0,0,255,0.04)"
        stroke="var(--color-line-on-light)"
        strokeWidth={0.8}
      />
      {/* scrolling blocks */}
      <g clipPath="url(#ns-oracle-write-clip)">
        <g
          style={{
            animation: "ns-oracle-stream 5s linear infinite",
            willChange: "transform",
          }}
        >
          {Array.from({ length: COUNT * 2 }).map((_, i) => (
            <rect
              key={i}
              x={ROW_X + 6 + i * (BLOCK + BLOCK_GAP)}
              y={WRITE_Y + (ROW_H - BLOCK) / 2}
              width={BLOCK}
              height={BLOCK}
              rx={2}
              fill="rgba(0,0,255,0.45)"
              stroke="rgba(0,0,255,0.75)"
              strokeWidth={0.5}
            />
          ))}
        </g>
      </g>
      {/* GAS pill */}
      <g>
        <rect
          x={ROW_X + ROW_W - 34}
          y={WRITE_Y + 3}
          width={30}
          height={ROW_H - 6}
          rx={2}
          fill="rgba(255,255,255,0.96)"
          stroke="var(--color-line-on-light)"
          strokeWidth={0.8}
        />
        <text
          x={ROW_X + ROW_W - 19}
          y={WRITE_Y + ROW_H / 2 + 3}
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize={8}
          letterSpacing={0.4}
          fill={RED}
          textAnchor="middle"
        >
          GAS↑
        </text>
      </g>

      {/* READ label */}
      <text
        x={4}
        y={READ_Y + ROW_H / 2 + 3}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={8}
        letterSpacing={1.6}
        fill="var(--color-on-light-muted)"
      >
        READ
      </text>
      {/* READ row container */}
      <rect
        x={ROW_X}
        y={READ_Y}
        width={ROW_W}
        height={ROW_H}
        rx={3}
        fill="rgba(0,0,255,0.015)"
        stroke="var(--color-line-on-light)"
        strokeWidth={0.8}
      />
      {/* 3 STALE pills */}
      {[0, 1, 2].map((i) => {
        const px = ROW_X + 38 + i * 80;
        return (
          <g
            key={i}
            style={{
              animation: `ns-oracle-stale 2.4s ease-in-out ${i * 0.4}s infinite`,
              transformOrigin: "center",
            }}
          >
            <rect
              x={px}
              y={READ_Y + 4}
              width={42}
              height={ROW_H - 8}
              rx={2}
              fill={RED_BG}
              stroke={RED}
              strokeWidth={0.8}
              strokeDasharray="2 1.4"
            />
            <text
              x={px + 21}
              y={READ_Y + ROW_H / 2 + 3}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize={8}
              letterSpacing={0.6}
              fill={RED}
              textAnchor="middle"
            >
              STALE
            </text>
          </g>
        );
      })}

      {/* caption */}
      <text
        x={VIS_WIDTH / 2}
        y={76}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={8}
        letterSpacing={1}
        fill="var(--color-on-light-faint)"
        textAnchor="middle"
      >
        WRITES QUEUE UP → READS RETURN OUTDATED STATE
      </text>
    </svg>
  );
}

/**
 * AgentsVisual
 * - 4 step pills: read → act → WAIT(red) → read
 * - A scanning "playhead" (small dark dot) advances through steps,
 *   pausing on WAIT. Total cycle 3.2s.
 */
function AgentsVisual() {
  const steps = [
    { label: "READ", t: "~12ms" },
    { label: "ACT", t: "~6ms" },
    { label: "WAIT", t: "≥400ms", warn: true },
    { label: "READ", t: "~12ms" },
  ];
  const STEP_W = 64;
  const STEP_H = 30;
  const STEP_GAP = 10;
  const STEP_Y = 10;
  const TOTAL_STEPS_W =
    steps.length * STEP_W + (steps.length - 1) * STEP_GAP;
  const STEPS_X0 = (VIS_WIDTH - TOTAL_STEPS_W) / 2;

  return (
    <svg
      viewBox={`0 0 ${VIS_WIDTH} 96`}
      className="block w-full"
      style={{ maxWidth: 420 }}
      aria-hidden
      role="img"
    >
      {/* connectors — only in the gaps between adjacent step boxes; flowing dashes */}
      {steps.slice(0, -1).map((_, i) => {
        const gapStartX = STEPS_X0 + (i + 1) * STEP_W + i * STEP_GAP;
        const cy = STEP_Y + STEP_H / 2;
        return (
          <g key={`gap-${i}`}>
            <line
              x1={gapStartX + 1}
              y1={cy}
              x2={gapStartX + STEP_GAP - 1}
              y2={cy}
              stroke="rgba(0,0,255,0.35)"
              strokeWidth={1}
              strokeDasharray="2 2"
              style={{
                animation: `ns-agents-rail 1.2s linear infinite ${i * 0.15}s`,
              }}
            />
            {/* chevron tip pointing into the next box */}
            <polyline
              points={`${gapStartX + STEP_GAP - 4},${cy - 2.5} ${gapStartX + STEP_GAP - 1},${cy} ${gapStartX + STEP_GAP - 4},${cy + 2.5}`}
              stroke="rgba(0,0,255,0.55)"
              strokeWidth={1}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* step boxes */}
      {steps.map((s, i) => {
        const x = STEPS_X0 + i * (STEP_W + STEP_GAP);
        const isWarn = s.warn === true;
        return (
          <g key={i}>
            <rect
              x={x}
              y={STEP_Y}
              width={STEP_W}
              height={STEP_H}
              rx={3}
              fill={isWarn ? RED_BG : "rgba(255,255,255,0.18)"}
              stroke={isWarn ? RED : "var(--color-line-on-light)"}
              strokeWidth={isWarn ? 1 : 0.8}
              style={
                isWarn
                  ? {
                      animation:
                        "ns-agents-wait 1.8s ease-in-out infinite",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }
                  : undefined
              }
            />
            <text
              x={x + STEP_W / 2}
              y={STEP_Y + STEP_H / 2 + 3}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize={9}
              letterSpacing={1.2}
              fill={isWarn ? RED : "var(--color-on-light-primary)"}
              textAnchor="middle"
            >
              {s.label}
            </text>
            {/* per-step timing annotation */}
            <text
              x={x + STEP_W / 2}
              y={STEP_Y + STEP_H + 12}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize={8}
              letterSpacing={0.6}
              fill={isWarn ? RED : "var(--color-on-light-faint)"}
              textAnchor="middle"
            >
              {s.t}
            </text>
          </g>
        );
      })}

      {/* cycle indicator bar at bottom */}
      <g>
        <line
          x1={STEPS_X0}
          y1={78}
          x2={VIS_WIDTH / 2 - 60}
          y2={78}
          stroke={RED}
          strokeWidth={0.8}
          strokeOpacity={0.6}
        />
        <line
          x1={VIS_WIDTH / 2 + 60}
          y1={78}
          x2={STEPS_X0 + TOTAL_STEPS_W}
          y2={78}
          stroke={RED}
          strokeWidth={0.8}
          strokeOpacity={0.6}
        />
        <text
          x={VIS_WIDTH / 2}
          y={82}
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize={8}
          letterSpacing={1}
          fill={RED}
          textAnchor="middle"
        >
          ≥400MS PER CYCLE
        </text>
      </g>
    </svg>
  );
}

/**
 * OrderbookVisual
 * - Dense vertical bar histogram (~22 bars). Bars clamped at the shared
 *   limit line — anything that "wants to" go above it is rendered as a faint
 *   ghost stub clipped at the line.
 * - Bars wave continuously (subtle scaleY 0.6 ↔ 1, staggered) — clearly
 *   visible motion.
 */
function OrderbookVisual() {
  // 36 bars to fill the full visualization width (matches Oracle / Agents).
  const bars = [
    34, 50, 44, 62, 40, 56, 68, 48, 64, 54, 60, 42, 58, 70, 46, 64, 56, 72,
    44, 60, 52, 68, 46, 56, 74, 50, 62, 78, 48, 66, 58, 70, 54, 76, 50, 66,
  ];
  const CHART_H = 100;
  const LIMIT_VAL = 60;
  const BAR_W = 5;
  const BAR_GAP = 3;
  const TOTAL_BARS_W = bars.length * BAR_W + (bars.length - 1) * BAR_GAP;
  const X0 = (VIS_WIDTH - TOTAL_BARS_W) / 2;
  const TOP_PAD = 8; // space for limit label above limit line
  const LIMIT_Y = CHART_H + TOP_PAD - LIMIT_VAL;
  const VB_H = CHART_H + TOP_PAD + 16; // include x-axis ticks at bottom

  return (
    <svg
      viewBox={`0 0 ${VIS_WIDTH} ${VB_H}`}
      className="block w-full"
      style={{ maxWidth: 420 }}
      aria-hidden
      role="img"
    >
      {/* faint baseline */}
      <line
        x1={X0 - 6}
        y1={CHART_H + TOP_PAD}
        x2={X0 + TOTAL_BARS_W + 6}
        y2={CHART_H + TOP_PAD}
        stroke="var(--color-line-on-light)"
        strokeWidth={0.6}
      />

      {/* bars */}
      {bars.map((h, i) => {
        const x = X0 + i * (BAR_W + BAR_GAP);
        const overshoot = Math.max(0, h - LIMIT_VAL);
        const visible = Math.min(h, LIMIT_VAL);
        const baseY = CHART_H + TOP_PAD;
        return (
          <g
            key={i}
            style={{
              animation: `ns-orderbook-bar 2.6s ease-in-out ${i * 0.07}s infinite`,
              transformBox: "fill-box",
              transformOrigin: "center bottom",
            }}
          >
            {/* visible blue portion (below or at limit) */}
            <rect
              x={x}
              y={baseY - visible}
              width={BAR_W}
              height={visible}
              rx={1}
              fill="rgba(0,0,255,0.45)"
              stroke="rgba(0,0,255,0.75)"
              strokeWidth={0.5}
            />
            {/* overshoot portion (above limit) — red */}
            {overshoot > 0 && (
              <rect
                x={x}
                y={baseY - h}
                width={BAR_W}
                height={overshoot}
                rx={1}
                fill="rgba(185,28,28,0.4)"
                stroke={RED}
                strokeWidth={0.6}
                strokeOpacity={0.95}
              />
            )}
          </g>
        );
      })}

      {/* limit line — dashed red */}
      <line
        x1={X0 - 12}
        y1={LIMIT_Y}
        x2={X0 + TOTAL_BARS_W + 12}
        y2={LIMIT_Y}
        stroke={RED}
        strokeWidth={0.8}
        strokeDasharray="4 3"
      />
      {/* limit label pill */}
      <g>
        {/* Widened pill (120→140 wide, x shifted left by 20) and
            reduced letter-spacing on the text so "SHARED THROUGHPUT
            LIMIT" fits fully inside instead of bleeding past the
            right edge. */}
        <rect
          x={VIS_WIDTH - 152}
          y={LIMIT_Y - 12}
          width={140}
          height={14}
          rx={2}
          fill="rgba(255,255,255,0.96)"
          stroke="var(--color-line-on-light)"
          strokeWidth={0.6}
        />
        <text
          x={VIS_WIDTH - 82}
          y={LIMIT_Y - 2}
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize={8}
          letterSpacing={0.4}
          fill={RED}
          textAnchor="middle"
        >
          SHARED THROUGHPUT LIMIT
        </text>
      </g>

      {/* x-axis tick labels */}
      <text
        x={X0}
        y={VB_H - 2}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={8}
        letterSpacing={0.6}
        fill="var(--color-on-light-faint)"
      >
        t=0
      </text>
      <text
        x={VIS_WIDTH / 2}
        y={VB_H - 2}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={8}
        letterSpacing={0.6}
        fill="var(--color-on-light-faint)"
        textAnchor="middle"
      >
        t=2s
      </text>
      <text
        x={X0 + TOTAL_BARS_W}
        y={VB_H - 2}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={8}
        letterSpacing={0.6}
        fill="var(--color-on-light-faint)"
        textAnchor="end"
      >
        t=4s
      </text>
    </svg>
  );
}

/**
 * SolutionTimeline — sticky ScrollStack with absolute-positioned cards,
 * REVERSED stack direction (newest on top, older cards underneath).
 *
 * KEY DESIGN CHOICES:
 *
 * 1. **Sticky 100vh + tall wrapper (220vh)** — page is camera-locked
 *    during the animation. ⇒ user scrolls 120vh of scroll runway while
 *    cards animate.
 *
 * 2. **Cards absolute-positioned** (not natural flow) — all cards
 *    overlap at wrapper top in DOM. There is no "marginBottom gap"
 *    between cards. Cards animate from off-viewport-bottom to their
 *    pin position via transform. Visually the next card slides up
 *    from JUST below viewport into the stack — no big empty gap.
 *
 * 3. **Reversed stack direction**: newest card is at the TOP of the
 *    stack (smallest pinY), older cards extend BELOW (peeking out
 *    bottom of the new one). Index 0 = oldest = bottom of stack.
 *    Index N-1 = newest = top of stack.
 *
 * 4. **Scale direction**: oldest cards smaller (background, scaled
 *    0.88), newer cards larger (foreground, scale 1.0). Older cards
 *    don't shrink further as new ones come in — each card has its
 *    static target scale.
 *
 * 5. **Italic** lands below the entire stack (under the oldest /
 *    bottom card's bottom + 28px gap).
 */
function SolutionTimeline() {
  const steps = [
    {
      num: "01",
      kicker: "step.open_session()",
      title: "Your App Opens a Session",
      body: "When you need dedicated speed, you call North Star. One SDK call.",
      viz: <SequenceDiagramViz />,
    },
    {
      num: "02",
      kicker: "runtime.allocated",
      title: "You Get a Private Runtime",
      body: "Dedicated compute, no contention, over 1M TPS. State updates become near-free.",
      viz: <ResourcePoolViz />,
    },
    {
      num: "03",
      kicker: "settle.to_solana()",
      title: "Results Settle Back to Solana",
      body: "When the session ends, all state settles on-chain to Solana. Fully verifiable. The runtime disappears.",
      viz: <ConvergenceFlowViz />,
    },
  ];
  const N = steps.length;
  // SEGMENTS = card slide-ins (N - 1; card 0 starts on-screen, no
  // slide) + italic fade (1). On 100vh sticky / 120vh runway, each
  // segment is ~40vh of scroll, which keeps pacing close to the
  // user's preferred (not-too-fast) rate.
  const SEGMENTS = N; // = (N - 1) card slide-ins + 1 italic fade

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([null, null, null]);
  const italicRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // (Knobs are module-level — defined at the bottom of the file.)
    const ITALIC_GAP = 28;

    // Pin position for card index i. STANDARD direction: index 0
    // (Card 01) is at the TOP of the stack (smallest y), index N-1
    // (Card 03) is at the BOTTOM of the visible stack (largest y).
    // Card 03, having the largest pinY, is rendered LAST in DOM so
    // it appears in FRONT (z-stack-wise), with Cards 01 and 02's
    // tops peeking ABOVE it.
    function pinYFor(i: number, viewportH: number): number {
      const stackPositionPx = viewportH * STACK_POSITION_PCT;
      return stackPositionPx + i * ITEM_STACK_DISTANCE;
    }
    function applyTransform(
      el: HTMLDivElement,
      translateY: number,
      scale: number,
    ) {
      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }

    function update() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const viewportH = window.innerHeight;
      const wrapperRect = wrapper.getBoundingClientRect();
      const totalScroll = wrapperRect.height - viewportH;
      const scrolled = Math.max(0, -wrapperRect.top);
      const progress =
        totalScroll > 0 ? Math.min(1, scrolled / totalScroll) : 0;

      // Animation segments (SEGMENTS = N):
      //   segment 0:    card 1 slides in (over card 0)
      //   segment 1:    card 2 slides in (over card 1)
      //   ...
      //   segment N-2:  card N-1 slides in (over card N-2)
      //   segment N-1:  italic fades in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const pinY = pinYFor(i, viewportH);

        // ---- Slide-in transform ----
        // Card 0 is already at its pin from the start. Cards 1..N-1
        // slide in from off-screen below during their segment. They
        // are clipped by sticky overflow:hidden while off-screen.
        let translateY: number;
        if (i === 0) {
          translateY = pinY;
        } else {
          const segStart = (i - 1) / SEGMENTS;
          const segEnd = i / SEGMENTS;
          let p = (progress - segStart) / (segEnd - segStart);
          p = Math.max(0, Math.min(1, p));
          const eased = 1 - Math.pow(1 - p, 3);
          const offBottomY = viewportH + 80;
          translateY = offBottomY + eased * (pinY - offBottomY);
        }

        // ---- Scale "push back" ----
        // Card i is pushed back (scaled down) when card i+1 slides
        // in (= segment i). Front card (i = N-1) is never pushed.
        let scale = 1;
        if (i < N - 1) {
          const pushStart = i / SEGMENTS;
          const pushEnd = (i + 1) / SEGMENTS;
          let p = (progress - pushStart) / (pushEnd - pushStart);
          p = Math.max(0, Math.min(1, p));
          const targetScale = BASE_SCALE + i * ITEM_SCALE;
          scale = 1 - p * (1 - targetScale);
        }

        applyTransform(card, translateY, scale);
        card.style.opacity = "1";
      });

      // Italic — slides in during the LAST segment.
      const italic = italicRef.current;
      if (italic) {
        const segStart = (SEGMENTS - 1) / SEGMENTS;
        let p = (progress - segStart) / (1 - segStart);
        p = Math.max(0, Math.min(1, p));
        const eased = 1 - Math.pow(1 - p, 3);
        // Italic lands BELOW the FRONT card (Card N-1, at the bottom
        // of the visible stack, full scale 1.0).
        const frontCard = cardsRef.current[N - 1];
        const frontCardHeight = frontCard?.offsetHeight ?? 300;
        const frontCardTopY = pinYFor(N - 1, viewportH);
        const italicPinY = frontCardTopY + frontCardHeight + ITALIC_GAP;
        const offBottomY = viewportH + 60;
        const translateY = offBottomY + eased * (italicPinY - offBottomY);
        italic.style.transform = `translate3d(0, ${translateY}px, 0)`;
        // Opacity ramps in fast so italic is visible for most of its
        // slide. Reaches 1 at ~55% of segment progress.
        italic.style.opacity = String(Math.min(1, p * 1.8));
      }
    }

    if (reduced) {
      const viewportH = window.innerHeight;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const scale = i === N - 1 ? 1 : BASE_SCALE + i * ITEM_SCALE;
        applyTransform(card, pinYFor(i, viewportH), scale);
        card.style.opacity = "1";
      });
      const italic = italicRef.current;
      if (italic) {
        const frontCard = cardsRef.current[N - 1];
        const frontCardHeight = frontCard?.offsetHeight ?? 300;
        const italicY =
          pinYFor(N - 1, viewportH) + frontCardHeight + ITALIC_GAP;
        italic.style.transform = `translate3d(0, ${italicY}px, 0)`;
        italic.style.opacity = "1";
      }
      return;
    }

    function onScroll() {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [N, SEGMENTS]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        // 220vh = 100vh sticky + 120vh runway. 120vh / N segments
        // ≈ 40vh per segment (slow, readable pace).
        height: "220vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* "THE SOLUTION" label + heading + intro — pinned with
              `top: 15vh` so the group sits ~15vh below the sticky top.
              Group height ~20vh, so spans 15–35vh. Card 01 pins at
              38vh (~3vh gap). */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "15vh",
            }}
          >
            {/* No mx-auto/max-w wrapper here — the parent already has
                max-w-6xl + px-6 lg:px-10, so this content inherits the
                same left-aligned column as the other section headings
                (Problem half, ByTheNumbers, etc.). */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                <span className="font-heading text-10 uppercase tracking-wide text-on-light-muted">
                  The Solution
                </span>
              </div>
              <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
                How North Star{" "}
                <span className="text-primary-blue">Solves It</span>
              </h2>
              <p className="mt-5 font-body text-14 md:text-16 text-on-light-secondary leading-relaxed">
                Instead of competing for shared block space, North Star
                gives your app its own temporary runtime — dedicated
                compute where state updates become near-free, then
                settles everything back to Solana.
              </p>
            </div>
          </div>

          {steps.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                transformOrigin: "top center",
                willChange: "transform",
                // STANDARD direction: Card 0 (Card 01) at the TOP of
                // the stack (smallest pinY = 5vh), Card N-1 (Card 03)
                // at the BOTTOM of the stack (largest pinY).
                //
                // Card 0 visible at its pin from the start. Cards 1+
                // initially OFF-SCREEN BELOW the sticky viewport (the
                // sticky parent's overflow:hidden clips them), so the
                // user never sees them sitting below. They slide UP
                // into view during their segment.
                transform:
                  i === 0
                    ? `translate3d(0, 5vh, 0) scale(1)`
                    : "translate3d(0, calc(100vh + 80px), 0)",
              }}
            >
              <div className="mx-auto max-w-4xl px-2">
                <StepCard step={s} />
              </div>
            </div>
          ))}
          <div
            ref={italicRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transformOrigin: "top center",
              willChange: "transform, opacity",
              // Italic also starts off-screen below, clipped by sticky
              transform: "translate3d(0, calc(100vh + 60px), 0)",
              opacity: 0,
            }}
          >
            <div className="mx-auto max-w-2xl px-2 text-center">
              <p className="font-body italic text-14 md:text-16 text-on-light-secondary leading-relaxed">
                Think of it as renting a private server — except it&rsquo;s{" "}
                <span className="text-primary-blue not-italic font-medium">
                  on-chain
                </span>
                , verifiable, and disappears when you&rsquo;re done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SolutionTimeline tuning knobs — module-level so the JSX initial
// transforms can reference them too (otherwise they're scoped inside
// the useEffect and the initial render uses the wrong values).
//
// STACK_POSITION_PCT = 0.38 → Card 01 pins at 38% from viewport top.
// Heading group anchored at `top: 15vh` (group height ~20vh, so
// group spans 15–35vh) sits ~3vh above Card 01.
const STACK_POSITION_PCT = 0.38;
// Bigger stack offset to match the bigger cards (was 36, now 48).
// Bumped so older cards' peeking strips above the front card are
// thick enough to be readable, not just hairlines.
const ITEM_STACK_DISTANCE = 48;
const BASE_SCALE = 0.88;
const ITEM_SCALE = 0.04;

/**
 * StepCard — one card in the scroll stack. Frosted-glass material matches
 * Problem cards so the section's visual vocabulary stays consistent.
 */
function StepCard({
  step,
}: {
  step: {
    num: string;
    kicker: string;
    title: string;
    body: string;
    viz: React.ReactNode;
  };
}) {
  return (
    <div
      className="relative rounded-2xl border p-10 md:p-14 lg:p-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.36), rgba(255,255,255,0.22) 55%, rgba(255,255,255,0.30))",
        backdropFilter: "blur(18px) saturate(1.15)",
        WebkitBackdropFilter: "blur(18px) saturate(1.15)",
        borderColor: "rgba(255,255,255,0.75)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.4), 0 1px 0 rgba(0,0,0,0.02), 0 14px 32px rgba(15,23,42,0.06), 0 28px 60px rgba(15,23,42,0.05)",
      }}
    >
      {/* Giant ghost number — positioned BOTTOM-LEFT with negative
          offsets so the card's `overflow: hidden` clips off the
          left/bottom edge. Visible portion = top-right quadrant of
          the digit, sitting in the lower-left area of the card.
          Kept very low opacity (0.04) so the text in the left column
          stays fully readable — the digit reads as a "subtle bloom"
          rather than a dominant graphic, and it doesn't fight the
          mini-viz on the right side anymore. */}
      <span
        aria-hidden
        className="absolute pointer-events-none select-none font-heading text-primary-blue font-extrabold tracking-tight leading-none"
        style={{
          // Push off-screen so only the top-right corner of the digit
          // pokes into the card. Per-digit tweak: "1" is a narrow
          // glyph so "01" needs less left offset to show the same
          // amount; "2"/"3" are wider so they need MORE left offset
          // to match the visual weight of "01". Otherwise 02/03 look
          // bigger than 01 even though all use the same font-size.
          left: step.num === "01" ? "-12%" : "-18%",
          bottom: "-45%",
          fontSize: "clamp(220px, 30vw, 380px)",
          opacity: 0.022,
        }}
      >
        {step.num}
      </span>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">
        <div className="min-w-0">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-heading text-primary-blue text-32 md:text-40 font-extrabold tracking-tight leading-none">
              {step.num}
            </span>
            <span className="font-mono text-12 uppercase tracking-wide text-on-light-muted">
              {step.kicker}
            </span>
          </div>
          <h3 className="font-heading text-on-light-primary text-22 md:text-24 font-semibold tracking-tight mb-4 leading-snug">
            {step.title}
          </h3>
          <p className="font-body text-14 md:text-16 text-on-light-secondary leading-relaxed max-w-lg">
            {step.body}
          </p>
        </div>
        <div className="shrink-0" aria-hidden>
          {step.viz}
        </div>
      </div>
    </div>
  );
}
/* ============ Solution step mini-vizes ============
 * 3 different *chart paradigms* (not just shape variations) — each step
 * uses a different information-graphic form, mirroring how Problem's 3
 * vizes are stream / pipeline / bar-chart. Shared visual language: the
 * Sonic blue palette (semi-transparent fill + 0.5px stroke), readable
 * green for "ok / settled" status indicators, mono labels.
 */
const SOLUTION_GREEN = "#0F8F5C";
const SOLUTION_GREEN_BG = "rgba(15,143,92,0.1)";

/**
 * SequenceDiagramViz (Solution 01 — Open Session)
 * Paradigm: an API-call sequence diagram (UML-ish). Two vertical lifelines
 * (APP, RUNTIME) with a request arrow + a dashed response arrow. Two
 * traveling dots (blue request → green response) signal the round-trip.
 */
function SequenceDiagramViz() {
  const W = 240;
  const H = 56;
  const APP_X = 24;
  const RUNTIME_X = 216;
  const REQ_Y = 26;
  const RES_Y = 44;
  const TRAVEL = RUNTIME_X - APP_X;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full max-w-[340px] h-auto"
      role="img"
    >
      {/* lifeline labels */}
      <text
        x={APP_X}
        y={10}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={6.5}
        letterSpacing={1}
        fill="var(--color-on-light-muted)"
        textAnchor="middle"
      >
        APP
      </text>
      <text
        x={RUNTIME_X}
        y={10}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={6.5}
        letterSpacing={1}
        fill="var(--color-on-light-muted)"
        textAnchor="middle"
      >
        RUNTIME
      </text>
      {/* vertical dashed lifelines */}
      <line
        x1={APP_X}
        y1={14}
        x2={APP_X}
        y2={H - 4}
        stroke="rgba(0,0,255,0.3)"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      <line
        x1={RUNTIME_X}
        y1={14}
        x2={RUNTIME_X}
        y2={H - 4}
        stroke="rgba(0,0,255,0.3)"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      {/* request: APP → RUNTIME (solid blue) */}
      <line
        x1={APP_X + 1}
        y1={REQ_Y}
        x2={RUNTIME_X - 3}
        y2={REQ_Y}
        stroke="rgba(0,0,255,0.7)"
        strokeWidth={0.6}
      />
      <polyline
        points={`${RUNTIME_X - 4},${REQ_Y - 2.5} ${RUNTIME_X},${REQ_Y} ${RUNTIME_X - 4},${REQ_Y + 2.5}`}
        stroke="rgba(0,0,255,0.7)"
        strokeWidth={0.6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={(APP_X + RUNTIME_X) / 2}
        y={REQ_Y - 3}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={6}
        letterSpacing={0.4}
        fill="rgba(0,0,255,0.85)"
        textAnchor="middle"
      >
        open()
      </text>
      {/* response: RUNTIME → APP (dashed green) */}
      <line
        x1={RUNTIME_X - 1}
        y1={RES_Y}
        x2={APP_X + 3}
        y2={RES_Y}
        stroke={SOLUTION_GREEN}
        strokeWidth={0.6}
        strokeDasharray="3 2"
      />
      <polyline
        points={`${APP_X + 4},${RES_Y - 2.5} ${APP_X},${RES_Y} ${APP_X + 4},${RES_Y + 2.5}`}
        stroke={SOLUTION_GREEN}
        strokeWidth={0.6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={(APP_X + RUNTIME_X) / 2}
        y={RES_Y - 3}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={6}
        letterSpacing={0.4}
        fill={SOLUTION_GREEN}
        textAnchor="middle"
      >
        ✓ ok 200
      </text>
      {/* traveling request dot — blue, 0–40% phase */}
      <circle
        cx={APP_X}
        cy={REQ_Y}
        r={2.2}
        fill="rgba(0,0,255,0.95)"
        style={{
          animation: "ns-seq-req 3s linear infinite",
          ["--seq-travel" as string]: `${TRAVEL}px`,
        }}
      />
      {/* traveling response dot — green, 50–90% phase */}
      <circle
        cx={RUNTIME_X}
        cy={RES_Y}
        r={2.2}
        fill={SOLUTION_GREEN}
        style={{
          animation: "ns-seq-res 3s linear infinite",
          ["--seq-travel" as string]: `${TRAVEL}px`,
        }}
      />
    </svg>
  );
}

/**
 * ResourcePoolViz (Solution 02 — Private Runtime)
 * Paradigm: a resource-monitoring container (RUNTIME frame + status row +
 * inner activity matrix). Top status row shows `● ACTIVE / 1M TPS` in
 * green, frame contains the 2×2 chip matrix that pulses in clockwise
 * stagger to suggest internal concurrent activity.
 */
function ResourcePoolViz() {
  const W = 240;
  const FRAME_W = 110;
  const FRAME_H = 40;
  const STATUS_H = 12;
  const H = STATUS_H + FRAME_H + 4;
  const CHIP = 11;
  const FRAME_X = (W - FRAME_W) / 2;
  const FRAME_Y = STATUS_H + 2;
  const padX = 16;
  const padY = 6;
  const colSpan = FRAME_W - padX * 2 - CHIP;
  const rowSpan = FRAME_H - padY * 2 - CHIP;
  const positions = [
    [FRAME_X + padX, FRAME_Y + padY],
    [FRAME_X + padX + colSpan, FRAME_Y + padY],
    [FRAME_X + padX + colSpan, FRAME_Y + padY + rowSpan],
    [FRAME_X + padX, FRAME_Y + padY + rowSpan],
  ] as const;
  const CYCLE = 1.6;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full max-w-[340px] h-auto"
      role="img"
    >
      {/* status row above frame: ● ACTIVE  ·  1M TPS */}
      <g>
        <circle cx={FRAME_X + 4} cy={6} r={2} fill={SOLUTION_GREEN}>
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x={FRAME_X + 10}
          y={8.5}
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize={6.2}
          letterSpacing={0.8}
          fill={SOLUTION_GREEN}
          fontWeight={600}
        >
          ACTIVE
        </text>
        <text
          x={FRAME_X + 44}
          y={8.5}
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize={6.2}
          letterSpacing={0.4}
          fill="var(--color-on-light-muted)"
        >
          · 1M TPS
        </text>
        {/* RUNTIME label removed — it overlapped with "1M TPS" at
            common viewport sizes. Frame + 2×2 chip matrix already
            reads as "private runtime" semantically (the step title
            "You Get a Private Runtime" provides the label). */}
      </g>
      {/* runtime frame */}
      <rect
        x={FRAME_X}
        y={FRAME_Y}
        width={FRAME_W}
        height={FRAME_H}
        rx={3}
        fill="rgba(0,0,255,0.04)"
        stroke="rgba(0,0,255,0.55)"
        strokeWidth={0.6}
      />
      {/* 4 chips with staggered clockwise pulse */}
      {positions.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={CHIP}
          height={CHIP}
          rx={2}
          fill="rgba(0,0,255,0.45)"
          stroke="rgba(0,0,255,0.75)"
          strokeWidth={0.5}
          style={{
            animation: `ns-runtime-pulse ${CYCLE}s ease-in-out infinite`,
            animationDelay: `${(i * CYCLE) / 4}s`,
          }}
        />
      ))}
    </svg>
  );
}

/**
 * ConvergenceFlowViz (Solution 03 — Settle to Solana)
 * Paradigm: a sankey/flow diagram. 3 dashed bezier curves carry data
 * dots from right-side sources into a left-side green anchor labeled
 * `L1 / ✓ SETTLED`. Each dot follows its curve via SMIL animateMotion
 * so the convergence reads spatially, not as a straight line.
 */
function ConvergenceFlowViz() {
  const W = 240;
  const H = 56;
  const ANCHOR_W = 22;
  const ANCHOR_H = 22;
  const ANCHOR_X = 6;
  const ANCHOR_Y = (H - ANCHOR_H) / 2;
  const TARGET_X = ANCHOR_X + ANCHOR_W;
  const TARGET_Y = H / 2;
  const sources = [
    { x: 220, y: 12 },
    { x: 232, y: H / 2 },
    { x: 220, y: H - 12 },
  ];
  // bezier from source (sx, sy) to target (TARGET_X, TARGET_Y)
  const pathFor = (sx: number, sy: number) =>
    `M ${sx},${sy} C ${(sx + TARGET_X) / 2 + 30},${sy} ${(sx + TARGET_X) / 2 - 10},${TARGET_Y} ${TARGET_X},${TARGET_Y}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full max-w-[340px] h-auto"
      role="img"
    >
      <defs>
        {sources.map((s, i) => (
          <path
            key={i}
            id={`ns-conv-path-${i}`}
            d={pathFor(s.x, s.y)}
            fill="none"
          />
        ))}
      </defs>
      {/* visible bezier curves (dashed faint guides) */}
      {sources.map((s, i) => (
        <path
          key={i}
          d={pathFor(s.x, s.y)}
          fill="none"
          stroke="rgba(0,0,255,0.3)"
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
      ))}
      {/* SOLANA L1 anchor — green filled block */}
      <rect
        x={ANCHOR_X}
        y={ANCHOR_Y}
        width={ANCHOR_W}
        height={ANCHOR_H}
        rx={3}
        fill={SOLUTION_GREEN_BG}
        stroke={SOLUTION_GREEN}
        strokeWidth={0.7}
      />
      <text
        x={ANCHOR_X + ANCHOR_W / 2}
        y={ANCHOR_Y + ANCHOR_H / 2 + 2.5}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={7}
        letterSpacing={0.4}
        fill={SOLUTION_GREEN}
        fontWeight={700}
        textAnchor="middle"
      >
        L1
      </text>
      {/* settle status pip below anchor */}
      <text
        x={ANCHOR_X + ANCHOR_W / 2}
        y={ANCHOR_Y + ANCHOR_H + 7}
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize={5.2}
        letterSpacing={0.8}
        fill={SOLUTION_GREEN}
        textAnchor="middle"
      >
        ✓ SETTLED
      </text>
      {/* source labels */}
      {sources.map((s, i) => (
        <circle
          key={`src-${i}`}
          cx={s.x}
          cy={s.y}
          r={1.5}
          fill="rgba(0,0,255,0.5)"
        />
      ))}
      {/* moving data dots that follow each path with stagger */}
      {sources.map((_, i) => (
        <circle key={`dot-${i}`} r={2.2} fill="rgba(0,0,255,0.95)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin={`${i}s`}
            rotate="auto"
          >
            <mpath href={`#ns-conv-path-${i}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.85;1"
            dur="3s"
            repeatCount="indefinite"
            begin={`${i}s`}
          />
        </circle>
      ))}
    </svg>
  );
}
