"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

/**
 * IntroFilm — full-screen cinematic intro that plays on every page
 * load. ~14.5s timeline orchestrated with GSAP:
 *   SEQ 1 (0–3.5s)   "A North Star Transmission" + logo reveal
 *   SEQ 2 (3.5–8s)   "Your Own Blockchain / On Demand." headline
 *   SEQ 3 (8–10.8s)  3-stat readout (>1M / <50ms / ≈$0)
 *   SEQ 4 (10.8–14.5s) NORTH·STAR logo + "ENTER CONSOLE" CTA
 *
 * Two ways to exit:
 *   - Click "ENTER CONSOLE" at the end (or anywhere during SEQ 4)
 *   - "Skip Intro" button (always visible, top-right)
 *
 * Honours prefers-reduced-motion: skips the WebGL grid + GSAP timeline
 * entirely and shows a static one-screen fallback with a single
 * "Enter" CTA.
 *
 * The Hero/page underneath the intro is fully rendered and ready;
 * we just keep this <div> as a fixed overlay until dismissed.
 */
export default function IntroFilm() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const webglContainerRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<gsap.core.Timeline | null>(null);

  // Dismiss: fade out, then unmount. Also fires a custom event so
  // page-content RevealOnScroll wrappers can hold off triggering
  // their entrance animations until the intro is actually out of
  // the way (otherwise their entrance would run hidden behind us).
  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ns:intro-dismissed"));
      try {
        delete (window as unknown as { __nsIntroPlaying?: boolean })
          .__nsIntroPlaying;
      } catch {
        /* ignore */
      }
    }
    window.setTimeout(() => setVisible(false), 600);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Mark intro as playing so RevealOnScroll wrappers know to gate
    // their reveals until we're done.
    (window as unknown as { __nsIntroPlaying?: boolean }).__nsIntroPlaying =
      true;

    if (reduced) {
      // Static fallback handles its own display via the JSX below.
      return;
    }

    // ---------- WebGL grid (perspective sweep) ----------
    const container = webglContainerRef.current;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let geo: THREE.BufferGeometry | null = null;
    let mat: THREE.LineBasicMaterial | null = null;
    let webglRaf = 0;

    if (container) {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xefeff5, 0.0018);
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000,
      );
      camera.position.set(0, 60, 220);
      camera.lookAt(0, 0, 0);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      mat = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.22,
      });
      const pts: THREE.Vector3[] = [];
      const size = 1200;
      const step = 40;
      for (let i = -size; i <= size; i += step) {
        pts.push(new THREE.Vector3(-size, 0, i));
        pts.push(new THREE.Vector3(size, 0, i));
        pts.push(new THREE.Vector3(i, 0, -size));
        pts.push(new THREE.Vector3(i, 0, size));
      }
      geo = new THREE.BufferGeometry().setFromPoints(pts);
      const grid = new THREE.LineSegments(geo, mat);
      grid.rotation.x = Math.PI / 2.4;
      scene.add(grid);
      let t = 0;
      const animate = () => {
        webglRaf = requestAnimationFrame(animate);
        t += 0.5;
        grid.position.z = t % step;
        if (camera) {
          camera.position.x = Math.sin(t * 0.005) * 20;
          camera.lookAt(0, 0, 0);
        }
        if (renderer && scene && camera) renderer.render(scene, camera);
      };
      animate();
    }

    const onResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", onResize);

    // ---------- GSAP master timeline ----------
    gsap.to("#intro-webgl", { opacity: 0.5, duration: 1.2, delay: 0.4 });

    // Single-sequence intro: total ~3.8s (logo cold-open then auto
    // dismiss into the Hero). Progress bar fills over this window
    // so users can see how close the intro is to ending.
    const TOTAL = 3.8;
    gsap.to("#intro-progress", {
      width: "100%",
      duration: TOTAL,
      ease: "none",
    });

    const master = gsap.timeline({
      onComplete: () => {
        // Auto-dismiss as soon as Seq 1 finishes — the page below
        // (Hero) then runs ITS reveal (RevealOnScroll listeners
        // fire on the `ns:intro-dismissed` event).
        dismiss();
      },
    });
    masterRef.current = master;

    // SEQ 1 — logo cold open (0 - 3.5s)
    master.to(
      "#intro-s1-pre",
      { y: "0%", duration: 0.7, ease: "power3.out" },
      0.3,
    );
    // Logo scales straight up to its final size — no overshoot/
    // bounce. `power3.out` decelerates smoothly so it doesn't feel
    // robotic, but it never goes past scale 1. Shorter duration
    // (0.6s vs the old 0.9s back.out) tightens the whole beat.
    master.to(
      "#intro-s1-star",
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      0.6,
    );
    // Shadow softly fades in (opacity only — no scale animation,
    // which felt mechanical / "you can see the rectangle behind").
    // Slightly longer duration with power1.out so it eases in
    // gently. Starts in the final 0.15s of the logo's scale-in.
    master.to(
      "#intro-s1-shadow",
      {
        opacity: 1,
        duration: 0.7,
        ease: "power1.out",
      },
      1.05,
    );
    master.to("#intro-s1-co", { opacity: 1, duration: 0.5 }, 1.4);
    master.to(
      "#intro-seq1",
      {
        opacity: 0,
        scale: 1.6,
        filter: "blur(20px)",
        duration: 0.7,
        ease: "power2.in",
      },
      2.8,
    );

    return () => {
      if (masterRef.current) {
        masterRef.current.kill();
        masterRef.current = null;
      }
      if (webglRaf) cancelAnimationFrame(webglRaf);
      window.removeEventListener("resize", onResize);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      if (geo) geo.dispose();
      if (mat) mat.dispose();
    };
  }, []);

  if (!visible) return null;

  const reducedFallback =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-label="North Star intro film"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#EFEFF5",
        color: "#0F172A",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: "opacity 560ms cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: exiting ? "none" : "auto",
        fontFamily: "var(--font-body), Manrope, system-ui, sans-serif",
      }}
    >
      {/* WebGL grid layer */}
      <div
        id="intro-webgl"
        ref={webglContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,30,0.15) 100%)",
        }}
      />
      {/* Scanlines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          opacity: 0.08,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Top + bottom HUDs removed — the intro is now a clean
          single-sequence logo cold-open. The only chrome left is the
          progress bar at the very bottom so users can see how close
          we are to revealing the page. */}

      {/* Progress bar */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 31,
          background: "rgba(0,0,0,0.06)",
        }}
      >
        <div
          id="intro-progress"
          style={{
            height: "100%",
            width: "0%",
            background: "#0000FF",
            boxShadow: "0 0 12px rgba(0,0,255,0.6)",
          }}
        />
      </div>

      {reducedFallback ? (
        // ============ reduced-motion: single static screen ============
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <NorthStarMark large />
            <h1
              style={{
                fontFamily: "var(--font-heading), Orbitron, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 5vw, 56px)",
                letterSpacing: "-0.02em",
                margin: "32px 0 12px",
              }}
            >
              Your Own Blockchain,{" "}
              <span style={{ color: "#0000FF" }}>On Demand.</span>
            </h1>
            <p
              style={{
                color: "#475569",
                fontSize: 14,
                maxWidth: 420,
                margin: "0 auto 28px",
                lineHeight: 1.6,
              }}
            >
              Spin up dedicated chains in seconds. Over 1M TPS, sub-50ms
              confirmation, on Sonic SVM.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="intro-enter-btn"
              style={{
                fontFamily: "var(--font-heading), Orbitron, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "12px 24px",
                borderRadius: 12,
                color: "#FFFFFF",
                background: "#0000FF",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,255,0.35)",
              }}
            >
              ENTER CONSOLE →
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ====== SEQUENCE 1: COLD OPEN ====== */}
          <div
            id="intro-seq1"
            className="intro-seq"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 1,
            }}
          >
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={{ overflow: "hidden" }}>
                <div
                  id="intro-s1-pre"
                  style={{
                    fontFamily: "var(--font-heading), Orbitron, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "#64748B",
                    transform: "translateY(100%)",
                  }}
                >
                  A North Star Transmission
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div
                  id="intro-s1-star"
                  style={{
                    position: "relative",
                    display: "inline-block",
                    transform: "scale(0.2)",
                    opacity: 0,
                  }}
                >
                  {/* Shadow-only proxy. We use `clip-path` (not an
                      outer `overflow:hidden` wrapper) so the LOGO's
                      bounce-in overshoot isn't clipped at the top —
                      only the shadow's own vertical spread is.
                      `inset(0 -1000px 0 -1000px)` clips strict at the
                      top + bottom edges (kills the up/down halo) but
                      extends 1000px LEFT and RIGHT so the horizontal
                      spread of the box-shadow stays visible. */}
                  <div
                    id="intro-s1-shadow"
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 60,
                      height: 60,
                      borderRadius: 14,
                      // Softer shadow (0.32 vs 0.5) so it reads as
                      // ambient glow, not a hard blue block fading in.
                      boxShadow: "0 20px 60px rgba(0,0,255,0.32)",
                      opacity: 0,
                      // Vertical halo killed by clip-path so the glow
                      // only spreads left/right (matches HTML ref).
                      clipPath: "inset(0 -1000px 0 -1000px)",
                      WebkitClipPath: "inset(0 -1000px 0 -1000px)",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <NorthStarMark large withGlow={false} />
                  </div>
                </div>
              </div>
              <div style={{ overflow: "hidden", marginTop: 24 }}>
                <div
                  id="intro-s1-co"
                  style={{
                    fontFamily: "var(--font-heading), Orbitron, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#94A3B8",
                    opacity: 0,
                  }}
                >
                  Initializing chain spec · v4.2.1
                </div>
              </div>
            </div>
          </div>

        </>
      )}

      <style>{`
        @keyframes intro-ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        .intro-skip-btn:hover {
          background: rgba(255,255,255,0.95) !important;
          border-color: rgba(0,0,255,0.30) !important;
          transform: translateY(-1px);
        }
        .intro-enter-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .intro-enter-btn { transition: filter 200ms ease-out, transform 200ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .intro-skip-btn:hover,
          .intro-enter-btn:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}

/** North Star logo mark for the intro — Navbar-style light-blue
 *  frosted-glass tile. Backdrop-filter blur smears the CRT scanlines
 *  / WebGL grid behind into a smooth tone, so the tile still reads
 *  as translucent (matches the Navbar visually) but never lets sharp
 *  background lines bleed through it. */
function NorthStarMark({
  large = false,
  withGlow = true,
}: {
  large?: boolean;
  withGlow?: boolean;
}) {
  // Scaled up version of the Navbar mark (which is w-9 h-9 = 36px).
  const size = large ? 60 : 44;
  const inner = large ? 34 : 26;
  const radius = large ? 14 : 10;
  const innerHighlight = large
    ? "inset 0 1px 0 rgba(255,255,255,0.85)"
    : "inset 0 1px 0 rgba(255,255,255,0.7)";
  // Outer glow — single strong shadow matching the reference HTML
  // (0 20px 60px rgba(0,0,255,0.5) instead of two softer layers).
  const outerGlow = large
    ? ", 0 20px 60px rgba(0,0,255,0.5)"
    : ", 0 4px 14px rgba(0,0,255,0.10)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(0,0,255,0.18), rgba(0,0,255,0.06))",
        backdropFilter: "blur(22px) saturate(1.3)",
        WebkitBackdropFilter: "blur(22px) saturate(1.3)",
        border: "1px solid var(--color-primary-blue-on-light-border)",
        boxShadow: withGlow ? `${innerHighlight}${outerGlow}` : innerHighlight,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/north-star-logo.svg"
        alt="North Star"
        width={inner}
        height={inner}
        style={{ display: "block" }}
      />
    </div>
  );
}
