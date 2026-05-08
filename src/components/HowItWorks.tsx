import {
  ArrowDown,
  Bolt,
  ChartLine,
  Check,
  Cpu,
  Database,
  Server,
} from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

export default function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="pt-16 md:pt-20">
        <SectionDivider label="Mechanics" theme="light" />
      </div>

      {/* PROBLEM HALF */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-12 md:pt-16 pb-16 md:pb-24">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
            <span className="font-heading text-10 uppercase tracking-wide text-on-light-muted">
              The Problem
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,255,0.25), transparent)",
              }}
            />
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 md:mb-16">
          <RevealOnScroll className="lg:col-span-7">
            <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
              Some Workloads{" "}Need{" "}a{" "}
              <span className="text-primary-blue">
                Dedicated{" "}Runtime
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-5" delayMs={150}>
            <p className="font-body text-16 md:text-20 text-on-light-secondary leading-relaxed">
              High-frequency updates, real-time pricing, autonomous agents. These
              workloads need guaranteed throughput, not a shared queue.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={150} className="w-full">
          <div className="grid md:grid-cols-3 gap-0 border-y border-line-on-light">
            <ProblemColumn
              caseId="case_01"
              icon={<Database size={18} className="text-primary-blue" />}
              label="On-Chain Oracles"
              body="Every write costs gas and queues behind unrelated traffic. Every read returns stale data while updates are stuck waiting."
              tags={["stale_reads", "queue_lag"]}
            />
            <ProblemColumn
              caseId="case_02"
              icon={<Cpu size={18} className="text-primary-blue" />}
              label="Autonomous Agents"
              body="Every decision loop is bottlenecked by block time. Agents can't react faster than the chain confirms."
              tags={["block_bound", "latency"]}
            />
            <ProblemColumn
              caseId="case_03"
              icon={<ChartLine size={18} className="text-primary-blue" />}
              label="On-Chain Orderbooks"
              body="Thousands of updates per second, but shared throughput can only carry a fraction."
              tags={["throughput_cap", "contention"]}
            />
          </div>
        </RevealOnScroll>

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
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative h-24 md:h-32 flex items-center justify-center">
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

      {/* SOLUTION HALF */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-8 md:pt-12 pb-24 md:pb-32">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
            <span className="font-heading text-10 uppercase tracking-wide text-on-light-muted">
              The Solution
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,255,0.25), transparent)",
              }}
            />
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 md:mb-20">
          <RevealOnScroll className="lg:col-span-7">
            <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
              How{" "}North{" "}Star{" "}
              <span className="text-primary-blue">Solves{" "}It</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-5" delayMs={150}>
            <p className="font-body text-16 md:text-20 text-on-light-secondary leading-relaxed">
              Instead of competing for shared block space, North Star gives your app
              its own temporary runtime — dedicated compute where state updates
              become near-free, then settles everything back to Solana.
            </p>
          </RevealOnScroll>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="hidden md:block absolute left-0 right-0 h-px"
            style={{
              top: "3.25rem",
              background:
                "repeating-linear-gradient(90deg, rgba(0,0,255,0.35) 0 6px, transparent 6px 12px)",
            }}
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-5 relative">
            <SolutionStep
              num="01"
              kicker="step.open_session()"
              icon={<Bolt size={12} className="text-white" />}
              title="Your App Opens a Session"
              body="When you need dedicated speed, you call North Star. One SDK call."
            />
            <SolutionStep
              num="02"
              kicker="runtime.allocated"
              icon={<Server size={12} className="text-white" />}
              title="You Get a Private Runtime"
              body="Dedicated compute, no contention, over 1M TPS. State updates become near-free."
              highlight
              tags={["1M+ TPS", "no_contention", "~0 fee"]}
            />
            <SolutionStep
              num="03"
              kicker="settle.to_solana()"
              icon={<Check size={12} className="text-white" />}
              title="Results Settle Back to Solana"
              body="When the session ends, all state settles on-chain to Solana. Fully verifiable. The runtime disappears."
            />
          </div>
        </div>

        <RevealOnScroll delayMs={200}>
          <p className="mt-16 md:mt-20 mx-auto max-w-2xl text-center font-body italic text-16 md:text-20 text-on-light-secondary leading-relaxed">
            Think of it as renting a private server — except it&rsquo;s{" "}
            <span className="text-primary-blue not-italic font-medium">on-chain</span>,
            verifiable, and disappears when you&rsquo;re done.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function ProblemColumn({
  caseId,
  icon,
  label,
  body,
  tags,
}: {
  caseId: string;
  icon: React.ReactNode;
  label: string;
  body: string;
  tags: string[];
}) {
  return (
    <article className="relative py-8 md:py-10 px-2 md:px-8 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-line-on-light">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-10 uppercase tracking-wide text-on-light-muted">
          {caseId}
        </span>
        {icon}
      </div>
      <h3 className="font-heading text-on-light-primary text-20 font-semibold tracking-tight mb-3">
        {label}
      </h3>
      <p className="font-body text-14 text-on-light-secondary leading-relaxed mb-6">
        {body}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="font-mono text-10 px-2 py-0.5 rounded"
            style={{
              background: "rgba(255,0,0,0.08)",
              color: "#b91c1c",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

function SolutionStep({
  num,
  kicker,
  icon,
  title,
  body,
  highlight = false,
  tags,
}: {
  num: string;
  kicker: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  highlight?: boolean;
  tags?: string[];
}) {
  return (
    <RevealOnScroll
      delayMs={Number(num) * 100}
      className="relative"
    >
      <div className="flex items-center mb-6 relative">
        <div
          className="w-26 h-26 rounded-2xl flex items-center justify-center bg-surface-light border border-line-on-light relative"
          style={{
            width: "6.5rem",
            height: "6.5rem",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,1), 0 8px 24px rgba(0,0,0,0.05)",
          }}
        >
          <span className="font-heading text-primary-blue text-40 font-extrabold tracking-tight">
            {num}
          </span>
          <span
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-primary-blue"
            style={{ boxShadow: "0 4px 10px rgba(0,0,255,0.3)" }}
          >
            {icon}
          </span>
        </div>
      </div>
      <div
        className="rounded-2xl p-6"
        style={
          highlight
            ? {
                background:
                  "linear-gradient(180deg, rgba(0,0,255,0.04), rgba(0,0,255,0.01))",
                border: "1px solid var(--color-primary-blue-on-light-border)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 24px rgba(0,0,255,0.08)",
              }
            : {
                background: "var(--color-surface-light-pane)",
                border: "1px solid var(--color-line-on-light)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), 0 4px 14px rgba(0,0,0,0.04)",
              }
        }
      >
        <div
          className={`font-mono text-10 uppercase tracking-wide mb-2 ${highlight ? "text-primary-blue" : "text-on-light-muted"}`}
        >
          {kicker}
        </div>
        <h3 className="font-heading text-on-light-primary text-20 font-semibold tracking-tight mb-3">
          {title}
        </h3>
        <p className="font-body text-14 text-on-light-secondary leading-relaxed">
          {body}
        </p>
        {tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-10 px-2 py-1 rounded bg-surface-light-elevated border border-line-on-light text-on-light-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
}
