"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Book, Close, Code, Document, Menu } from "./icons";

const LINKS = {
  litepaper: "https://northstar.sonicsvm.org/",
  docs: "https://docs.sonicsvm.org/",
  github: "https://github.com/mirrorworld-universe/orderbook_northstar",
  demo: "https://orderbook-northstar.vercel.app/",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(239, 239, 245, 0.72)",
        borderBottom: "1px solid var(--color-line-on-light-soft)",
      }}
    >
      {/* Full-bleed nav — no `max-w-6xl mx-auto`. The user wants the
          logo flush-left and the CTA flush-right against the viewport
          edges (with only the px-6/lg:px-10 gutter), and the centred
          link cluster absolutely anchored to the *screen* mid-point,
          not to a 1152px-wide content column. */}
      <nav className="w-full px-6 lg:px-10">
        {/* `relative` so the centered link group below can absolutely
            position itself. Logo + CTA still flex-justify-between at
            the edges; the link group is ANCHORED to the row's
            horizontal centre, independent of logo/CTA widths. */}
        <div className="relative flex items-center justify-between" style={{ height: "4.25rem" }}>
          <Link href="/" className="flex items-center gap-2.5 group">
            <span
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg transition-transform group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,255,0.10), rgba(0,0,255,0.02))",
                border:
                  "1px solid var(--color-primary-blue-on-light-border)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 14px rgba(0,0,255,0.10)",
              }}
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/north-star-logo.svg"
                alt=""
                width={22}
                height={22}
                className="block"
              />
            </span>
            <span
              className="font-heading text-16 font-semibold tracking-tight text-on-light-primary"
              style={{ letterSpacing: "0.01em" }}
            >
              NORTH STAR
            </span>
          </Link>

          {/* Absolutely-centred link cluster — anchored to the row's
              horizontal centre via `left-1/2 -translate-x-1/2`. This
              keeps the links visually centered regardless of how wide
              the logo or CTA on either side end up being. */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            <NavLink href={LINKS.litepaper} icon={<Document size={15} />}>
              Litepaper
            </NavLink>
            <NavLink href={LINKS.docs} icon={<Book size={15} />}>
              Docs
            </NavLink>
            <NavLink href={LINKS.github} icon={<Code size={15} />}>
              GitHub
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={LINKS.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex font-heading text-14 font-semibold tracking-tight px-4 py-2.5 rounded-xl bg-primary-blue text-white items-center gap-2 transition-transform hover:-translate-y-px"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 22px rgba(0,0,255,0.30)",
              }}
            >
              Try Demo
              <ArrowRight size={15} />
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-light-elevated border border-line-on-light text-on-light-primary"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: open ? 320 : 0,
            transition: "max-height 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="pb-5 pt-1 flex flex-col gap-1">
            <MobileLink href={LINKS.litepaper} icon={<Document size={16} />}>
              Litepaper
            </MobileLink>
            <MobileLink href={LINKS.docs} icon={<Book size={16} />}>
              Docs
            </MobileLink>
            <MobileLink href={LINKS.github} icon={<Code size={16} />}>
              GitHub
            </MobileLink>
            <a
              href={LINKS.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden mt-2 font-heading text-14 font-semibold tracking-tight px-4 py-3 rounded-xl bg-primary-blue text-white inline-flex items-center justify-center gap-2"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 22px rgba(0,0,255,0.30)",
              }}
            >
              Try Demo
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body text-14 px-3.5 py-2 rounded-lg text-on-light-secondary hover:text-on-light-primary hover:bg-surface-light-elevated transition-colors flex items-center gap-1.5"
    >
      {icon}
      {children}
    </a>
  );
}

function MobileLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body text-14 px-3.5 py-3 rounded-lg text-on-light-secondary hover:text-on-light-primary hover:bg-surface-light-elevated transition-colors flex items-center gap-2.5"
    >
      {icon}
      {children}
    </a>
  );
}
