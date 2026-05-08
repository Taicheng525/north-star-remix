import { ArrowRight, Bolt, Document } from "./icons";
import HeroBackground from "./HeroBackground";
import RevealOnScroll from "./RevealOnScroll";

const LINKS = {
  demo: "https://orderbook-northstar.vercel.app/",
  litepaper: "https://northstar.sonicsvm.org/",
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden md:min-h-screen">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-24 pb-16 md:pb-12 flex flex-col items-center text-center">
        {/* Top label row */}
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10">
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
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <Bolt size={14} className="text-primary-blue" />
              <span className="font-heading text-12 font-medium tracking-tight text-on-light-primary">
                Powered by Sonic SVM
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Headline */}
        <RevealOnScroll delayMs={150} className="w-full">
          <h1
            className="font-heading text-on-light-primary font-extrabold tracking-tight whitespace-nowrap"
            style={{ fontSize: "clamp(26px, 7.5vw, 112px)", lineHeight: 1.04 }}
          >
            Your Own Blockchain,
            <br />
            <span className="text-primary-blue">On Demand</span>
          </h1>
        </RevealOnScroll>

        {/* Subtitle */}
        <RevealOnScroll delayMs={300} className="w-full flex justify-center">
          <p className="mt-7 max-w-2xl font-body text-16 md:text-20 text-on-light-secondary leading-relaxed">
            North Star spins up dedicated blockchains on demand.
            <br className="hidden md:block" /> Over a million TPS. Powered by Sonic
            SVM.
          </p>
        </RevealOnScroll>

        {/* CTA cluster */}
        <RevealOnScroll delayMs={450} className="w-full">
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
              className="font-heading text-14 font-semibold tracking-tight px-6 py-3.5 rounded-xl text-on-light-primary bg-surface-light-elevated border border-line-on-light inline-flex items-center gap-2"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <Document size={16} />
              Read the litepaper
            </a>
          </div>
        </RevealOnScroll>

        {/* Stats trio */}
        <RevealOnScroll delayMs={600} className="w-full flex justify-center">
          <div
            className="mt-14 md:mt-20 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-line-on-light"
            style={{
              background: "var(--color-line-on-light)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), 0 12px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Stat
              value="> 1M"
              label="transactions per second"
              valueClass="text-primary-blue"
            />
            <Stat value="< 50ms" label="confirmation" />
            <Stat value="≈ $0" label="per transaction" />
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
        className={`font-heading ${valueClass} text-28 md:text-32 font-extrabold tracking-tight tabular-nums`}
      >
        {value}
      </div>
      <div className="mt-2 font-heading text-10 uppercase tracking-wide text-on-light-muted">
        {label}
      </div>
    </div>
  );
}
