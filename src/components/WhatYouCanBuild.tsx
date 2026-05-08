import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

const ROWS = [
  {
    num: "01",
    label: "On-Chain Oracles",
    headline: "Near-Free Price Feeds. Always Fresh.",
    body: "Oracle updates become a near-free operation on a dedicated runtime. Write as often as you need. Every read returns current state.",
    statValue: "≈ $0",
    statLabel: "per price update",
  },
  {
    num: "02",
    label: "Autonomous Agents",
    headline: "Faster Loops. Smarter Agents.",
    body: "Each agent runs on its own dedicated runtime. Decision loops drop from 400ms to under 50ms. Strategies iterate faster, adapt sooner.",
    statValue: "< 50ms",
    statLabel: "per decision cycle",
  },
  {
    num: "03",
    label: "On-Chain Orderbooks",
    headline: "Exchange-Grade Throughput. On-Chain.",
    body: "Thousands of order operations per second on a dedicated runtime. No contention, no throughput ceiling, no compromises.",
    statValue: "> 1M",
    statLabel: "ops per second",
  },
] as const;

export default function WhatYouCanBuild() {
  return (
    <section className="relative w-full">
      <div className="pt-20 md:pt-24">
        <SectionDivider label="Use Cases" theme="light" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        <RevealOnScroll className="w-full">
          <div className="max-w-2xl mb-12 md:mb-16">
            <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
              What You Can Build With{" "}
              <span className="text-primary-blue">North{" "}Star</span>
            </h2>
            <p className="mt-5 font-body text-16 md:text-20 text-on-light-secondary leading-relaxed">
              Workloads that need dedicated throughput, not a shared queue.
            </p>
          </div>
        </RevealOnScroll>

        <div className="border-t border-line-on-light">
          {ROWS.map((row, i) => (
            <RevealOnScroll key={row.num} className="w-full" delayMs={i * 120}>
              <Row
                num={row.num}
                label={row.label}
                headline={row.headline}
                body={row.body}
                statValue={row.statValue}
                statLabel={row.statLabel}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  num,
  label,
  headline,
  body,
  statValue,
  statLabel,
}: {
  num: string;
  label: string;
  headline: string;
  body: string;
  statValue: string;
  statLabel: string;
}) {
  return (
    <article className="grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-x-6 md:gap-x-10 py-10 md:py-14 border-b border-line-on-light">
      {/* big number marker */}
      <div className="font-heading text-primary-blue text-28 md:text-40 font-extrabold tracking-tight tabular-nums leading-none pt-1">
        {num}
      </div>

      <div className="min-w-0">
        {/* top row: label (left) + inline stat (right) */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-3">
          <span className="font-mono text-10 uppercase tracking-wide text-on-light-muted">
            {label}
          </span>
          <span className="font-heading text-12 text-on-light-secondary tabular-nums">
            <span className="text-on-light-primary font-medium">{statValue}</span>
            <span className="text-on-light-faint mx-2">/</span>
            <span>{statLabel}</span>
          </span>
        </div>

        {/* headline */}
        <h3 className="font-heading text-on-light-primary text-20 md:text-24 font-semibold tracking-tight mb-3 leading-snug">
          {headline}
        </h3>

        {/* body */}
        <p className="font-body text-14 md:text-16 text-on-light-secondary leading-relaxed max-w-2xl">
          {body}
        </p>
      </div>
    </article>
  );
}
