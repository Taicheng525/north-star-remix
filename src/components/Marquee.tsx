"use client";

/**
 * Marquee — full-width black band with horizontally scrolling mono text.
 * Pause on hover. Honors prefers-reduced-motion (renders one static row).
 */

const ITEMS = [
  "On-Chain Oracles",
  "Autonomous Agents",
  "On-Chain Orderbooks",
  "Dedicated Runtime",
  "Powered by Sonic SVM",
] as const;

const Glyph = () => (
  <span aria-hidden className="text-secondary-green mx-6 inline-block translate-y-px">
    ◆
  </span>
);

export default function Marquee() {
  // Repeat content 2x so the loop seam is hidden
  const row = (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-heading font-semibold uppercase tracking-[0.2em] text-text-primary text-20 md:text-28 whitespace-nowrap">
            {item}
          </span>
          <Glyph />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden bg-background-primary"
      style={{
        borderTop: "1px solid var(--color-line-primary)",
        borderBottom: "1px solid var(--color-line-primary)",
      }}
    >
      <div
        className="flex items-center py-6 md:py-8"
        style={{
          width: "max-content",
          animation: "ns-marquee 38s linear infinite",
        }}
      >
        {row}
        {row}
      </div>

      <style>{`
        @keyframes ns-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden].overflow-hidden > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
