"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/config";
import { setAudioUnlock } from "@/lib/unlockAudio";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
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
 * Background music — plays with sound on open.
 * iOS/Safari needs a tap first; the preloader "Tap to enter" unlocks it.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audible, setAudible] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const unlockedRef = useRef(false);

  const syncState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudible(!audio.paused && !audio.muted);
  }, []);

  const playAudible = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.muted = false;
    audio.volume = 1;
    try {
      await audio.play();
      syncState();
      return !audio.muted && !audio.paused;
    } catch {
      return false;
    }
  }, [syncState]);

  const unlock = useCallback(async () => {
    if (unlockedRef.current) {
      await playAudible();
      return;
    }
    unlockedRef.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 1;

    if (await playAudible()) return;

    // Last resort: start muted, then unmute in the same gesture stack (iOS)
    audio.muted = true;
    try {
      await audio.play();
      audio.muted = false;
      syncState();
    } catch {
      /* browser blocked playback */
    }
  }, [playAudible, syncState]);

  const startDesktopAutoplay = useCallback(async () => {
    if (isIOS()) return;

    if (await playAudible()) return;

    // Brief muted start, then immediately unmute (Chrome sometimes needs this)
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    try {
      await audio.play();
      audio.muted = false;
      await audio.play();
      syncState();
    } catch {
      /* will retry */
    }
  }, [playAudible, syncState]);

  useEffect(() => {
    if (!config.audioSrc) {
      setShowButton(false);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    const onError = () => setShowButton(false);
    const onReady = () => {
      void startDesktopAutoplay();
      if (isIOS()) setAudioUnlock(() => void unlock());
    };

    audio.addEventListener("error", onError);
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("canplaythrough", onReady);
    audio.load();

    void startDesktopAutoplay();
    setAudioUnlock(() => void unlock());

    const retry = window.setInterval(() => {
      if (unlockedRef.current || isIOS()) return;
      void startDesktopAutoplay();
    }, 500);
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 8000);

    const onInteract = () => void unlock();
    document.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    document.addEventListener("keydown", onInteract, { once: true });

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("canplaythrough", onReady);
      document.removeEventListener("pointerdown", onInteract);
      document.removeEventListener("keydown", onInteract);
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
      setAudioUnlock(() => {});
      audio.pause();
      unlockedRef.current = false;
    };
  }, [startDesktopAutoplay, unlock]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.muted || audio.paused) {
      unlockedRef.current = true;
      await unlock();
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
        autoPlay
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
