"use client";

import { useState } from "react";

interface Row {
  timestamp: string;
  name: string;
  attending: string;
  guests: number;
  note: string;
  dietary: string;
}

/** Minimal host dashboard: passphrase-gated list of RSVPs + headcount. */
export default function HostPage() {
  const [passphrase, setPassphrase] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        headers: { "x-passphrase": passphrase },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          res.status === 401
            ? "Wrong passphrase."
            : data.message || "Could not load RSVPs.",
        );
        setRows(null);
      } else {
        // Skip a header row if the sheet has one
        const list: Row[] = (data.rows as Row[]).filter(
          (r) => r.name && r.name.toLowerCase() !== "name",
        );
        setRows(list);
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  };

  const coming = rows?.filter((r) => r.attending.toLowerCase().includes("coming")) ?? [];
  const headcount = coming.reduce((sum, r) => sum + (r.guests || 0), 0);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl text-goldleaf">Host — RSVPs</h1>

      {!rows && (
        <form onSubmit={load} className="mt-8 flex max-w-sm gap-3">
          <label htmlFor="passphrase" className="sr-only">
            Passphrase
          </label>
          <input
            id="passphrase"
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Passphrase"
            className="w-full border border-gold/40 bg-white/[0.04] px-4 py-3 text-moonlight placeholder:text-moonlight/40 focus:border-goldleaf"
          />
          <button
            type="submit"
            disabled={loading || !passphrase}
            className="shrink-0 bg-gold px-5 py-3 text-xs uppercase tracking-label text-night hover:bg-goldleaf disabled:opacity-50"
          >
            {loading ? "…" : "Open"}
          </button>
        </form>
      )}

      {error && <p className="mt-6 text-sm text-lotus">{error}</p>}

      {rows && (
        <>
          <div className="mt-8 flex gap-8 border border-gold/40 px-6 py-5">
            <div>
              <p className="eyebrow">Replies</p>
              <p className="mt-1 font-display text-3xl text-moonlight">{rows.length}</p>
            </div>
            <div>
              <p className="eyebrow">Coming</p>
              <p className="mt-1 font-display text-3xl text-moonlight">{coming.length}</p>
            </div>
            <div>
              <p className="eyebrow">Headcount</p>
              <p className="mt-1 font-display text-3xl text-goldleaf">{headcount}</p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-gold/40">
                  {["When", "Name", "Attending", "Guests", "Blessing", "Dietary"].map((h) => (
                    <th key={h} className="eyebrow py-3 pr-4 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gold/15 align-top">
                    <td className="py-3 pr-4 text-moonlight/60">
                      {r.timestamp ? new Date(r.timestamp).toLocaleString() : "—"}
                    </td>
                    <td className="py-3 pr-4 font-medium text-moonlight">{r.name}</td>
                    <td className="py-3 pr-4">{r.attending}</td>
                    <td className="py-3 pr-4">{r.guests || "—"}</td>
                    <td className="max-w-[220px] py-3 pr-4 text-moonlight/80">
                      {r.note || "—"}
                    </td>
                    <td className="py-3 text-moonlight/80">{r.dietary || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
