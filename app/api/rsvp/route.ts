import { NextResponse } from "next/server";
import { appendRsvp, listRsvps, sheetsConfigured } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/rsvp — append one RSVP to the Google Sheet.
 */
export async function POST(request: Request) {
  if (!sheetsConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "Google Sheets is not configured." },
      { status: 501 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, attending, guests, note, dietary } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || !name.trim() || typeof attending !== "string") {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  try {
    await appendRsvp({
      timestamp: new Date().toISOString(),
      name: name.trim().slice(0, 120),
      attending: attending.slice(0, 40),
      guests: Math.max(0, Math.min(20, Number(guests) || 0)),
      note: typeof note === "string" ? note.slice(0, 1000) : "",
      dietary: typeof dietary === "string" ? dietary.slice(0, 300) : "",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP append failed:", err);
    return NextResponse.json({ error: "sheet_error" }, { status: 502 });
  }
}

/**
 * GET /api/rsvp — host-only listing, guarded by HOST_PASSPHRASE.
 */
export async function GET(request: Request) {
  const passphrase = request.headers.get("x-passphrase") ?? "";
  const expected = process.env.HOST_PASSPHRASE;

  if (!expected) {
    return NextResponse.json(
      { error: "not_configured", message: "HOST_PASSPHRASE is not set." },
      { status: 501 },
    );
  }
  if (passphrase !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!sheetsConfigured()) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Google Sheets is not configured — add env vars on Netlify and redeploy.",
      },
      { status: 501 },
    );
  }

  try {
    const rows = await listRsvps();
    return NextResponse.json({ rows });
  } catch (err) {
    console.error("RSVP list failed:", err);
    return NextResponse.json({ error: "sheet_error" }, { status: 502 });
  }
}
