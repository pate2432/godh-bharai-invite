import type { ReactNode } from "react";

/**
 * Pichwai scalloped temple arch (mehrab) frame — the "darshan" framing
 * used on Nathdwara temple hangings. Drawn as a cusped arch band on top,
 * double gold side rails, and a scalloped sill below, so the frame
 * stretches gracefully with its content at any width.
 */
export default function ArchFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-3xl ${className}`}>
      {/* Cusped arch crown */}
      <svg
        viewBox="0 0 400 96"
        className="block w-full"
        aria-hidden="true"
        role="presentation"
      >
        <g fill="none" strokeLinecap="round">
          {/* outer stroke */}
          <path
            d="M8 96 L8 64
               C8 60 12 56 18 54
               C40 48 52 44 66 36
               C84 26 96 22 116 18
               C146 12 168 10 188 5
               Q200 2 212 5
               C232 10 254 12 284 18
               C304 22 316 26 334 36
               C348 44 360 48 382 54
               C388 56 392 60 392 64 L392 96"
            stroke="var(--radha-gold)"
            strokeWidth="2"
          />
          {/* inner stroke — thin double line */}
          <path
            d="M16 96 L16 68
               C16 65 19 62 24 60
               C45 54 57 50 71 42
               C89 32 100 28 120 24
               C149 18 170 16 190 11
               Q200 8.5 210 11
               C230 16 251 18 280 24
               C300 28 311 32 329 42
               C343 50 355 54 376 60
               C381 62 384 65 384 68 L384 96"
            stroke="var(--gold-leaf)"
            strokeWidth="0.8"
            opacity="0.7"
          />
          {/* cusps along the inner arch */}
          <path
            d="M60 52 q6 -8 12 0 M92 38 q6 -8 12 0 M126 27 q6 -8 12 0 M162 19 q6 -8 12 0 M226 19 q6 -8 12 0 M262 27 q6 -8 12 0 M296 38 q6 -8 12 0 M328 52 q6 -8 12 0"
            stroke="var(--radha-gold)"
            strokeWidth="1.2"
            opacity="0.85"
          />
          {/* kalash finial at the apex */}
          <circle cx="200" cy="6" r="2.4" fill="var(--gold-leaf)" stroke="none" />
          <path d="M200 8.5 L200 13" stroke="var(--gold-leaf)" strokeWidth="1" />
        </g>
      </svg>

      {/* Side rails + content */}
      <div
        className="relative border-x-2 px-4 py-2 sm:px-5 sm:py-2 md:px-10"
        style={{ borderColor: "var(--radha-gold)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-2 w-px opacity-70"
          style={{ backgroundColor: "var(--gold-leaf)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-2 w-px opacity-70"
          style={{ backgroundColor: "var(--gold-leaf)" }}
        />
        {children}
      </div>

      {/* Scalloped sill */}
      <svg viewBox="0 0 400 26" className="block w-full" aria-hidden="true">
        <path
          d="M8 0 L8 8 L392 8 L392 0"
          fill="none"
          stroke="var(--radha-gold)"
          strokeWidth="2"
        />
        <path
          d="M16 8 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0"
          fill="none"
          stroke="var(--gold-leaf)"
          strokeWidth="0.9"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}
