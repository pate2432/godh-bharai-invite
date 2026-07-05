"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Flute from "@/components/art/Flute";
import { unlockAudio } from "@/lib/unlockAudio";

/**
 * Loading moment (max 2.5s, skippable): gold flute fades in, five
 * note-glyphs drift up like fireflies, then temple doors slide apart.
 * Under prefers-reduced-motion we skip straight to the hero.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"flute" | "doors" | "done">("flute");

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      return;
    }
    const doorsTimer = window.setTimeout(() => setPhase("doors"), 1600);
    const doneTimer = window.setTimeout(() => setPhase("done"), 2500);
    return () => {
      window.clearTimeout(doorsTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduced]);

  const skip = () => {
    unlockAudio(); // preloader tap unlocks sound on iOS
    setPhase("done");
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] cursor-pointer touch-manipulation"
          onClick={skip}
          onTouchEnd={(e) => {
            e.preventDefault();
            skip();
          }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          aria-hidden="true"
        >
          {/* Two temple-door panels */}
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

          {/* Flute + drifting notes, centered over the doors */}
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
