"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "./icons";
import { DateRangePicker } from "./booking/DateRangePicker";
import { GuestDropdown } from "./booking/GuestDropdown";
import { EMPTY_SEARCH } from "@/app/lib/booking";

/* Availability bar — popover date-range picker + guest dropdown, the same
   controls used on /book. Rendered floating over the hero on desktop,
   stacked on mobile. Submitting navigates to /book with the search
   prefilled as query params. */
export default function AvailabilityBar({ floating = false }: { floating?: boolean }) {
  const router = useRouter();
  const [search, setSearch] = useState(EMPTY_SEARCH);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.checkIn) params.set("checkIn", search.checkIn);
    if (search.checkOut) params.set("checkOut", search.checkOut);
    if (search.guests) params.set("guests", search.guests);
    router.push(`/book${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <form
      aria-label="Check availability"
      onSubmit={onSubmit}
      className={[
        "grid gap-px overflow-hidden rounded-2xl bg-line text-left",
        "grid-cols-2 sm:grid-cols-[1fr_1fr_auto]",
        floating
          ? "w-full max-w-2xl shadow-float ring-1 ring-black/5"
          : "w-full shadow-card",
      ].join(" ")}
    >
      <div className="col-span-2 bg-paper-raised px-4 py-1 sm:col-span-1 sm:px-5 sm:py-1">
        <DateRangePicker
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          onChange={({ checkIn, checkOut }) => setSearch((s) => ({ ...s, checkIn, checkOut }))}
        />
      </div>

      <div className="col-span-2 bg-paper-raised px-4 py-1 sm:col-span-1 sm:min-w-[9.5rem] sm:px-5 sm:py-1">
        <GuestDropdown
          value={search.guests}
          onChange={(guests) => setSearch((s) => ({ ...s, guests }))}
        />
      </div>

      {/* Submit — full-width CTA on mobile, inline on desktop */}
      <button
        type="submit"
        className="col-span-2 flex items-center justify-center gap-2 bg-ember px-6 py-4 font-600 text-on-ember transition-colors hover:bg-walnut cursor-pointer sm:col-span-1"
      >
        Check dates
        <ArrowRight width={18} height={18} />
      </button>
    </form>
  );
}
