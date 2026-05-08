"use client";

/**
 * Animated WebGL backdrop for the Hero section: a tilted infinite blue grid +
 * drifting particle field. Sits inside Hero with position:absolute so it
 * stays scoped to the hero (no bleed into other sections). Honors
 * prefers-reduced-motion (renders nothing).
 */

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (cancelled || !container.isConnected) return;

      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xefeff5, 0.0018);

      const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
      camera.position.set(0, 60, 220);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // ---- grid lines ----
      const gridMat = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.16,
      });
      const gpts: InstanceType<typeof THREE.Vector3>[] = [];
      const S = 900;
      const st = 42;
      for (let i = -S; i <= S; i += st) {
        gpts.push(new THREE.Vector3(-S, 0, i), new THREE.Vector3(S, 0, i));
        gpts.push(new THREE.Vector3(i, 0, -S), new THREE.Vector3(i, 0, S));
      }
      const gridGeo = new THREE.BufferGeometry().setFromPoints(gpts);
      const grid = new THREE.LineSegments(gridGeo, gridMat);
      grid.rotation.x = Math.PI / 3;
      scene.add(grid);

      // ---- particles ----
      const pcount = 240;
      const pgeo = new THREE.BufferGeometry();
      const positions = new Float32Array(pcount * 3);
      const speeds = new Float32Array(pcount);
      for (let i = 0; i < pcount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 800;
        positions[i * 3 + 1] = Math.random() * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
        speeds[i] = 0.3 + Math.random() * 0.8;
      }
      pgeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pmat = new THREE.PointsMaterial({
        color: 0x0000ff,
        size: 1.6,
        transparent: true,
        opacity: 0.55,
      });
      const pts = new THREE.Points(pgeo, pmat);
      scene.add(pts);

      let t = 0;
      let raf = 0;
      let visible = true;

      const tick = () => {
        if (cancelled) return;
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        t += 0.004;
        grid.position.z = (t * 30) % st;
        const arr = pgeo.attributes.position.array as Float32Array;
        for (let i = 0; i < pcount; i++) {
          arr[i * 3 + 2] += speeds[i];
          if (arr[i * 3 + 2] > 300) arr[i * 3 + 2] = -300;
        }
        pgeo.attributes.position.needsUpdate = true;
        camera.position.x = Math.sin(t * 0.5) * 8;
        camera.lookAt(0, 20, 0);
        renderer.render(scene, camera);
      };
      tick();

      const onResize = () => {
        const w2 = container.clientWidth || window.innerWidth;
        const h2 = container.clientHeight || window.innerHeight;
        camera.aspect = w2 / h2;
        camera.updateProjectionMatrix();
        renderer.setSize(w2, h2);
      };
      window.addEventListener("resize", onResize);

      // Pause RAF when hero is offscreen — saves battery on long pages
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      observer.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        observer.disconnect();
        renderer.dispose();
        gridGeo.dispose();
        pgeo.dispose();
        gridMat.dispose();
        pmat.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
      aria-hidden
    />
  );
}
