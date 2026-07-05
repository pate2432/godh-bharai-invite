"use client";

import { motion, useReducedMotion } from "framer-motion";

function DiyaLamp({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 30 24" aria-hidden="true">
      <path d="M15 2 c2.4 3 3 5.5 0 8.5 c-3 -3 -2.4 -5.5 0 -8.5 Z" fill="var(--gold-leaf)" />
      <path d="M4 13 h22 c0 5 -5 8.5 -11 8.5 S4 18 4 13 Z" fill="var(--sindoor)" opacity="0.9" />
      <path d="M4 13 h22 c-1 1.6 -2.5 2.6 -4 3 h-14 c-1.5 -0.4 -3 -1.4 -4 -3 Z" fill="var(--radha-gold)" opacity="0.65" />
    </svg>
  );
}

/** 2–3 diyas drifting across the Yamuna, each with a soft pulsing glow. */
export default function FloatingDiyas() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const diyas = [
    { bottom: "9%", duration: 36, delay: 0, size: 26, bob: 6 },
    { bottom: "15%", duration: 46, delay: 9, size: 20, bob: 5 },
    { bottom: "5%", duration: 41, delay: 20, size: 30, bob: 7 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {diyas.map((d, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ bottom: d.bottom, left: "-8%" }}
          animate={{ x: ["0vw", "116vw"] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{ y: [0, -d.bob, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* pulsing glow */}
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
              style={{
                width: d.size * 1.8,
                height: d.size * 1.8,
                marginTop: -d.size * 0.5,
                background:
                  "radial-gradient(circle, rgba(242,201,76,0.35) 0%, rgba(242,201,76,0) 70%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <DiyaLamp size={d.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
