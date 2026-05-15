"use client";

import { useEffect, useRef } from "react";

/**
 * AtomArrayBackground — page-wide particle network that **scrolls with
 * the page content** instead of floating fixed in the viewport.
 *
 * How:
 *   - Canvas itself stays viewport-sized + `position: fixed` (so we
 *     never have to allocate a giant canvas the height of the whole
 *     document).
 *   - Atom positions are stored in **document coordinates** (y values
 *     span 0 → docHeight, NOT 0 → viewportH).
 *   - Each frame, atoms render at `y - scrollY` so the visible slice
 *     of the lattice that lives in viewport y depends on scroll
 *     position. Scroll down → different atoms come into view.
 *
 * The result reads as "the atom lattice is the background of the
 * page", not "an animated overlay stuck on the screen". Atoms drift
 * slowly in document space, so even at rest the network breathes.
 *
 * Layering: canvas is `z-index: -1` inside <main>'s `isolation:
 * isolate` stacking context — so frosted-glass cards' backdrop-filter
 * can correctly blur the atoms as part of the backdrop.
 *
 * Honours prefers-reduced-motion (renders one static frame, no rAF).
 */
export default function AtomArrayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctxEl = canvasEl.getContext("2d");
    if (!ctxEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    let width = window.innerWidth;
    let viewportH = window.innerHeight;
    let docHeight = Math.max(
      document.documentElement.scrollHeight,
      viewportH * 2,
    );
    let dpr = window.devicePixelRatio || 1;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Atom palette is theme-aware. CSS variables on <html> hold the
    // RGB triple + alpha for bonds and dots; reading them via
    // getComputedStyle lets the canvas re-tint when the user flips
    // the theme toggle. Cached and refreshed only on attribute change
    // (cheap MutationObserver, not per-frame).
    let bondRgb = "0, 0, 255";
    let bondAlphaBase = 0.16;
    let dotRgb = "0, 0, 255";
    let dotAlpha = 0.45;
    function refreshPalette() {
      const cs = getComputedStyle(document.documentElement);
      bondRgb = cs.getPropertyValue("--atom-bond").trim() || bondRgb;
      const ba = parseFloat(cs.getPropertyValue("--atom-bond-alpha"));
      if (!Number.isNaN(ba)) bondAlphaBase = ba;
      dotRgb = cs.getPropertyValue("--atom-dot").trim() || dotRgb;
      const da = parseFloat(cs.getPropertyValue("--atom-dot-alpha"));
      if (!Number.isNaN(da)) dotAlpha = da;
    }
    refreshPalette();
    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function resize() {
      width = window.innerWidth;
      viewportH = window.innerHeight;
      docHeight = Math.max(
        document.documentElement.scrollHeight,
        viewportH * 2,
      );
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = viewportH * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${viewportH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Atoms live in DOCUMENT space — y goes 0..docHeight.
    type Atom = { x: number; y: number; vx: number; vy: number };
    // Density: ~1 atom per 28000px² (in document area). Clamped.
    function targetAtomCount(): number {
      return Math.max(
        50,
        Math.min(180, Math.floor((width * docHeight) / 28000)),
      );
    }
    // Bond visibility threshold — beyond this, two atoms aren't linked.
    const MAX_DIST = 180;
    const atoms: Atom[] = [];

    function initAtoms() {
      atoms.length = 0;
      const N = targetAtomCount();
      for (let i = 0; i < N; i++) {
        atoms.push({
          x: Math.random() * width,
          y: Math.random() * docHeight,
          // Drift in document space (~14 px/sec peak at 60fps).
          // Bumped from 0.24 → 0.48 so the lattice keeps visibly
          // breathing all the way through the footer area.
          vx: (Math.random() - 0.5) * 0.48,
          vy: (Math.random() - 0.5) * 0.48,
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, viewportH);
      const scrollY = window.scrollY;

      // Update positions (in document space).
      for (const a of atoms) {
        a.x += a.vx;
        a.y += a.vy;
        // Wrap horizontally; bounce vertically off document bounds.
        if (a.x < 0) a.x = width;
        else if (a.x > width) a.x = 0;
        if (a.y < 0 || a.y > docHeight) a.vy *= -1;
      }

      // Collect atoms that are within (or near) the viewport for
      // rendering + bond checks. Atoms far off-screen don't contribute
      // to anything visible.
      const PAD = MAX_DIST; // include atoms one bond-length above/below
      const visIdx: number[] = [];
      const visX: number[] = [];
      const visY: number[] = [];
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];
        const screenY = a.y - scrollY;
        if (screenY < -PAD || screenY > viewportH + PAD) continue;
        visIdx.push(i);
        visX.push(a.x);
        visY.push(screenY);
      }

      // Bonds first so atoms (dots) layer on top. Bumped peak
      // opacity 0.10 → 0.16 and line width 0.6 → 0.7 so the network
      // is more visible (user reported earlier setting felt too
      // faint, especially near the page bottom).
      ctx.lineWidth = 0.7;
      const maxDistSq = MAX_DIST * MAX_DIST;
      for (let i = 0; i < visIdx.length; i++) {
        for (let j = i + 1; j < visIdx.length; j++) {
          const dx = visX[i] - visX[j];
          const dy = visY[i] - visY[j];
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDistSq) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / MAX_DIST) * bondAlphaBase;
            ctx.beginPath();
            ctx.moveTo(visX[i], visY[i]);
            ctx.lineTo(visX[j], visY[j]);
            ctx.strokeStyle = `rgba(${bondRgb}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Atoms (dots). Bumped dot opacity 0.32 → 0.45 and radius
      // 1.5 → 1.7 so dots are clearly readable without overwhelming
      // the page.
      ctx.fillStyle = `rgba(${dotRgb}, ${dotAlpha})`;
      for (let i = 0; i < visIdx.length; i++) {
        ctx.beginPath();
        ctx.arc(visX[i], visY[i], 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    resize();
    initAtoms();

    if (reduced) {
      step();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    } else {
      step();
    }

    const onResize = () => {
      const oldDocH = docHeight;
      resize();
      // Doc height grew significantly → top up with more atoms so
      // density stays roughly constant; otherwise just re-clamp x.
      if (docHeight > oldDocH * 1.2 || atoms.length < targetAtomCount() * 0.7) {
        initAtoms();
      } else {
        for (const a of atoms) {
          if (a.x > width) a.x = width;
        }
      }
    };
    window.addEventListener("resize", onResize);

    // Recheck document height periodically — the page can grow as
    // images load, fonts render, etc. Cheap to do.
    const heightCheck = window.setInterval(() => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        viewportH * 2,
      );
      if (h > docHeight * 1.05) {
        docHeight = h;
        // Don't reinit atoms — let existing ones live; new tall area
        // will gradually fill via drift. Future resize will top up.
      }
    }, 1500);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.clearInterval(heightCheck);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        // z-index: -1 inside main's `isolation: isolate` stacking
        // context — this puts the canvas BEHIND sections but still
        // INSIDE the same stacking context, so frosted-glass cards'
        // `backdrop-filter: blur(...)` will correctly include the
        // atoms as part of the backdrop being blurred.
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
