"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { config } from "@/config";
import Fireflies from "@/components/motion/Fireflies";
import Reveal from "@/components/motion/Reveal";

/** A falling marigold petal (genda phool). */
function MarigoldPetal({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-1/2 top-[56%]"
      initial={{ opacity: 1, x, y: 0, rotate: 0 }}
      animate={{ opacity: 0, y: 180 + Math.abs(x), x: x * 2.2, rotate: x > 0 ? 160 : -160 }}
      transition={{ duration: 1.8, delay, ease: [0.3, 0.6, 0.6, 1] }}
    >
      <svg width="12" height="14" viewBox="0 0 12 14">
        <path
          d="M6 0 C10 3 11.5 8 6 14 C0.5 8 2 3 6 0 Z"
          fill="var(--radha-gold)"
        />
        <path
          d="M6 2 C8.5 4.5 9 8 6 12 C3 8 3.5 4.5 6 2 Z"
          fill="var(--sindoor)"
          opacity="0.65"
        />
      </svg>
    </motion.span>
  );
}

/** The golden cradle-swing with garlanded ropes, drawn once and rotated as a pendulum. */
function CradleSwing() {
  // Marigold garland beads wrapped along each rope
  const garland = (x: number) =>
    Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <circle
          cx={x + (i % 2 === 0 ? -2.4 : 2.4)}
          cy={16 + i * 13}
          r="3.1"
          fill={i % 2 === 0 ? "var(--radha-gold)" : "var(--sindoor)"}
        />
        <circle
          cx={x + (i % 2 === 0 ? -2.4 : 2.4)}
          cy={16 + i * 13}
          r="1.3"
          fill="var(--gold-leaf)"
          opacity="0.8"
        />
      </g>
    ));

  return (
    <svg viewBox="0 0 240 220" className="w-52 sm:w-64 md:w-80" aria-hidden="true">
      {/* ropes */}
      <path d="M70 0 L74 132" stroke="var(--radha-gold)" strokeWidth="2.2" fill="none" />
      <path d="M170 0 L166 132" stroke="var(--radha-gold)" strokeWidth="2.2" fill="none" />
      {garland(72)}
      {garland(168)}

      {/* cradle body */}
      <g>
        {/* canopy hoop */}
        <path
          d="M62 138 C62 116 178 116 178 138"
          fill="none"
          stroke="var(--gold-leaf)"
          strokeWidth="2"
        />
        {/* basin */}
        <path
          d="M56 140 H184 C182 168 158 184 120 184 C82 184 58 168 56 140 Z"
          fill="var(--radha-gold)"
        />
        <path
          d="M56 140 H184 C183 150 176 158 166 164 H74 C64 158 57 150 56 140 Z"
          fill="var(--gold-leaf)"
          opacity="0.45"
        />
        {/* engraved rim */}
        <path
          d="M60 146 H180"
          stroke="var(--yamuna-night)"
          strokeWidth="1"
          opacity="0.35"
        />
        {/* lotus boss on the cradle front */}
        <path
          d="M120 158 C124 162 124 168 120 173 C116 168 116 162 120 158 Z"
          fill="var(--lotus-pink)"
        />
        {/* hanging bells */}
        {[76, 120, 164].map((x) => (
          <g key={x}>
            <path d={`M${x} 184 L${x} 192`} stroke="var(--gold-leaf)" strokeWidth="1.2" />
            <circle cx={x} cy={196} r="3.4" fill="var(--gold-leaf)" />
          </g>
        ))}
        {/* pillow */}
        <ellipse cx="120" cy="140" rx="44" ry="9" fill="var(--moonlight)" opacity="0.92" />
        {/* tiny peacock feather resting on the pillow */}
        <g transform="translate(112 128) rotate(-18)">
          <path
            d="M8 12 C4 9 3 5 4 1"
            stroke="var(--morpankh-emerald)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="8" cy="11" rx="4" ry="5" fill="var(--morpankh-emerald)" />
          <ellipse cx="8" cy="11.5" rx="2.6" ry="3.3" fill="var(--peacock-teal)" />
          <ellipse cx="8" cy="12" rx="1.2" ry="1.6" fill="var(--radha-gold)" />
        </g>
      </g>
    </svg>
  );
}

/** Full-width kadamba canopy arching over the swing. */
function KadambaCanopy() {
  return (
    <svg
      viewBox="0 0 800 130"
      preserveAspectRatio="none"
      className="h-24 w-full sm:h-32"
      aria-hidden="true"
    >
      <path
        d="M0 0 H800 V44 C740 74 680 58 620 76 C560 94 500 70 440 84 C420 89 380 89 360 84 C300 70 240 94 180 76 C120 58 60 74 0 44 Z"
        fill="var(--morpankh-emerald)"
      />
      {/* kadamba blossom balls hanging on stems from the foliage */}
      {[90, 210, 330, 470, 590, 710].map((x, i) => {
        const drop = 46 + (i % 3) * 10;
        return (
          <g key={x}>
            <path
              d={`M${x} ${drop} L${x} ${drop + 22}`}
              stroke="var(--radha-gold)"
              strokeWidth="1"
              opacity="0.55"
            />
            <circle
              cx={x}
              cy={drop + 27}
              r="4.5"
              fill="var(--radha-gold)"
              opacity="0.9"
            />
            {/* stamen fuzz — short radiating strokes, so it reads as a kadamba ball */}
            <g stroke="var(--gold-leaf)" strokeWidth="0.7" opacity="0.6">
              <path d={`M${x - 6} ${drop + 27} L${x - 8.5} ${drop + 27}`} />
              <path d={`M${x + 6} ${drop + 27} L${x + 8.5} ${drop + 27}`} />
              <path d={`M${x} ${drop + 33} L${x} ${drop + 35.5}`} />
              <path d={`M${x - 4.2} ${drop + 31.5} L${x - 6} ${drop + 33.5}`} />
              <path d={`M${x + 4.2} ${drop + 31.5} L${x + 6} ${drop + 33.5}`} />
              <path d={`M${x - 4.2} ${drop + 22.5} L${x - 6} ${drop + 20.5}`} />
              <path d={`M${x + 4.2} ${drop + 22.5} L${x + 6} ${drop + 20.5}`} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default function Jhula() {
  const reduced = useReducedMotion();
  const [pushId, setPushId] = useState(0);
  const [pushing, setPushing] = useState(false);

  const push = () => {
    if (reduced || pushing) return;
    setPushing(true);
    setPushId((n) => n + 1);
    window.setTimeout(() => setPushing(false), 3000);
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-label="The jhula — a cradle awaits"
    >
      <KadambaCanopy />
      {/* warm glow pooling behind the cradle */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(242,201,76,0.16) 0%, transparent 70%)",
        }}
      />
      <Fireflies count={6} />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-20">
        {/* Swing, hung from the canopy */}
        <motion.button
          type="button"
          onClick={push}
          aria-label="Give the cradle a gentle push"
          className="-mt-12 origin-top cursor-pointer border-0 bg-transparent p-0 sm:-mt-14 md:-mt-20"
          style={{ transformOrigin: "top center" }}
          animate={
            reduced
              ? undefined
              : pushing
                ? { rotate: [0, 9, -8.5, 6, -4, 2.6] }
                : { rotate: [2.6, -2.6, 2.6] }
          }
          transition={
            pushing
              ? { duration: 3, ease: "easeInOut" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {/* slight rope flex — the swing body breathes against the ropes */}
          <motion.div
            animate={reduced ? undefined : { scaleY: [1, 1.008, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="origin-top"
          >
            <CradleSwing />
          </motion.div>
        </motion.button>

        {/* Falling marigold petals on push */}
        <AnimatePresence>
          {pushId > 0 && (
            <motion.div key={pushId} className="pointer-events-none absolute inset-0">
              {[-46, -22, -4, 14, 34, 52].map((x, i) => (
                <MarigoldPetal key={x} x={x} delay={i * 0.12} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal className="mt-14 max-w-2xl text-center">
          <p
            lang="gu"
            className="font-guj text-xl font-semibold leading-relaxed text-goldleaf sm:text-2xl"
          >
            {config.jhulaMessage.opening}
          </p>

          <div
            className="mx-auto my-7 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-gold/40 sm:w-14" />
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="rounded-full bg-goldleaf"
                style={{ width: i === 1 ? 7 : 5, height: i === 1 ? 7 : 5, opacity: i === 1 ? 1 : 0.55 }}
              />
            ))}
            <span className="h-px w-10 bg-gold/40 sm:w-14" />
          </div>

          <div
            lang="gu"
            className="font-guj space-y-2 text-base leading-loose text-moonlight/88 sm:text-lg sm:leading-loose"
          >
            {config.jhulaMessage.bodyLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <p
            lang="gu"
            className="mt-8 font-guj text-2xl font-bold tracking-wide text-goldleaf sm:text-3xl"
          >
            {config.jhulaMessage.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
