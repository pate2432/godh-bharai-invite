"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Flute from "@/components/art/Flute";
import { unlockAudio } from "@/lib/unlockAudio";

/**
 * Temple-door entrance — stays until the guest taps.
 * Doors open only after tap (phones and laptops).
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"flute" | "doors" | "done">("flute");
  const enteredRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      unlockAudio();
      setPhase("done");
    }
  }, [reduced]);

  const enter = () => {
    if (enteredRef.current || phase !== "flute") return;
    enteredRef.current = true;
    unlockAudio();
    setPhase("doors");
    window.setTimeout(() => setPhase("done"), 950);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] cursor-pointer touch-manipulation"
          onPointerDown={enter}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") enter();
          }}
          role="button"
          tabIndex={0}
          aria-label="Tap to enter the invitation"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {(["left", "right"] as const).map((side) => (
            <motion.div
              key={side}
              className="absolute inset-y-0 w-1/2"
              style={{
                [side]: 0,
                backgroundColor: "var(--pichwai-blue)",
                borderRight: side === "left" ? "2px solid var(--radha-gold)" : undefined,
                borderLeft: side === "right" ? "2px solid var(--radha-gold)" : undefined,
              }}
              animate={
                phase === "doors"
                  ? { x: side === "left" ? "-100%" : "100%" }
                  : { x: 0 }
              }
              transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
            />
          ))}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={phase === "doors" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <Flute width={220} />
              </motion.div>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="absolute font-display text-goldleaf"
                  style={{ left: 40 + i * 36, top: -6, fontSize: 13 + (i % 3) * 3 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: [0, 0.9, 0], y: -44 - (i % 2) * 16, x: i % 2 ? 10 : -8 }}
                  transition={{ duration: 1.4, delay: 0.5 + i * 0.16, ease: "easeOut" }}
                >
                  {i % 2 ? "♬" : "♪"}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {phase === "flute" && (
            <span className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 !text-goldleaf opacity-80">
              Tap to enter
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
