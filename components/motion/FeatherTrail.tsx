"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FeatherEye from "@/components/art/FeatherEye";

interface Particle {
  id: number;
  x: number;
  y: number;
}

/**
 * Faint peacock-feather-eye particle trail on pointer move.
 * Throttled to one particle per 90ms, mouse-only (skipped on touch),
 * disabled under prefers-reduced-motion. Attach inside a relative container.
 */
export default function FeatherTrail() {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastEmit = useRef(0);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const host = containerRef.current?.parentElement;
    if (!host) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastEmit.current < 90) return;
      lastEmit.current = now;

      const rect = host.getBoundingClientRect();
      const p: Particle = {
        id: idRef.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setParticles((prev) => [...prev.slice(-11), p]);
      window.setTimeout(() => {
        setParticles((prev) => prev.filter((q) => q.id !== p.id));
      }, 900);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    return () => host.removeEventListener("pointermove", onMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0.5, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 1.1, y: "-90%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <FeatherEye size={14} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
