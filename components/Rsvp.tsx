"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { config } from "@/config";
import ArchFrame from "@/components/art/ArchFrame";
import LotusBud from "@/components/art/LotusBud";
import Reveal from "@/components/motion/Reveal";

type Attending = "yes" | "no" | "";
type Status = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  attending?: string;
}

/** Lotus that blooms open around the confirmation text. */
function LotusBloom() {
  const reduced = useReducedMotion();
  const petals = [
    { rotate: 0, delay: 0.15 },
    { rotate: -32, delay: 0.3 },
    { rotate: 32, delay: 0.3 },
    { rotate: -62, delay: 0.45 },
    { rotate: 62, delay: 0.45 },
    { rotate: -88, delay: 0.6 },
    { rotate: 88, delay: 0.6 },
  ];
  return (
    <div className="relative mx-auto h-24 w-40" aria-hidden="true">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{ x: "-50%" }}
          initial={reduced ? { rotate: p.rotate, opacity: 1 } : { rotate: 0, opacity: 0 }}
          animate={{ rotate: p.rotate, opacity: 1 }}
          transition={{ duration: 0.9, delay: reduced ? 0 : p.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="26" height="76" viewBox="0 0 26 76">
            <path
              d="M13 0 C21 22 23 48 13 76 C3 48 5 22 13 0 Z"
              fill="var(--lotus-pink)"
              opacity={i === 0 ? 1 : 0.75 - Math.floor((i - 1) / 2) * 0.15}
            />
          </svg>
        </motion.div>
      ))}
      <motion.span
        className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
        style={{ backgroundColor: "var(--radha-gold)" }}
        initial={reduced ? { scale: 1 } : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.8 }}
      />
    </div>
  );
}

/** Radio option styled as a lotus bud. */
function LotusRadio({
  value,
  current,
  label,
  sublabel,
  onChange,
}: {
  value: Attending;
  current: Attending;
  label: string;
  sublabel?: string;
  onChange: (v: Attending) => void;
}) {
  const selected = current === value;
  return (
    <label
      className={`flex min-h-[88px] flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 border px-3 py-4 text-center transition-colors sm:gap-2 sm:px-4 sm:py-5 ${
        selected
          ? "border-goldleaf bg-gold/15"
          : "border-gold/30 active:border-gold/70"
      }`}
    >
      <input
        type="radio"
        name="attending"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <LotusBud
        size={26}
        color={selected ? "var(--lotus-pink)" : "var(--peacock-teal)"}
      />
      <span
        className={`font-display text-sm leading-snug sm:text-lg ${selected ? "text-goldleaf" : "text-moonlight/80"}`}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className={`font-body text-xs uppercase tracking-label ${selected ? "text-goldleaf/80" : "text-moonlight/50"}`}
        >
          {sublabel}
        </span>
      )}
    </label>
  );
}

const inputCls =
  "w-full border border-gold/40 bg-white/[0.04] px-4 py-3.5 font-body text-base text-moonlight placeholder:text-moonlight/40 focus:border-goldleaf";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [dietary, setDietary] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState("");

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Please share your name";
    if (!attending) next.attending = "Please choose one";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setName("");
    setAttending("");
    setGuests(1);
    setNote("");
    setDietary("");
    setErrors({});
    setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const payload = {
      name: name.trim(),
      attending: attending === "yes" ? "Joyfully coming" : "Blessings from afar",
      guests: attending === "yes" ? guests : 0,
      note: note.trim(),
      dietary: dietary.trim(),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmittedName(payload.name);
        setStatus("success");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="safe-bottom px-4 py-8 sm:px-5" aria-label="RSVP — send your blessings">
      <Reveal>
        <div className="mb-10 text-center">
          <p lang="hi" className="font-deva text-2xl text-goldleaf">
            {config.devanagari.rsvp.text}
          </p>
          <p className="eyebrow mt-2 !text-moonlight/50">
            {config.devanagari.rsvp.translation}
          </p>
        </div>
      </Reveal>

      <Reveal order={1}>
        <ArchFrame>
          <div className="py-10">
            {status === "success" ? (
              <div className="text-center" role="status">
                <LotusBloom />
                <h2 className="mt-6 font-display text-3xl text-goldleaf">
                  Your blessing has reached {config.rsvpSuccessTo}.
                </h2>
                <p className="mt-3 font-display text-xl italic text-moonlight/85">
                  We can&rsquo;t wait to celebrate with you, {submittedName}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 font-body text-xs uppercase tracking-label text-goldleaf underline decoration-goldleaf/40 underline-offset-4 hover:decoration-goldleaf"
                >
                  Reply for someone else
                </button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h2 className="font-display text-3xl text-goldleaf sm:text-4xl">
                    Send Your Blessings
                  </h2>
                  <p className="mt-2 font-display italic text-moonlight/70">
                    an offering, not a form
                  </p>
                </div>

                <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-md space-y-7">
                  <div>
                    <label htmlFor="rsvp-name" className="eyebrow block">
                      Your name
                    </label>
                    <input
                      id="rsvp-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                      className={`mt-3 ${inputCls} ${errors.name ? "border-sindoor" : ""}`}
                    />
                    {errors.name && (
                      <p id="rsvp-name-error" className="mt-2 text-xs text-lotus">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <fieldset>
                    <legend className="eyebrow">Will you join us?</legend>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <LotusRadio
                        value="yes"
                        current={attending}
                        label="Joyfully coming"
                        sublabel="Yes"
                        onChange={setAttending}
                      />
                      <LotusRadio
                        value="no"
                        current={attending}
                        label="Blessings from afar"
                        sublabel="No"
                        onChange={setAttending}
                      />
                    </div>
                    {errors.attending && (
                      <p className="mt-2 text-xs text-lotus">{errors.attending}</p>
                    )}
                  </fieldset>

                  {attending === "yes" && (
                    <div>
                      <label htmlFor="rsvp-guests" className="eyebrow block">
                        Number of guests
                      </label>
                      <div className="mt-3 flex items-center gap-4">
                        <button
                          type="button"
                          aria-label="One guest fewer"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="touch-target flex h-12 w-12 items-center justify-center border border-gold/50 font-display text-xl text-goldleaf transition-colors active:bg-gold active:text-night sm:hover:bg-gold sm:hover:text-night"
                        >
                          −
                        </button>
                        <input
                          id="rsvp-guests"
                          name="guests"
                          type="number"
                          min={1}
                          max={12}
                          value={guests}
                          onChange={(e) =>
                            setGuests(Math.min(12, Math.max(1, Number(e.target.value) || 1)))
                          }
                          className="h-12 w-16 border border-gold/40 bg-transparent text-center font-display text-xl text-moonlight"
                        />
                        <button
                          type="button"
                          aria-label="One guest more"
                          onClick={() => setGuests((g) => Math.min(12, g + 1))}
                          className="touch-target flex h-12 w-12 items-center justify-center border border-gold/50 font-display text-xl text-goldleaf transition-colors active:bg-gold active:text-night sm:hover:bg-gold sm:hover:text-night"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="rsvp-note" className="eyebrow block">
                      Ashirwad <span className="normal-case opacity-60">(optional)</span>
                    </label>
                    <textarea
                      id="rsvp-note"
                      name="note"
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write a blessing for the little one…"
                      className={`mt-3 resize-none ${inputCls}`}
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-dietary" className="eyebrow block">
                      Dietary note <span className="normal-case opacity-60">(optional)</span>
                    </label>
                    <input
                      id="rsvp-dietary"
                      name="dietary"
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="e.g. Jain, no onion–garlic"
                      className={`mt-3 ${inputCls}`}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="border border-sindoor/60 px-4 py-3 text-sm text-lotus">
                      Something interrupted the offering. Please try again — or send us
                      a message directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="touch-target w-full bg-gold px-6 py-4 font-body text-base font-medium uppercase tracking-label text-night transition-colors active:bg-goldleaf disabled:cursor-wait disabled:opacity-60 sm:hover:bg-goldleaf"
                  >
                    {status === "submitting" ? "Offering…" : "Offer Blessing 🪷"}
                  </button>
                </form>
              </>
            )}
          </div>
        </ArchFrame>
      </Reveal>
    </section>
  );
}
