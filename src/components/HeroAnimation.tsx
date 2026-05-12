"use client";

import { useEffect, useRef, useState } from "react";

const SEQS = [
  { id: 0, hud: "STANDBY · Sonic SVM", caption: "Awaiting session" },
  { id: 1, hud: "RUNTIME ALLOCATED · 1.2s", caption: "Dedicated session · Block 0" },
  { id: 2, hud: "LIVE · 1.04M TPS", caption: "Zero contention" },
  { id: 3, hud: "SETTLED · 47ms · verified", caption: "On-chain · verifiable" },
] as const;

const SEQ_DURATION_MS = 5000;
const WIPE_MS = 500;

export default function HeroAnimation() {
  const [seq, setSeq] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);
  const reducedRef = useRef(false);
  const seqRef = useRef(0);

  useEffect(() => {
    seqRef.current = seq;
  }, [seq]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) {
      setSeq(SEQS.length - 1);
      setProgress(100);
      return;
    }

    let start = performance.now();
    let raf = 0;
    let wipeIn: ReturnType<typeof setTimeout> | null = null;
    let wipeOut: ReturnType<typeof setTimeout> | null = null;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(100, (elapsed / SEQ_DURATION_MS) * 100);
      setProgress(pct);
      if (elapsed >= SEQ_DURATION_MS) {
        setWiping(true);
        wipeIn = setTimeout(() => {
          const next = (seqRef.current + 1) % SEQS.length;
          setSeq(next);
        }, WIPE_MS / 2);
        wipeOut = setTimeout(() => {
          setWiping(false);
        }, WIPE_MS);
        start = t;
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (wipeIn) clearTimeout(wipeIn);
      if (wipeOut) clearTimeout(wipeOut);
    };
  }, []);

  return (
    <div
      className="relative w-full aspect-square rounded-3xl overflow-hidden border border-line-on-light"
      style={{
        backgroundColor: "var(--color-surface-light)",
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%), linear-gradient(45deg, rgba(0,0,255,0.025) 25%, transparent 25%, transparent 75%, rgba(0,0,255,0.025) 75%), linear-gradient(45deg, rgba(0,0,255,0.025) 25%, transparent 25%, transparent 75%, rgba(0,0,255,0.025) 75%)",
        backgroundSize: "100% 100%, 20px 20px, 20px 20px",
        backgroundPosition: "0 0, 0 0, 10px 10px",
        boxShadow:
          "0 2.8px 2.2px rgba(0,0,0,0.034), 0 6.7px 5.3px rgba(0,0,0,0.048), 0 12.5px 10px rgba(0,0,0,0.06), 0 22.3px 17.9px rgba(0,0,0,0.072), 0 41.8px 33.4px rgba(0,0,0,0.086), 0 100px 80px rgba(0,0,0,0.12)",
      }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,1), inset 0 -1px 2px rgba(0,0,0,0.1)",
          borderRadius: "inherit",
        }}
      />

      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      <div className="absolute top-5 left-9 right-9 z-30 flex items-center justify-between font-heading text-10 uppercase tracking-wide text-on-light-muted">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex w-1.5 h-1.5">
            <span
              className="absolute inset-0 rounded-full bg-primary-blue opacity-60"
              style={{ animation: "ns-ping 1.6s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            <span className="relative w-1.5 h-1.5 rounded-full bg-primary-blue" />
          </span>
          <span>NORTH/STAR</span>
        </div>
        <div className="text-primary-blue tabular-nums">
          {String(seq + 1).padStart(2, "0")} / {String(SEQS.length).padStart(2, "0")}
        </div>
      </div>

      <div className="absolute inset-0">
        <Seq0 active={seq === 0} />
        <Seq1 active={seq === 1} />
        <Seq2 active={seq === 2} />
        <Seq3 active={seq === 3} />
      </div>

      <div className="absolute bottom-5 left-9 right-9 z-30 flex items-center gap-4 font-heading text-10 uppercase tracking-wide text-on-light-muted">
        <span className="hidden sm:inline">{SEQS[seq].caption}</span>
        <div className="flex-1 relative h-px" style={{ background: "rgba(0,0,255,0.15)" }}>
          <div
            className="absolute left-0 top-0 h-full bg-primary-blue"
            style={{
              width: `${progress}%`,
              transition: "width 100ms linear",
            }}
          />
        </div>
        <span className="text-on-light-primary">{SEQS[seq].hud}</span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-50 bg-primary-blue"
        style={{
          transform: wiping ? "translateX(0)" : "translateX(-101%)",
          transition: wiping
            ? "transform 250ms cubic-bezier(0.7, 0, 0.3, 1)"
            : "transform 250ms cubic-bezier(0.7, 0, 0.3, 1)",
        }}
      />

      <style jsx>{`
        @keyframes ns-ping {
          75%,
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-3.5 h-3.5 z-30";
  const pin: Record<typeof pos, string> = {
    tl: "top-4 left-4 border-t border-l",
    tr: "top-4 right-4 border-t border-r",
    bl: "bottom-4 left-4 border-b border-l",
    br: "bottom-4 right-4 border-b border-r",
  };
  return (
    <span
      className={`${base} ${pin[pos]}`}
      style={{ borderColor: "var(--color-primary-blue-on-light-border-strong)" }}
      aria-hidden
    />
  );
}

function SeqShell({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 400ms ease",
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}

function Seq0({ active }: { active: boolean }) {
  return (
    <SeqShell active={active}>
      <div
        className="flex flex-col items-center gap-6"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.9)",
          transition: "opacity 700ms ease, transform 1200ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg viewBox="-50 -50 100 100" width="160" height="160" aria-hidden>
          <defs>
            <radialGradient id="ns-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0000FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0000FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="48" fill="url(#ns-glow)" />
          <g
            style={{
              transformOrigin: "0 0",
              animation: active ? "ns-pulse 3s ease-in-out infinite" : "none",
            }}
          >
            <polygon
              points="0,-32 6,-6 32,0 6,6 0,32 -6,6 -32,0 -6,-6"
              fill="#0000FF"
              opacity="0.9"
            />
            <polygon
              points="0,-18 3.5,-3.5 18,0 3.5,3.5 0,18 -3.5,3.5 -18,0 -3.5,-3.5"
              fill="#fff"
              opacity="0.9"
            />
          </g>
          <line x1="-46" y1="0" x2="-36" y2="0" stroke="#0000FF" strokeWidth="0.5" opacity="0.4" />
          <line x1="36" y1="0" x2="46" y2="0" stroke="#0000FF" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="-46" x2="0" y2="-36" stroke="#0000FF" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="36" x2="0" y2="46" stroke="#0000FF" strokeWidth="0.5" opacity="0.4" />
        </svg>
        <div className="text-center font-heading">
          <div className="text-12 font-semibold tracking-wide uppercase text-on-light-primary">
            NORTH STAR
          </div>
          <div className="mt-1 text-10 uppercase tracking-wide text-on-light-muted">
            Sonic SVM · ready
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes ns-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </SeqShell>
  );
}

function Seq1({ active }: { active: boolean }) {
  return (
    <SeqShell active={active}>
      <div className="relative w-[78%] aspect-square">
        <svg viewBox="-200 -200 400 400" className="w-full h-full" aria-hidden>
          <line x1="0" y1="-180" x2="0" y2="180" stroke="#0000FF" strokeWidth="0.5" opacity="0.2" />
          <line x1="-180" y1="0" x2="180" y2="0" stroke="#0000FF" strokeWidth="0.5" opacity="0.2" />

          {[-100, 0, 100].map((y, i) => (
            <g key={i}>
              <line
                x1="-160"
                y1={y}
                x2="160"
                y2={y}
                stroke="#0000FF"
                strokeWidth="0.6"
                strokeDasharray="2 4"
                opacity={active ? 0.6 : 0}
                style={{
                  transition: `opacity 700ms ${300 + i * 150}ms`,
                }}
              />
              {[-120, -60, 0, 60, 120].map((x, k) => (
                <rect
                  key={k}
                  x={x - 8}
                  y={y - 8}
                  width="16"
                  height="16"
                  fill="#0000FF"
                  opacity={active ? 1 : 0}
                  style={{
                    transition: `opacity 500ms ${600 + i * 150 + k * 80}ms, transform 500ms ${600 + i * 150 + k * 80}ms`,
                    transform: active ? "scale(1)" : "scale(0)",
                    transformOrigin: `${x}px ${y}px`,
                    transformBox: "fill-box",
                  }}
                />
              ))}
            </g>
          ))}

          <circle
            cx="0"
            cy="0"
            r="14"
            fill="#0000FF"
            opacity={active ? 1 : 0}
            style={{ transition: "opacity 500ms 200ms" }}
          />
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#fff"
            opacity={active ? 1 : 0}
            style={{ transition: "opacity 500ms 300ms" }}
          />
        </svg>
      </div>
    </SeqShell>
  );
}

function Seq2({ active }: { active: boolean }) {
  return (
    <SeqShell active={active}>
      <div className="relative w-[82%] h-full flex flex-col items-center justify-center gap-5">
        <div className="font-heading text-on-light-muted text-10 uppercase tracking-wide">
          live throughput · streaming
        </div>
        <div className="w-full flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative h-7 overflow-hidden rounded"
              style={{
                background: "rgba(0,0,255,0.04)",
                border: "1px solid var(--color-primary-blue-on-light-border)",
              }}
            >
              <div
                className="absolute inset-y-0"
                style={{
                  left: 0,
                  display: "flex",
                  gap: 6,
                  paddingLeft: 6,
                  paddingTop: 6,
                  paddingBottom: 6,
                  animation: active ? `ns-stream 2.${4 + i * 2}s linear infinite` : "none",
                }}
              >
                {Array.from({ length: 24 }).map((_, k) => (
                  <span
                    key={k}
                    style={{
                      width: 14,
                      height: 14,
                      background: "#0000FF",
                      opacity: 0.85 - (k % 4) * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-heading text-on-light-primary text-32 font-extrabold tabular-nums">
            1.04M
          </span>
          <span className="font-heading text-on-light-muted text-12 uppercase tracking-wide">
            tps · live
          </span>
        </div>
      </div>
      <style jsx>{`
        @keyframes ns-stream {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </SeqShell>
  );
}

function Seq3({ active }: { active: boolean }) {
  return (
    <SeqShell active={active}>
      <div className="relative w-[80%] aspect-square">
        <svg viewBox="-200 -200 400 400" className="w-full h-full" aria-hidden>
          <path
            d="M -160 -100 Q -40 -100 0 0"
            stroke="#0000FF"
            strokeWidth="1.2"
            fill="none"
            opacity={active ? 0.7 : 0}
            style={{ transition: "opacity 600ms 200ms" }}
          />
          <path
            d="M -160 0 L 0 0"
            stroke="#0000FF"
            strokeWidth="1.2"
            fill="none"
            opacity={active ? 0.7 : 0}
            style={{ transition: "opacity 600ms 350ms" }}
          />
          <path
            d="M -160 100 Q -40 100 0 0"
            stroke="#0000FF"
            strokeWidth="1.2"
            fill="none"
            opacity={active ? 0.7 : 0}
            style={{ transition: "opacity 600ms 500ms" }}
          />

          <line
            x1="0"
            y1="0"
            x2="160"
            y2="0"
            stroke="#0000FF"
            strokeWidth="2"
            opacity={active ? 1 : 0}
            style={{ transition: "opacity 600ms 700ms" }}
          />

          <g
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.5)",
              transformOrigin: "160px 0",
              transformBox: "fill-box",
              transition: "opacity 500ms 1200ms, transform 600ms 1200ms cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <circle cx="160" cy="0" r="22" fill="#0000FF" />
            <circle cx="160" cy="0" r="34" fill="none" stroke="#0000FF" strokeWidth="0.8" opacity="0.4" />
            <path
              d="M 150 0 l 7 7 14 -14"
              stroke="#fff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <text
            x="160"
            y="55"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 11,
              letterSpacing: "0.18em",
              fill: "var(--color-primary-blue)",
              textTransform: "uppercase",
              opacity: active ? 1 : 0,
              transition: "opacity 500ms 1500ms",
            }}
          >
            Solana
          </text>

          {[
            { cx: -160, cy: -100 },
            { cx: -160, cy: 0 },
            { cx: -160, cy: 100 },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r="6"
              fill="#0000FF"
              opacity={active ? 0.6 : 0}
              style={{ transition: `opacity 600ms ${i * 100}ms` }}
            />
          ))}
        </svg>
      </div>
    </SeqShell>
  );
}
