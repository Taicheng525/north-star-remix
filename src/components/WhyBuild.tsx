import { ArrowRight } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

type Pillar = {
  num: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

/**
 * Why Build On North Star — three pillars (real-time execution,
 * programmable economics, drop-in compat). Layout is deliberately
 * different from every other section on this page:
 *   - Left column is STICKY (section heading + lede) and stays
 *     pinned while the reader scrolls the right column.
 *   - Right column scrolls three pillar blocks. Each block uses a
 *     small mono eyebrow with the number (no oversized "01" graphic
 *     — pulled per feedback that the big numerals dominated and read
 *     as uneven widths).
 * On mobile the sticky behaviour drops away and everything stacks
 * naturally.
 */
const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Real-Time Execution",
    body: "Configurable session speed for applications that cannot wait on shared blockspace. Run the hot path in real time, then settle back to Solana.",
    cta: {
      label: "Read the architecture",
      href: "https://docs.sonicsvm.org/",
    },
  },
  {
    num: "02",
    title: "Programmable Economics",
    body: "Run gasless. Sub-cent fees. Denominate in any SPL token. Capture revenue from apps that delegate through your grid. Your runtime, your rules.",
    cta: {
      label: "Build your fee market",
      href: "https://northstar.sonicsvm.org/",
    },
  },
  {
    num: "03",
    title: "Drop-In Compatible",
    body: "Your existing Solana program runs unchanged inside an ER session: same SBF binary, 965 compute units both venues. Open a session, delegate accounts. No rewrites.",
    cta: {
      label: "Migrate in minutes",
      href: "https://docs.sonicsvm.org/",
    },
  },
];

export default function WhyBuild() {
  return (
    <section className="relative w-full">
      <div className="pt-14 md:pt-18">
        <SectionDivider label="Why Build" theme="light" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 py-12 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          {/* LEFT — sticky title + lede. `self-start` is required so
              the grid item doesn't stretch to row height, which would
              break the sticky positioning. `top-24` leaves room below
              the sticky navbar (h-17). */}
          <aside className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <RevealOnScroll>
              <p className="font-mono text-10 uppercase tracking-[0.2em] text-on-light-muted mb-4">
                Why Build
              </p>
              <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
                Why Build On{" "}
                <span className="text-primary-blue">North{" "}Star</span>
              </h2>
              <p className="mt-5 font-body text-14 md:text-16 text-on-light-secondary leading-relaxed max-w-md">
                Dedicated execution gives builders control over speed,
                economics, and compatibility — without leaving the Solana
                programming model.
              </p>
            </RevealOnScroll>
          </aside>

          {/* RIGHT — scrollable list of pillars. */}
          <div className="md:col-span-7 flex flex-col">
            {PILLARS.map((p, i) => (
              <RevealOnScroll key={p.num} delayMs={i * 100}>
                <PillarRow
                  pillar={p}
                  isLast={i === PILLARS.length - 1}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarRow({
  pillar,
  isLast,
}: {
  pillar: Pillar;
  isLast: boolean;
}) {
  return (
    <div
      className="py-8 md:py-10 first:pt-0 md:first:pt-2 flex flex-col"
      style={{
        borderBottom: isLast
          ? "none"
          : "1px solid var(--color-line-on-light-soft)",
      }}
    >
      {/* mono eyebrow — `01  —  REAL-TIME EXECUTION` */}
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <span className="font-mono text-10 tabular-nums text-primary-blue tracking-[0.18em]">
          {pillar.num}
        </span>
        <span
          aria-hidden
          className="h-px w-6"
          style={{ background: "var(--color-line-on-light)" }}
        />
        <span className="font-mono text-10 uppercase tracking-[0.18em] text-on-light-muted">
          {pillar.title}
        </span>
      </div>

      {/* headline */}
      <h3
        className="font-heading text-on-light-primary font-semibold tracking-tight leading-tight mb-4"
        style={{ fontSize: "clamp(20px, 2.3vw, 28px)" }}
      >
        {pillar.title}
      </h3>

      {/* body */}
      <p className="font-body text-14 md:text-16 text-on-light-secondary leading-relaxed mb-5 max-w-xl">
        {pillar.body}
      </p>

      {/* CTA */}
      <a
        href={pillar.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="why-build-cta inline-flex items-center gap-2 font-heading text-12 md:text-14 font-semibold uppercase tracking-wider text-primary-blue self-start transition-colors hover:text-on-light-primary"
      >
        <span>{pillar.cta.label}</span>
        <ArrowRight size={14} className="why-build-cta-arrow" />
      </a>

      <style>{`
        .why-build-cta-arrow {
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .why-build-cta:hover .why-build-cta-arrow {
          transform: translateX(3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .why-build-cta:hover .why-build-cta-arrow { transform: none; }
        }
      `}</style>
    </div>
  );
}
