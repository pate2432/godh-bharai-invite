"use client";

import { config } from "@/config";
import { downloadIcs } from "@/lib/ics";
import ArchFrame from "@/components/art/ArchFrame";
import Reveal from "@/components/motion/Reveal";

function Plaque({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 font-display text-xl leading-snug text-moonlight sm:text-2xl">
        {children}
      </dd>
    </div>
  );
}

export default function Details() {
  return (
    <section id="details" className="px-4 py-8 sm:px-5" aria-label="Event details">
      <Reveal>
        <div className="mb-10 text-center">
          <p lang="gu" className="font-guj text-2xl text-goldleaf">
            {config.devanagari.details.text}
          </p>
          <p className="eyebrow mt-2 !text-moonlight/50">
            {config.devanagari.details.translation}
          </p>
        </div>
      </Reveal>

      <Reveal order={1}>
        <ArchFrame>
          <div className="py-10 text-center">
            <h2 className="font-display text-3xl text-goldleaf sm:text-4xl">
              The Celebration
            </h2>
            <p className="mt-2 font-display italic text-moonlight/70">
              when, where & everything you need
            </p>

            <dl className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-x-10 gap-y-8 text-left sm:grid-cols-2">
              <Plaque label="When">{config.dateDisplay}</Plaque>
              <Plaque label="Timings">{config.timings}</Plaque>
              <Plaque label="Where">
                {config.venueName}
                <span className="mt-1 block break-words font-body text-sm text-moonlight/70">
                  {config.venueAddress}
                </span>
                <a
                  href={config.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-body text-xs uppercase tracking-label text-goldleaf underline decoration-goldleaf/40 underline-offset-4 hover:decoration-goldleaf"
                >
                  Get directions ↗
                </a>
              </Plaque>
              <Plaque label="Hosted by">{config.hostLine}</Plaque>
              <Plaque label="Dress code">{config.dressCode}</Plaque>
              {config.registryNote && (
                <Plaque label="Blessings">
                  <span className="font-display text-lg italic text-moonlight/80">
                    {config.registryNote}
                  </span>
                </Plaque>
              )}
            </dl>

            <button
              type="button"
              onClick={() => downloadIcs(config)}
              className="mt-12 inline-flex items-center gap-2 border border-gold px-6 py-3 font-body text-xs uppercase tracking-label text-goldleaf transition-colors hover:bg-gold hover:text-night"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="2.5" width="12" height="10.5" rx="1.5" stroke="currentColor" />
                <path d="M1 5.5 H13 M4.5 1 V4 M9.5 1 V4" stroke="currentColor" strokeLinecap="round" />
              </svg>
              Add to calendar
            </button>
          </div>
        </ArchFrame>
      </Reveal>
    </section>
  );
}
