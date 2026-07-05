/** Lets the preloader (or any tap) unmute audio inside a user-gesture handler. */
type UnlockFn = () => void;

let unlockFn: UnlockFn | null = null;

export function setAudioUnlock(fn: UnlockFn) {
  unlockFn = fn;
}

export function unlockAudio() {
  unlockFn?.();
}
