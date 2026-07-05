import { createSign } from "node:crypto";

/**
 * Minimal Google Sheets client using the REST API directly with a
 * service-account JWT — no googleapis dependency needed.
 *
 * Required env vars (see README):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY        (the PEM, \n-escaped is fine)
 *   GOOGLE_SHEET_ID
 */

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export function sheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID,
  );
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const key = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = b64url(signer.sign(key));
  const jwt = `${header}.${claims}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export interface RsvpRow {
  timestamp: string;
  name: string;
  attending: string;
  guests: number;
  note: string;
  dietary: string;
}

export async function appendRsvp(row: RsvpRow): Promise<void> {
  const token = await getAccessToken();
  const sheetId = process.env.GOOGLE_SHEET_ID!;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:F:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [
        [row.timestamp, row.name, row.attending, row.guests, row.note, row.dietary],
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
  }
}

export async function listRsvps(): Promise<RsvpRow[]> {
  const token = await getAccessToken();
  const sheetId = process.env.GOOGLE_SHEET_ID!;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:F`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Sheets read failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { values?: string[][] };
  return (data.values ?? []).map((v) => ({
    timestamp: v[0] ?? "",
    name: v[1] ?? "",
    attending: v[2] ?? "",
    guests: Number(v[3] ?? 0),
    note: v[4] ?? "",
    dietary: v[5] ?? "",
  }));
}
