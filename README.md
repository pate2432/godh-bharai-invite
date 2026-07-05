# Krupa's Baby Shower Invitation

A single-page, mobile-first digital baby shower invitation with Google Sheets RSVP,
themed on Radha Krishna / Vrindavan in **Pichwai temple art** style.

Built with **Next.js 14 · TypeScript · Tailwind CSS · Framer Motion**. All artwork is inline SVG — no stock images.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Google Sheets credentials
npm run dev
```

Open http://localhost:3000.

## Edit content

All invitation copy lives in **`config.ts`** — names, date, venue, Devanagari lines, music path, RSVP success message, and `siteUrl`.

## RSVP (Google Sheets)

RSVPs append rows to your Google Sheet. View them at **`/host`** with your passphrase.

### Setup

1. [Google Cloud Console](https://console.cloud.google.com/) → create project → enable **Google Sheets API**
2. **IAM → Service Accounts** → create account → **Keys → JSON** → download
3. Create a Google Sheet with row 1 headers: `Timestamp | Name | Attending | Guests | Note | Dietary`
4. **Share the sheet** with the service account email from the JSON (Editor access)
5. Copy `.env.example` → `.env.local`:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=the_id_from_the_sheet_URL
HOST_PASSPHRASE=pick-a-secret-phrase
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add the four env vars above in **Project → Settings → Environment Variables**
4. Update `siteUrl` in `config.ts` to your live Vercel URL
5. Redeploy

### Pre-launch checklist

- [ ] `config.ts` — names, date, venue, `siteUrl`
- [ ] `public/music.mp3` — background track (under ~5 MB)
- [ ] Vercel env vars set (all four)
- [ ] Test RSVP on deployed URL → row appears in sheet
- [ ] Test `/host` dashboard with passphrase
- [ ] Test on iPhone Safari (tap preloader → music unmute)

## Music

- Desktop/Android: autoplays with sound on page load
- iPhone: starts muted; sound turns on after guest taps "Tap to enter" or anywhere on the page
- Gold button bottom-right toggles mute/unmute

## Mobile

Built mobile-first for WhatsApp opens: safe-area insets, 16px+ form fields (no iOS zoom), 44px tap targets, `playsInline` audio.

## Project structure

```
config.ts                     all editable content
app/
  page.tsx                    section assembly
  layout.tsx                  fonts, metadata
  opengraph-image.tsx         WhatsApp link preview image
  icon.tsx                    favicon
  host/                       passphrase-gated RSVP dashboard
  api/rsvp/route.ts           POST append / GET list
components/
  Preloader, Hero, Jhula, Details, Rsvp, Footer
  art/                        inline-SVG Pichwai art
  motion/                     fireflies, diyas, reveals
lib/
  sheets.ts                   Google Sheets API client
  ics.ts                      "Add to calendar" download
```

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```
