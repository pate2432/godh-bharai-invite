/** Lock page scroll while the preloader is visible. */
export function setEntranceLocked(locked: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("entrance-locked", locked);
}
