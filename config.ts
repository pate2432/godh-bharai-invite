/**
 * ─────────────────────────────────────────────────────────────
 *  INVITATION CONTENT — edit everything about the event here.
 *  No other file needs to change for names, dates, or copy.
 * ─────────────────────────────────────────────────────────────
 */

export type EventType = "Godh Bharai" | "Baby Shower" | "Seemantham";

export interface InviteConfig {
  /** "Godh Bharai" | "Baby Shower" | "Seemantham" — used in the hero headline */
  eventType: EventType;
  motherName: string;
  hostLine: string;

  /** Event date/time — used for display AND the .ics calendar file */
  dateDisplay: string;
  timings: string;
  /** ISO start/end for the calendar file (local time of the venue) */
  startISO: string;
  endISO: string;

  venueName: string;
  venueAddress: string;
  /** Full Google Maps link for the "Get directions" button */
  mapUrl: string;

  dressCode: string;
  /** Leave empty string to hide the registry/blessings note */
  registryNote: string;

  /** Devanagari accent lines with translations (per section) */
  devanagari: {
    hero: { text: string; translation: string };
    jhula: { text: string; translation: string };
    details: { text: string; translation: string };
    rsvp: { text: string; translation: string };
    footer: { text: string; translation: string };
  };

  /** Hero sub-line below the Devanagari greeting */
  heroTagline: string;

  /** Shown on the RSVP success screen — "Your blessing has reached …" */
  rsvpSuccessTo: string;

  /**
   * Background music file served from /public (e.g. "/music.mp3").
   * Leave empty string to hide the music toggle.
   */
  audioSrc: string;

  /** Absolute site URL once deployed — used in OG tags */
  siteUrl: string;

  /** Footer credit line at the very bottom */
  footerCredit: string;
}

export const config: InviteConfig = {
  eventType: "Baby Shower",
  motherName: "Krupa",
  hostLine: "With love, the Patel family",

  dateDisplay: "Sunday, September 6th, 2026",
  timings: "9:30 AM onwards",
  startISO: "2026-09-06T09:30:00",
  endISO: "2026-09-06T14:00:00",

  venueName: "Royal Indian Banquets",
  venueAddress: "31 Melanie Dr, Brampton, ON L6T 5H8",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Royal+Indian+Banquets,+31+Melanie+Dr,+Brampton,+ON+L6T+5H8",

  dressCode: "Shades of blue & pink (only if possible and available)",
  registryNote:
    "Your presence is the only gift we wish for — your blessings, the only registry.",

  devanagari: {
    hero: { text: "राधे राधे", translation: "Radhe Radhe" },
    jhula: {
      text: "नन्द के आनंद भयो",
      translation: "Joy has come to the house of Nanda",
    },
    details: { text: "जय श्री कृष्ण", translation: "Jai Shri Krishna" },
    rsvp: {
      text: "आशीर्वाद दीजिये",
      translation: "Bestow your blessings",
    },
    footer: {
      text: "जय कन्हैया लाल की",
      translation: "Victory to the beloved of Nanda",
    },
  },

  heroTagline: "A little Radha/Krishna is on the way",
  rsvpSuccessTo: "Naitik & Krupa",

  audioSrc: "/music.mp3",

  siteUrl: "https://godh-bharai-invite.vercel.app",

  footerCredit: "awaiting our little Radha/Krishna",
};
