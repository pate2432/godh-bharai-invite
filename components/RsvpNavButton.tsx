"use client";

/** Scrolls to the RSVP form without putting #rsvp in the URL (so refresh stays at top). */
export default function RsvpNavButton() {
  const goToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goToRsvp}
      className="safe-top touch-target fixed right-4 z-50 rounded-full border border-gold px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-label text-goldleaf shadow-lg backdrop-blur-sm transition-colors active:bg-gold active:text-night sm:hover:bg-gold sm:hover:text-night"
      style={{ backgroundColor: "rgba(13, 21, 51, 0.92)" }}
    >
      RSVP
    </button>
  );
}
