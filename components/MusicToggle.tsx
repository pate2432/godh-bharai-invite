"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/config";
import { setAudioUnlock } from "@/lib/unlockAudio";

function prefersTouch(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

/** Speaker with slash — music is muted */
function SpeakerOff() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M3 7.5 h3.5 L10.5 4 v12 L6.5 12.5 H3 Z"
        fill="var(--gold-leaf)"
        opacity="0.55"
      />
      <path
        d="M13 7 L17 13 M17 7 L13 13"
        stroke="var(--gold-leaf)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Background music — plays with sound on open (desktop) or on
 * "Tap to enter" (phones). play() runs synchronously inside the tap handler.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audible, setAudible] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const syncState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudible(!audio.paused && !audio.muted && audio.volume > 0);
  }, []);

  /** Call inside a user-gesture handler — play() must start synchronously. */
  const unlock = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 1;

    const attempt = audio.play();
    if (attempt) {
      attempt
        .then(() => syncState())
        .catch(() => {
          audio.muted = true;
          audio
            .play()
            .then(() => {
              audio.muted = false;
              return audio.play();
            })
            .then(() => syncState())
            .catch(() => syncState());
        });
    } else {
      syncState();
    }
  }, [syncState]);

  const tryAutoplay = useCallback(() => {
    if (prefersTouch()) return;
    unlock();
  }, [unlock]);

  useEffect(() => {
    if (!config.audioSrc) {
      setShowButton(false);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    const onError = () => setShowButton(false);
    const onReady = () => tryAutoplay();

    audio.addEventListener("error", onError);
    audio.addEventListener("canplay", onReady);
    audio.load();

    setAudioUnlock(unlock);
    tryAutoplay();

    const retry = window.setInterval(() => {
      if (prefersTouch()) return;
      if (!audio.paused && !audio.muted) {
        window.clearInterval(retry);
        return;
      }
      tryAutoplay();
    }, 600);
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 10000);

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("canplay", onReady);
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
      setAudioUnlock(() => {});
      audio.pause();
    };
  }, [tryAutoplay, unlock]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.muted || audio.paused) {
      unlock();
    } else {
      audio.muted = true;
      syncState();
    }
  };

  if (!config.audioSrc) return null;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={config.audioSrc}
        loop
        preload="auto"
        playsInline
        className="hidden"
        aria-hidden="true"
      />
      {showButton && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={audible}
          aria-label={audible ? "Mute music" : "Unmute music"}
          className="safe-floating touch-target fixed z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold shadow-lg transition-transform active:scale-95 sm:h-12 sm:w-12 sm:hover:scale-105"
          style={{ backgroundColor: "rgba(13, 21, 51, 0.9)" }}
        >
          {audible ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    backgroundColor: "var(--gold-leaf)",
                    animation: `musicbar 0.9s ease-in-out ${i * 0.15}s infinite alternate`,
                  }}
                />
              ))}
            </span>
          ) : (
            <SpeakerOff />
          )}
        </button>
      )}
    </>
  );
}
