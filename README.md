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

## Deploy to Netlify

1. Push this repo to GitHub (already at [github.com/pate2432/godh-bharai-invite](https://github.com/pate2432/godh-bharai-invite))
2. Go to [app.netlify.com/start](https://app.netlify.com/start) → **Import from Git** → choose the repo
3. Netlify auto-detects Next.js — build command `npm run build`, plugin `@netlify/plugin-nextjs` (set in `netlify.toml`)
4. Before deploying, add these **Environment variables** (Site settings → Environment variables):
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (paste with `\n` escapes intact)
   - `GOOGLE_SHEET_ID`
   - `HOST_PASSPHRASE`
5. Deploy
6. Update `siteUrl` in `config.ts` to your live Netlify URL (e.g. `https://your-site-name.netlify.app`), commit, and push to redeploy

### Pre-launch checklist

- [ ] `config.ts` — names, date, venue, `siteUrl`
- [ ] `public/music.mp3` — background track (under ~5 MB)
- [ ] Netlify env vars set (all four)
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
