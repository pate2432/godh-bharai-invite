"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Flute from "@/components/art/Flute";
import { unlockAudio } from "@/lib/unlockAudio";

function prefersTouch(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

/**
 * Loading moment: gold flute, temple doors, then enter.
 * Phones require a tap to enter (and start music). Desktop auto-enters.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"flute" | "doors" | "done">("flute");

  useEffect(() => {
    if (reduced) {
      unlockAudio();
      setPhase("done");
      return;
    }

    const doorsTimer = window.setTimeout(() => setPhase("doors"), 1600);

    // Desktop only — phones must tap (browser needs gesture for sound)
    let doneTimer: number | undefined;
    if (!prefersTouch()) {
      doneTimer = window.setTimeout(() => {
        unlockAudio();
        setPhase("done");
      }, 2500);
    }

    return () => {
      window.clearTimeout(doorsTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, [reduced]);

  const enter = () => {
    unlockAudio();
    setPhase("done");
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] cursor-pointer touch-manipulation"
          onPointerDown={enter}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          aria-hidden="true"
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

          <span className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 !text-goldleaf opacity-80">
            Tap to enter
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
