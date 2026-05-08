import { ArrowUpRight } from "./icons";
import RevealOnScroll from "./RevealOnScroll";

const RESOURCES = [
  { num: "01", label: "Litepaper", href: "https://northstar.sonicsvm.org/" },
  { num: "02", label: "Docs", href: "https://docs.sonicsvm.org/" },
  { num: "03", label: "GitHub", href: "https://github.com/mirrorworld-universe/orderbook_northstar" },
  { num: "04", label: "Demo", href: "https://orderbook-northstar.vercel.app/" },
] as const;

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-primary-blue"
      style={{
        borderTop: "1px solid var(--color-line-on-blue-strong)",
      }}
    >
      {/* top hairline accent — white-tinted */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span
                  className="relative inline-flex items-center justify-center w-11 h-11 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08))",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.5), 0 6px 22px rgba(0,0,0,0.20)",
                  }}
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/north-star-logo.svg"
                    alt=""
                    width={26}
                    height={26}
                    className="block"
                  />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-10 uppercase tracking-wide text-on-blue-muted">
                    Powered by Sonic SVM
                  </span>
                  <span className="font-heading text-14 tracking-tight text-on-blue-primary font-semibold">
                    NORTH STAR
                  </span>
                </div>
              </div>

              <div>
                <h2
                  className="font-heading tracking-tight font-medium whitespace-nowrap"
                  style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}
                >
                  <span className="text-on-blue-primary">North{" "}Star</span>
                  <span className="text-on-blue-muted">{" "}by{" "}</span>
                  <span className="text-secondary-green">Sonic{" "}SVM</span>
                </h2>
              </div>
            </div>

            <nav aria-label="Resources" className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-2 font-mono text-10 uppercase tracking-wide text-on-blue-muted">
                <span aria-hidden className="w-6 h-px bg-on-blue-faint opacity-60" />
                Resources
              </div>
              <ul className="flex flex-col md:items-end gap-2 md:gap-1.5">
                {RESOURCES.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 py-1 font-body text-16 text-on-blue-secondary hover:text-on-blue-primary transition-colors"
                    >
                      <span className="font-mono text-10 text-on-blue-muted tabular-nums">
                        {r.num}
                      </span>
                      <span className="font-heading text-14 tracking-tight font-medium">
                        {r.label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-on-blue-muted group-hover:text-secondary-green transition-colors"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </RevealOnScroll>

        <div className="my-10 md:my-14 relative h-px w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.32) 20%, rgba(255,255,255,0.32) 80%, transparent 100%)",
            }}
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-10 uppercase tracking-wide text-on-blue-muted">
            <span>© 2026 Sonic SVM</span>
            <span className="hidden md:inline w-px h-3 bg-on-blue-faint opacity-60" />
            <a href="#" className="hover:text-on-blue-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-on-blue-primary transition-colors">
              Privacy
            </a>
          </div>

          <div className="flex items-center gap-3 font-mono text-10 uppercase tracking-wide text-on-blue-secondary">
            <span
              aria-hidden
              className="w-2 h-2 rounded-full bg-secondary-green"
              style={{ boxShadow: "0 0 10px rgba(0,255,148,0.7)" }}
            />
            Network Online
          </div>
        </div>

      </div>
    </footer>
  );
}
