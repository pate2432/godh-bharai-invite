"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Flute from "@/components/art/Flute";
import { setEntranceLocked } from "@/lib/entranceLock";
import { unlockAudio } from "@/lib/unlockAudio";

type PreloaderProps = {
  onEntered: () => void;
};

/**
 * Full-screen entrance — always waits for a deliberate tap.
 * Works the same on refresh, iOS, Android, and desktop.
 */
export default function Preloader({ onEntered }: PreloaderProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"flute" | "doors">("flute");
  const [show, setShow] = useState(true);
  const enteredRef = useRef(false);

  useEffect(() => {
    setEntranceLocked(true);
    return () => setEntranceLocked(false);
  }, []);

  const beginExit = useCallback(() => {
    setEntranceLocked(false);
    setShow(false);
  }, []);

  const enter = useCallback(
    (event?: { isTrusted?: boolean }) => {
      if (enteredRef.current) return;
      if (event && "isTrusted" in event && event.isTrusted === false) return;

      enteredRef.current = true;
      unlockAudio();

      if (reduced) {
        beginExit();
        return;
      }

      setPhase("doors");
      window.setTimeout(beginExit, 950);
    },
    [beginExit, reduced],
  );

  return (
    <AnimatePresence onExitComplete={onEntered}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] cursor-pointer touch-manipulation select-none"
          onPointerUp={(e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            enter(e.nativeEvent);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              enter(e.nativeEvent);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Tap to enter the invitation"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
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
                initial={reduced ? false : { opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <Flute width={220} />
              </motion.div>
              {!reduced &&
                [0, 1, 2, 3, 4].map((i) => (
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
