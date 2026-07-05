import type { InviteConfig } from "@/config";

/** Build and download an .ics calendar file entirely client-side. */
export function downloadIcs(cfg: InviteConfig) {
  const fmt = (iso: string) => iso.replace(/[-:]/g, "").split(".")[0];

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//godh-bharai-invite//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@godh-bharai-invite`,
    `DTSTAMP:${fmt(new Date().toISOString())}Z`,
    `DTSTART:${fmt(cfg.startISO)}`,
    `DTEND:${fmt(cfg.endISO)}`,
    `SUMMARY:${cfg.eventType} of ${cfg.motherName}`,
    `DESCRIPTION:${cfg.heroTagline}. ${cfg.timings}. Dress code: ${cfg.dressCode}`,
    `LOCATION:${cfg.venueName}\\, ${cfg.venueAddress}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "godh-bharai.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
