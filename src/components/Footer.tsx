import { ArrowUpRight } from "./icons";
import RevealOnScroll from "./RevealOnScroll";

const RESOURCES = [
  { num: "01", label: "Litepaper", href: "https://northstar.sonicsvm.org/" },
  { num: "02", label: "Docs", href: "https://docs.sonicsvm.org/" },
  {
    num: "03",
    label: "GitHub",
    href: "https://github.com/mirrorworld-universe/orderbook_northstar",
  },
  { num: "04", label: "Demo", href: "https://orderbook-northstar.vercel.app/" },
] as const;

/**
 * Footer — saturated-blue closer. Stripped back to ONLY content that
 * exists in the PRD: brand identity, resource links, copyright/legal.
 * No invented telemetry (no "block #N", no "build v1.0.0", no fake
 * latency readouts) — those were decorative noise that didn't map to
 * anything real.
 *
 * Decoration is kept minimal but on-brand:
 *   1. top hairline + ambient halo + faint drifting grid (already
 *      established as the footer's atmospheric layer)
 *   2. a single "Network online" live indicator (matches the same
 *      pattern used in Hero's "● Live Sync" eyebrow)
 */
export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-primary-blue"
      style={{
        borderTop: "1px solid var(--color-line-on-blue-strong)",
      }}
    >
      {/* top hairline accent — white-tinted, slowly breathing */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
          animation: "ns-footer-line 6s ease-in-out infinite",
        }}
      />

      {/* ambient halo at top center, breathing slowly */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-260px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1200px",
          height: "560px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 72%)",
          filter: "blur(20px)",
          animation: "ns-footer-halo 9s ease-in-out infinite",
          willChange: "opacity, transform",
        }}
      />

      {/* faint white grid that very slowly drifts diagonally */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at top, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 25%, transparent 75%)",
          animation: "ns-footer-drift 60s linear infinite",
          willChange: "background-position",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 py-12 md:py-16">
        {/* ROW 1 — Brand (left) + Resources nav (right). Two columns,
            both real PRD content, no invented telemetry. */}
        <RevealOnScroll>
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
            {/* Brand block */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span
                  className="relative inline-flex items-center justify-center w-11 h-11 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08))",
                    border: "1px solid rgba(255,255,255,0.55)",
                    // Dropped the `inset 0 1px 0 rgba(255,255,255,0.5)`
                    // top-edge highlight — on the dark-blue footer
                    // background it stacked on top of the already-bright
                    // 0.55 white border and read as a duplicated top
                    // line. External drop shadow alone is enough lift.
                    boxShadow: "0 6px 22px rgba(0,0,0,0.20)",
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

              <h2
                className="font-heading tracking-tight font-medium whitespace-nowrap"
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  lineHeight: 1.15,
                }}
              >
                <span className="text-on-blue-primary">North{" "}Star</span>
                <span className="text-on-blue-muted">{" "}by{" "}</span>
                <span className="text-secondary-green">Sonic{" "}SVM</span>
              </h2>

              <p className="max-w-md font-body text-14 text-on-blue-secondary leading-relaxed">
                Dedicated blockchains on demand. Over a million TPS. Settles
                back to Solana.
              </p>
            </div>

            {/* Resources nav — vertical list, right-aligned on md+. */}
            <nav
              aria-label="Resources"
              className="flex flex-col gap-4 md:items-end"
            >
              <div className="flex items-center gap-2 font-mono text-10 uppercase tracking-wide text-on-blue-muted">
                <span
                  aria-hidden
                  className="w-6 h-px bg-on-blue-faint opacity-60"
                />
                Resources
              </div>
              <ul className="flex flex-col md:items-end gap-2 md:gap-1.5">
                {RESOURCES.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link group inline-flex items-center gap-3 py-1 transition-colors"
                    >
                      <span className="font-mono text-10 text-on-blue-muted tabular-nums">
                        {r.num}
                      </span>
                      <span className="font-heading text-14 tracking-tight font-medium text-on-blue-secondary group-hover:text-on-blue-primary transition-colors">
                        {r.label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="footer-link-arrow text-on-blue-muted group-hover:text-secondary-green"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </RevealOnScroll>

        {/* Hairline divider */}
        <div className="my-10 md:my-14 relative h-px w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.32) 20%, rgba(255,255,255,0.32) 80%, transparent 100%)",
            }}
          />
        </div>

        {/* ROW 2 — Legal (left) + Network online indicator (right).
            Just one real status pill — matches Hero's "● Live Sync"
            pattern, signals "we exist on mainnet". No invented build
            numbers or telemetry. */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-10 uppercase tracking-wide text-on-blue-muted">
            <span>© 2026 Sonic SVM</span>
            <span
              aria-hidden
              className="hidden md:inline w-px h-3 bg-on-blue-faint opacity-60"
            />
            <a
              href="#"
              className="hover:text-on-blue-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-on-blue-primary transition-colors"
            >
              Privacy
            </a>
          </div>

          <div className="flex items-center gap-2 font-mono text-10 uppercase tracking-wide text-on-blue-secondary">
            <span aria-hidden className="relative inline-flex w-2 h-2">
              <span
                className="absolute inset-0 rounded-full bg-secondary-green opacity-60"
                style={{ animation: "ns-footer-pulse 2.4s ease-in-out infinite" }}
              />
              <span
                className="relative w-2 h-2 rounded-full bg-secondary-green"
                style={{ boxShadow: "0 0 10px rgba(0,255,148,0.7)" }}
              />
            </span>
            Network Online
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ns-footer-line {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes ns-footer-halo {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50%      { opacity: 1; transform: translateX(-50%) scale(1.04); }
        }
        @keyframes ns-footer-drift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 56px 56px, 56px 56px; }
        }
        @keyframes ns-footer-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0;   transform: scale(2.2); }
        }
        /* Resource link arrow — translates 2px up/right on hover ONLY,
           no flex-gap shifting (avoids the rigid sideways jerk). */
        .footer-link-arrow {
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), color 240ms ease-out;
        }
        .footer-link:hover .footer-link-arrow {
          transform: translate(2px, -2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-link:hover .footer-link-arrow { transform: none; }
          [class*="ns-footer"], [style*="ns-footer"] {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
