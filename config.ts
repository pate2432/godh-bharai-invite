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
    details: { text: string; translation: string };
    rsvp: { text: string; translation: string };
    footer: { text: string; translation: string };
  };

  /** Gujarati blessing beneath the jhula */
  jhulaMessage: {
    opening: string;
    bodyLines: string[];
    closing: string;
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

  /** Second-screen host photo + personal message */
  hostNote: {
    /** Photo in /public, e.g. "/host.jpg". Leave empty to hide the image. */
    photoSrc: string;
    photoAlt: string;
    heading: string;
    lines: string[];
    signature: string;
    devanagari: { text: string; translation: string };
  };
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
    hero: { text: "જય સ્વામિનારાયણ", translation: "Radhe Krishna" },
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

  jhulaMessage: {
    opening: "દાંપત્ય જીવનની સૌથી સુંદર અને સમૃદ્ધ ઘડી એટલે માતૃત્વ.",
    bodyLines: [
      "પ્રથમ માતૃત્વની ગૌરવવંતી અને મંગલમય પળને",
      "પરિવારજનોના પ્રેમ, વડીલોના આશીર્વાદ અને સ્વજનોની શુભેચ્છાઓથી ઉજવવાનો પવિત્ર પ્રસંગ એટલે—",
    ],
    closing: "સીમંત સંસ્કાર.",
  },

  audioSrc: "/music.mp3",

  siteUrl: "https://godh-bharai-invite.netlify.app",

  footerCredit: "awaiting our little Radha/Krishna",

  hostNote: {
    photoSrc: "/host.jpg",
    photoAlt: "Naitik and Krupa",
    heading: "A note from us",
    lines: [
      "We are so thrilled to welcome you as we celebrate the upcoming arrival of our little Radha/Krishna.",
      "Your love, laughter, and blessings mean the world to us on this beautiful journey.",
      "We cannot wait to share this special day with you surrounded by the people we cherish most.",
      "Thank you for being part of our story.",
    ],
    signature: "With love, Naitik & Krupa",
    devanagari: {
      text: "प्रेम सहित",
      translation: "With love",
    },
  },
};
