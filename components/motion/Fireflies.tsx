"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Fly {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
}

/** 6–8 tiny gold fireflies drifting slowly. Transform/opacity only. */
export default function Fireflies({ count = 7 }: { count?: number }) {
  const reduced = useReducedMotion();

  const flies = useMemo<Fly[]>(() => {
    // Deterministic pseudo-random layout so SSR and client agree.
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 137.508) % 100;
      return {
        left: `${8 + ((seed * 0.9) % 84)}%`,
        top: `${12 + ((seed * 1.7) % 70)}%`,
        size: 2 + (i % 3),
        duration: 7 + (i % 5) * 1.6,
        delay: i * 0.9,
        dx: i % 2 === 0 ? 22 : -18,
        dy: i % 3 === 0 ? -26 : -14,
      };
    });
  }, [count]);

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            backgroundColor: "var(--gold-leaf)",
            boxShadow: "0 0 6px 2px rgba(242, 201, 76, 0.45)",
          }}
          animate={{
            x: [0, f.dx, 0],
            y: [0, f.dy, 0],
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
