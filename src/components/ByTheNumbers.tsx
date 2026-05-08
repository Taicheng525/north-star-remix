import { Bolt, ChartLine } from "./icons";
import RevealOnScroll from "./RevealOnScroll";
import SectionDivider from "./SectionDivider";

export default function ByTheNumbers() {
  return (
    <section className="relative w-full">
      <div className="pt-20 md:pt-24">
        <SectionDivider label="Performance" theme="light" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        <RevealOnScroll className="w-full">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14 md:mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-5 font-mono text-10 uppercase tracking-wide text-primary-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                <span>Benchmarks · Live Mainnet</span>
              </div>
              <h2 className="font-heading text-on-light-primary font-extrabold tracking-tight section-title">
                Performance{" "}That{" "}Changes the{" "}<span className="text-primary-blue">Math</span>
              </h2>
            </div>
            <div className="md:text-right max-w-xs font-mono text-10 uppercase tracking-wide text-on-light-muted md:pt-2">
              Measured under sustained load · independently verified
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="w-full" delayMs={150}>
          <div className="relative grid grid-cols-1 md:grid-cols-3 border-y border-line-on-light">
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
            />
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
            />
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
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="w-full" delayMs={300}>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-10 uppercase tracking-wide text-on-light-muted">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span
                  className="absolute inset-0 rounded-full bg-primary-blue opacity-60"
                  style={{
                    animation: "ns-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span className="relative w-1.5 h-1.5 rounded-full bg-primary-blue" />
              </span>
              Streaming from North Star mainnet
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>Region · Global Avg.</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-on-light-faint" />
              <span>Sample · 30d trailing</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-on-light-faint" />
              <span>Methodology — Open Source</span>
            </div>
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

function BigStat({
  num,
  category,
  icon,
  prefix,
  value,
  suffix,
  label,
  context,
}: {
  num: string;
  category: string;
  icon: React.ReactNode;
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
  context: React.ReactNode;
}) {
  return (
    <article className="relative p-8 md:p-10 lg:p-12 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-line-on-light">
      {/* eyebrow row */}
      <div className="flex items-center justify-between mb-14 md:mb-20">
        <div className="flex items-center gap-2 font-mono text-10 uppercase tracking-wide text-on-light-muted">
          <span className="text-primary-blue">{num}</span>
          <span className="w-6 h-px bg-on-light-faint opacity-60" />
          <span>{category}</span>
        </div>
        {icon}
      </div>

      {/* value — flex-wrap so prefix/value/suffix can drop on narrow cols */}
      <div className="flex items-baseline gap-2 flex-wrap">
        {prefix && (
          <span className="font-heading text-on-light-faint text-22 md:text-28">
            {prefix}
          </span>
        )}
        <span
          className="font-heading text-on-light-primary font-extrabold tracking-tight"
          style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
        >
          {value}
        </span>
        {suffix && (
          <span className="font-heading text-on-light-muted text-20 md:text-24 font-medium">
            {suffix}
          </span>
        )}
      </div>

      {/* label — min-height locks 2-lines worth of space so context starts at same y across cols */}
      <div
        className="mt-5 font-heading text-on-light-primary text-16 lg:text-20 font-semibold tracking-tight leading-tight"
        style={{ minHeight: "3rem" }}
      >
        {label}
      </div>

      <div className="mt-2 font-body text-14 text-on-light-secondary leading-relaxed">
        {context}
      </div>
    </article>
  );
}
