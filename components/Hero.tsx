"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { config } from "@/config";
import Flute from "@/components/art/Flute";
import PeacockFeather from "@/components/art/PeacockFeather";
import LotusFlower from "@/components/art/LotusFlower";
import Fireflies from "@/components/motion/Fireflies";
import FloatingDiyas from "@/components/motion/FloatingDiyas";
import FeatherTrail from "@/components/motion/FeatherTrail";

/** Festive toran — mango leaves and marigold blooms strung across the top. */
function Toran({ reduced }: { reduced: boolean | null }) {
  const swagCount = 8;
  return (
    <motion.div
      aria-hidden="true"
      animate={reduced ? undefined : { y: [0, 4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 800 74"
        preserveAspectRatio="none"
        className="h-12 w-full sm:h-16"
      >
        <path d="M0 6 H800" stroke="var(--radha-gold)" strokeWidth="3" />
        {Array.from({ length: swagCount }, (_, i) => {
          const x = i * 100 + 50;
          return (
            <g key={i}>
              {[-26, -13, 0, 13, 26].map((dx, j) => (
                <path
                  key={dx}
                  d={`M${x + dx} 8 q ${dx * 0.12} ${16 + (j === 2 ? 8 : 0)} 0 ${26 + (j === 2 ? 10 : 0)} q ${6 - Math.abs(dx) * 0.1} -10 0 -${26 + (j === 2 ? 10 : 0)}`}
                  fill="var(--morpankh-emerald)"
                  opacity={j === 2 ? 1 : 0.85}
                />
              ))}
              <circle cx={x} cy={50} r="7" fill="var(--radha-gold)" />
              <circle cx={x} cy={50} r="4" fill="var(--sindoor)" opacity="0.85" />
              <circle cx={x} cy={50} r="1.8" fill="var(--gold-leaf)" />
            </g>
          );
        })}
        {Array.from({ length: swagCount + 1 }, (_, i) => (
          <circle key={i} cx={i * 100} cy={6} r="5" fill="var(--sindoor)" />
        ))}
      </svg>
    </motion.div>
  );
}

/** Sharad Purnima moon — warm gold-cream orb with a pulsing halo. */
function Moon({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="relative">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 230,
          height: 230,
          background:
            "radial-gradient(circle, rgba(242,201,76,0.35) 0%, rgba(242,201,76,0.12) 45%, transparent 70%)",
        }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="relative h-28 w-28 rounded-full sm:h-36 sm:w-36"
        style={{
          background: "radial-gradient(circle at 38% 35%, #FFFDF4 0%, #FBEFC5 55%, #F2D98A 100%)",
          boxShadow:
            "0 0 55px 20px rgba(242,201,76,0.4), 0 0 130px 60px rgba(242,201,76,0.12)",
        }}
      >
        <span className="absolute left-[24%] top-[30%] h-4 w-5 rounded-full bg-pichwai opacity-[0.10]" />
        <span className="absolute left-[56%] top-[54%] h-3 w-3 rounded-full bg-pichwai opacity-[0.08]" />
      </div>
      {/* thin gold ring */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[8.6rem] w-[8.6rem] -translate-x-1/2 -translate-y-1/2 rounded-full border sm:h-[10.6rem] sm:w-[10.6rem]"
        style={{ borderColor: "rgba(242,201,76,0.4)" }}
      />
    </div>
  );
}

/** Deterministic field of twinkling stars. */
function Stars() {
  const stars = Array.from({ length: 22 }, (_, i) => {
    const seed = (i * 61.8) % 100;
    return {
      left: `${(seed * 0.97) % 96}%`,
      top: `${4 + ((seed * 1.63) % 55)}%`,
      size: 1.5 + (i % 3),
      delay: (i % 7) * 0.45,
    };
  });
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Kadamba tree — emerald canopy with hanging gold blossom balls. */
function KadambaTree({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 300" className={className} aria-hidden="true">
      <g fill="var(--morpankh-emerald)">
        <path d="M104 300 c2 -60 0 -120 -6 -170 l16 0 c-6 50 -8 110 -6 170 Z" />
        <path d="M100 140 C70 150 50 130 55 105 C30 108 20 85 35 68 C25 45 45 28 68 34 C72 12 100 4 118 18 C140 4 170 14 172 40 C196 42 204 68 188 84 C202 100 190 124 168 122 C166 144 130 152 112 138 Z" />
      </g>
      <g fill="var(--peacock-teal)" opacity="0.35">
        <circle cx="80" cy="55" r="16" />
        <circle cx="145" cy="45" r="14" />
        <circle cx="115" cy="90" r="18" />
      </g>
      {[
        { x: 66, y: 148 },
        { x: 128, y: 160 },
        { x: 172, y: 140 },
      ].map((b) => (
        <g key={b.x}>
          <path
            d={`M${b.x} ${b.y - 18} L${b.x} ${b.y - 5}`}
            stroke="var(--radha-gold)"
            strokeWidth="1.2"
            opacity="0.8"
          />
          <circle cx={b.x} cy={b.y} r="5" fill="var(--gold-leaf)" />
          <g stroke="var(--gold-leaf)" strokeWidth="0.9" opacity="0.7">
            <path d={`M${b.x - 6.5} ${b.y} L${b.x - 9} ${b.y}`} />
            <path d={`M${b.x + 6.5} ${b.y} L${b.x + 9} ${b.y}`} />
            <path d={`M${b.x} ${b.y + 6.5} L${b.x} ${b.y + 9}`} />
            <path d={`M${b.x - 4.6} ${b.y + 4.6} L${b.x - 6.4} ${b.y + 6.4}`} />
            <path d={`M${b.x + 4.6} ${b.y + 4.6} L${b.x + 6.4} ${b.y + 6.4}`} />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** Horizon of temple silhouettes with lit finials and fluttering flags. */
function TempleHorizon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 60 L0 48 H70
           L78 40 Q86 28 94 40 L102 48 H160
           L170 44 L176 20 L182 44 L192 48 H280
           L290 38 Q302 22 314 38 L324 48 H420
           L428 42 L434 26 L440 42 L448 48 H540
           L552 40 Q562 26 572 40 L582 48 H660
           L668 44 L674 30 L680 44 L688 48 H800 L800 60 Z"
        fill="#0A0F26"
      />
      <g stroke="var(--gold-leaf)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M86 28 L86 22" />
        <path d="M302 22 L302 16" />
        <path d="M562 26 L562 20" />
        <path d="M176 20 L176 15" />
        <path d="M434 26 L434 21" />
      </g>
      <g fill="var(--sindoor)">
        <path d="M86 22 l10 3 l-10 3 Z" />
        <path d="M302 16 l10 3 l-10 3 Z" />
        <path d="M562 20 l10 3 l-10 3 Z" />
      </g>
      {/* warm window lights */}
      <g fill="var(--gold-leaf)" opacity="0.8">
        <rect x="84" y="42" width="4" height="5" rx="1" />
        <rect x="300" y="41" width="4" height="6" rx="1" />
        <rect x="560" y="42" width="4" height="5" rx="1" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax — moon drifts slowest, lotuses fastest.
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const lotusY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      aria-label="Invitation hero"
    >
      <Stars />

      {/* ─ Festive toran across the top ─ */}
      <div className="absolute left-0 top-0 z-20 w-full">
        <Toran reduced={reduced} />
      </div>

      {/* ─ Full moon — smaller on phones so it doesn't crowd the copy ─ */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: moonY }}
        className="absolute right-[2%] top-[8%] scale-75 sm:right-[6%] sm:top-[11%] sm:scale-100"
      >
        <Moon reduced={reduced} />
      </motion.div>

      {/* ─ Kadamba tree — tucked off-screen on narrow phones ─ */}
      <KadambaTree className="absolute -left-20 bottom-[21%] w-36 sm:-left-14 sm:w-40 md:left-0 md:bottom-[22%] md:w-64" />

      {/* ─ Temple-dome horizon ─ */}
      <TempleHorizon className="absolute bottom-[24%] left-0 h-10 w-full sm:h-14" />

      {/* ─ Yamuna water ─ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[24%]"
        style={{
          background:
            "linear-gradient(180deg, var(--yamuna-day) 0%, #182a63 100%)",
        }}
      >
        {/* moonlight glints */}
        <svg viewBox="0 0 800 160" preserveAspectRatio="none" className="h-full w-full">
          <g stroke="var(--gold-leaf)" strokeWidth="1.6" strokeLinecap="round" opacity="0.5">
            <path d="M560 30 h80" />
            <path d="M580 52 h50" />
            <path d="M565 74 h68" />
            <path d="M590 96 h36" />
          </g>
          <g stroke="var(--peacock-teal)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5">
            <path d="M60 44 q30 -8 60 0" fill="none" />
            <path d="M240 84 q30 -8 60 0" fill="none" />
            <path d="M420 60 q30 -8 60 0" fill="none" />
            <path d="M130 120 q30 -8 60 0" fill="none" />
            <path d="M620 128 q30 -8 60 0" fill="none" />
          </g>
        </svg>

        {/* lotuses on the water — parallax layer */}
        <motion.div
          aria-hidden="true"
          style={reduced ? undefined : { y: lotusY }}
          className="absolute inset-0"
        >
          <LotusFlower white size={54} className="absolute bottom-[38%] left-[8%]" />
          <LotusFlower size={40} className="absolute bottom-[16%] left-[30%]" />
          <LotusFlower white size={46} className="absolute bottom-[52%] right-[26%]" />
          <LotusFlower size={58} className="absolute bottom-[10%] right-[7%]" />
        </motion.div>

        <FloatingDiyas />
      </div>

      {/* ─ Floating bansuri with tied feather ─ */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[3%] top-[12%] scale-75 sm:left-[12%] sm:top-[20%] sm:scale-100"
        style={{ rotate: -24 }}
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <Flute width={190} className="sm:hidden" />
          <Flute width={250} className="hidden sm:block" />
          <motion.div
            className="absolute -left-3 top-3 origin-top"
            animate={reduced ? undefined : { rotate: [-6, 7, -6] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <PeacockFeather width={34} />
          </motion.div>
          <span
            className="absolute -left-1 top-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--sindoor)" }}
          />
        </div>
      </motion.div>

      <Fireflies count={isMobile ? 4 : 8} />
      {!isMobile && <FeatherTrail />}

      {/* ─ Copy ─ */}
      <motion.div
        style={reduced ? undefined : { y: copyY }}
        className="relative z-10 mt-[10vh] flex flex-col items-center px-4 text-center sm:mt-[12vh] sm:px-6"
      >
        <motion.p
          lang="hi"
          className="gold-shimmer font-deva-display text-3xl sm:text-4xl md:text-5xl"
          style={{ textShadow: "0 0 32px rgba(242,201,76,0.4)" }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.3 }}
        >
          {config.devanagari.hero.text}
        </motion.p>

        <motion.p
          className="mt-3 font-body text-sm font-medium uppercase tracking-label text-goldleaf sm:text-base"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.4 }}
        >
          {config.devanagari.hero.translation}
        </motion.p>

        <motion.p
          className="mt-5 font-display text-lg italic text-moonlight/90 sm:text-xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.5 }}
        >
          {config.heroTagline}
        </motion.p>

        <motion.p
          className="mt-8 font-display text-lg italic text-moonlight/85 sm:text-xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.65 }}
        >
          You are lovingly invited to the
        </motion.p>

        <motion.h1
          className="gold-shimmer mt-3 font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          {config.eventType}
        </motion.h1>

        <motion.p
          className="mt-4 font-display text-xl italic text-moonlight sm:text-2xl md:text-3xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.95 }}
        >
          of {config.motherName}
        </motion.p>

        <motion.p
          className="mt-6 max-w-[18rem] text-[0.8rem] font-medium uppercase leading-relaxed tracking-label text-moonlight/70 sm:mt-8 sm:max-w-none sm:text-[0.9rem]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 3.2 }}
        >
          {config.dateDisplay}
        </motion.p>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
          <path
            d="M9 4 V20 M4 15 L9 21 L14 15"
            stroke="var(--gold-leaf)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
