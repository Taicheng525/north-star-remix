"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "ns-theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  // Hydration-safe: render a placeholder until mounted, so the initial
  // server HTML (which is always data-theme="light") matches the first
  // client render. After mount we sync to whatever the bootstrap script
  // already wrote to <html>.
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable (private mode etc) — swap is still
         applied to <html>, just not persisted across reloads. */
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={toggle}
      className="cursor-pointer inline-flex items-center justify-center w-10 h-10 rounded-lg border text-on-light-secondary hover:text-on-light-primary transition-all hover:-translate-y-px"
      style={{
        background: "var(--color-surface-light-elevated)",
        borderColor: "var(--color-line-on-light)",
        boxShadow:
          "inset 0 1px 0 var(--color-nav-logo-inset), 0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Render the CURRENT-state icon — moon while dark, sun while
          light. Reads as "this is the current mode", which matches
          the convention used by macOS / iOS / VS Code switchers. */}
      {mounted ? (
        isDark ? <Moon size={16} /> : <Sun size={16} />
      ) : (
        <Sun size={16} />
      )}
    </button>
  );
}
