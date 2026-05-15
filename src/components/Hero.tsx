import { ArrowRight, Bolt, Document } from "./icons";
import HeroBackground from "./HeroBackground";
import RevealOnScroll from "./RevealOnScroll";

const LINKS = {
  demo: "https://orderbook-northstar.vercel.app/",
  litepaper: "https://northstar.sonicsvm.org/",
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden md:min-h-screen bg-surface-light">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 md:pt-24 pb-16 md:pb-20 flex flex-col items-center text-center">
        {/* Top label row */}
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 md:mb-14">
            <div className="flex items-center gap-2 font-heading text-10 uppercase tracking-wide text-on-light-muted">
              <span className="relative inline-flex w-2 h-2">
                <span
                  className="absolute inset-0 rounded-full bg-primary-blue opacity-60"
                  style={{
                    animation: "ns-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span className="relative w-2 h-2 rounded-full bg-primary-blue" />
              </span>
              Live Sync
            </div>
            <span className="hidden sm:block w-px h-4 bg-line-on-light" />
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light-elevated border border-line-on-light"
              style={{
                boxShadow: "var(--card-pill-inset)",
              }}
            >
              <Bolt size={14} className="text-primary-blue" />
              <span className="font-heading text-12 font-medium tracking-tight text-on-light-primary">
                Powered by Sonic SVM
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Headline — blur reveal echoes the intro film's Seq 2
            headline so the transition from intro → page is continuous. */}
        <RevealOnScroll delayMs={150} className="w-full" blur>
          <h1
            className="font-heading text-on-light-primary font-extrabold tracking-tight whitespace-nowrap"
            style={{ fontSize: "clamp(28px, 6.6vw, 76px)", lineHeight: 0.98 }}
          >
            Your Own Blockchain,
            <br />
            <span className="text-primary-blue">On Demand</span>
          </h1>
        </RevealOnScroll>

        {/* Subtitle — same blur-in treatment, slightly delayed. */}
        <RevealOnScroll delayMs={300} className="w-full flex justify-center" blur>
          <p className="mt-8 md:mt-10 max-w-xl font-body text-14 md:text-16 text-on-light-secondary leading-relaxed">
            North Star spins up dedicated blockchains on demand.
            <br className="hidden md:block" /> Over a million TPS. Powered by Sonic
            SVM.
          </p>
        </RevealOnScroll>

        {/* CTA cluster */}
        <RevealOnScroll delayMs={450} className="w-full">
          <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={LINKS.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-14 font-semibold tracking-tight px-6 py-3.5 rounded-xl bg-primary-blue text-white inline-flex items-center gap-2 transition-transform hover:-translate-y-px"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 28px rgba(0,0,255,0.32)",
              }}
            >
              Try the live demo
              <ArrowRight size={16} />
            </a>
            <a
              href={LINKS.litepaper}
              target="_blank"
              rel="noopener noreferrer"
              // Mirrors the primary CTA's hover idiom: small upward
              // lift (-1px), stronger border tint, and a deeper drop
              // shadow. Subtle but matches the visual interaction
              // language across both CTAs.
              className="hero-secondary-cta font-heading text-14 font-semibold tracking-tight px-6 py-3.5 rounded-xl text-on-light-primary bg-surface-light-elevated border border-line-on-light inline-flex items-center gap-2 hover:-translate-y-px"
              style={{
                boxShadow: "var(--card-pill-inset)",
                transition:
                  "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms ease-out, border-color 240ms ease-out, background-color 240ms ease-out",
              }}
            >
              <Document size={16} />
              Read the litepaper
            </a>
          </div>
        </RevealOnScroll>

        {/* Stats trio — styled to match the reference "Blockchains On
            Demand" Hero (Orbitron-style value at text-32/40, semibold,
            label at text-12 widest tracking). The "Transactions /
            second" label uses a slash so it fits on a single line —
            keeps all three label rows at the same height. */}
        <RevealOnScroll delayMs={600} className="w-full flex justify-center">
          <div
            // Lighter border + lighter internal gaps to match the
            // reference HTML's `border-slate-300/60` / `bg-slate-300/50`
            // (was using the regular line-on-light token which read
            // as too dark next to the surface colour).
            className="mt-16 md:mt-24 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-line-on-light-soft"
            style={{
              background: "var(--color-line-on-light-soft)",
              boxShadow: "var(--card-pill-inset-strong)",
            }}
          >
            <Stat
              value="> 1M"
              label="Transactions / second"
              valueClass="text-primary-blue"
            />
            <Stat value="< 50ms" label="Confirmation" />
            <Stat value="≈ $0" label="Per transaction" />
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @keyframes ns-ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        /* Secondary CTA hover — border picks up a faint sonic-blue
           tint, drop shadow deepens slightly. Combined with the
           Tailwind hover:-translate-y-px on the element, this matches
           the interaction feel of the primary blue CTA without
           competing visually. */
        .hero-secondary-cta:hover {
          border-color: var(--cta-secondary-hover-border) !important;
          box-shadow: var(--cta-secondary-hover-shadow) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-secondary-cta:hover { transform: none !important; }
        }
      `}</style>
    </section>
  );
}

function Stat({
  value,
  label,
  valueClass = "text-on-light-primary",
}: {
  value: string;
  label: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-surface-light px-6 py-7 text-left">
      <div
        className={`font-heading ${valueClass} text-22 md:text-24 font-semibold tracking-tight tabular-nums`}
      >
        {value}
      </div>
      <div className="mt-2 font-heading text-12 uppercase tracking-widest text-on-light-muted">
        {label}
      </div>
    </div>
  );
}
