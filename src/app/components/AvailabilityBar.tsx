"use client";

import { useEffect, useId, useState } from "react";
import { Calendar, Users, ArrowRight } from "./icons";

/* Availability bar — fully keyboard-navigable: native date inputs (arrow keys,
   type-to-set), a labelled guest stepper with +/- buttons, and a submit.
   Rendered floating over the hero on desktop, stacked on mobile. */
export default function AvailabilityBar({ floating = false }: { floating?: boolean }) {
  const inId = useId();
  const outId = useId();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // Compute sensible defaults on the client only (Date is unavailable at build/SSR
  // determinism boundaries; doing it in an effect also avoids hydration mismatch).
  useEffect(() => {
    const today = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const inD = new Date(today);
    inD.setDate(inD.getDate() + 14);
    const outD = new Date(inD);
    outD.setDate(outD.getDate() + 2);
    setCheckIn(iso(inD));
    setCheckOut(iso(outD));
  }, []);

  const fieldBase =
    "peer w-full bg-transparent text-ink font-500 outline-none [color-scheme:light] cursor-pointer";
  const labelBase =
    "flex items-center gap-1.5 text-[0.7rem] font-600 uppercase tracking-[0.14em] text-ink-muted";

  return (
    <form
      aria-label="Check availability"
      onSubmit={(e) => e.preventDefault()}
      className={[
        "grid gap-px overflow-hidden rounded-2xl bg-line text-left",
        "grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto]",
        floating
          ? "w-full max-w-2xl shadow-float ring-1 ring-black/5"
          : "w-full shadow-card",
      ].join(" ")}
    >
      {/* Check-in */}
      <div className="bg-paper-raised px-5 py-4">
        <label htmlFor={inId} className={labelBase}>
          <Calendar width={14} height={14} />
          Check in
        </label>
        <input
          id={inId}
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className={`${fieldBase} mt-1.5`}
        />
      </div>

      {/* Check-out */}
      <div className="bg-paper-raised px-5 py-4">
        <label htmlFor={outId} className={labelBase}>
          <Calendar width={14} height={14} />
          Check out
        </label>
        <input
          id={outId}
          type="date"
          value={checkOut}
          min={checkIn || undefined}
          onChange={(e) => setCheckOut(e.target.value)}
          className={`${fieldBase} mt-1.5`}
        />
      </div>

      {/* Guests stepper */}
      <div className="bg-paper-raised px-5 py-4 sm:min-w-[9.5rem]">
        <span className={labelBase} id={`${inId}-glabel`}>
          <Users width={14} height={14} />
          Guests
        </span>
        <div
          className="mt-1.5 flex items-center justify-between gap-3"
          role="group"
          aria-labelledby={`${inId}-glabel`}
        >
          <button
            type="button"
            aria-label="Fewer guests"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            disabled={guests <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span aria-hidden>−</span>
          </button>
          <span className="min-w-6 text-center font-500 tabular-nums" aria-live="polite">
            {guests}
          </span>
          <button
            type="button"
            aria-label="More guests"
            onClick={() => setGuests((g) => Math.min(8, g + 1))}
            disabled={guests >= 8}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span aria-hidden>+</span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-ember px-6 py-4 font-600 text-on-ember transition-colors hover:bg-walnut cursor-pointer"
      >
        Check dates
        <ArrowRight width={18} height={18} />
      </button>
    </form>
  );
}
