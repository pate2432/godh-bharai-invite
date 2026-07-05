"use client";

import Image from "next/image";
import { useState } from "react";
import { config } from "@/config";
import ArchFrame from "@/components/art/ArchFrame";
import Reveal from "@/components/motion/Reveal";

/** Second screen — host photo + a short personal message. */
export default function HostNote() {
  const { hostNote } = config;
  const [photoError, setPhotoError] = useState(false);
  const showPhoto = hostNote.photoSrc && !photoError;

  return (
    <section
      id="host-note"
      className="flex min-h-[100svh] items-center px-4 py-12 sm:px-6 sm:py-16"
      aria-label="A note from the hosts"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="mb-8 text-center sm:mb-10">
            <p lang="hi" className="font-deva text-2xl text-goldleaf">
              {hostNote.devanagari.text}
            </p>
            <p className="eyebrow mt-2 !text-moonlight/50">
              {hostNote.devanagari.translation}
            </p>
          </div>
        </Reveal>

        <Reveal order={1}>
          <ArchFrame>
            <div className="flex flex-col items-center gap-8 px-4 py-10 sm:gap-10 sm:px-8 sm:py-12 md:flex-row md:items-center md:gap-12">
              {showPhoto && (
                <div className="relative mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[280px] md:mx-0 md:max-w-[300px] lg:max-w-[340px]">
                  <div
                    className="relative aspect-[4/5] overflow-hidden rounded-t-[140px] border-2 border-gold shadow-[0_0_40px_rgba(242,201,76,0.15)]"
                    style={{ borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}
                  >
                    <Image
                      src={hostNote.photoSrc}
                      alt={hostNote.photoAlt}
                      fill
                      sizes="(max-width: 768px) 240px, 340px"
                      className="object-cover object-center"
                      priority
                      onError={() => setPhotoError(true)}
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 rounded-t-[148px] border border-gold/30"
                    style={{ borderBottomLeftRadius: "1.25rem", borderBottomRightRadius: "1.25rem" }}
                  />
                </div>
              )}

              <div className="max-w-xl text-center md:flex-1 md:text-left">
                <p className="eyebrow text-goldleaf">{hostNote.heading}</p>
                <div className="mt-5 space-y-4 font-display text-lg leading-relaxed text-moonlight/90 sm:text-xl sm:leading-relaxed">
                  {hostNote.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p className="mt-8 font-display text-xl italic text-goldleaf sm:text-2xl">
                  {hostNote.signature}
                </p>
              </div>
            </div>
          </ArchFrame>
        </Reveal>
      </div>
    </section>
  );
}
