import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Tiro_Devanagari_Hindi,
  Yatra_One,
  Noto_Serif_Gujarati,
  Jost,
} from "next/font/google";
import { config } from "@/config";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const devanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-devanagari",
  display: "swap",
});

/** Bolder display Devanagari for hero greetings (राधे राधे, etc.) */
const devaDisplay = Yatra_One({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-deva-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const gujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gujarati",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.eventType} of ${config.motherName} — You're Invited`,
  description: `${config.heroTagline}. Join us for the ${config.eventType} of ${config.motherName} — ${config.dateDisplay}, ${config.venueName}.`,
  openGraph: {
    title: `${config.eventType} of ${config.motherName}`,
    description: `${config.heroTagline} — ${config.dateDisplay}. Tap to open your invitation.`,
    type: "website",
    url: config.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.eventType} of ${config.motherName}`,
    description: `${config.heroTagline} — ${config.dateDisplay}.`,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: `${config.motherName}'s ${config.eventType}`,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1533",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${devanagari.variable} ${devaDisplay.variable} ${gujarati.variable} ${body.variable}`}>
      <body className="font-body">
        <div aria-hidden="true" className="kinari kinari-left" />
        <div aria-hidden="true" className="kinari kinari-right" />
        {children}
      </body>
    </html>
  );
}
