"use client";

import { DateRangePicker } from "./DateRangePicker";
import { GuestDropdown } from "./GuestDropdown";
import { ArrowRight } from "@/app/components/icons";
import type { SearchState } from "@/app/lib/booking";

export function DateSelector({
  search,
  onChange,
  onSubmit,
}: {
  search: SearchState;
  onChange: (next: SearchState) => void;
  onSubmit?: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      aria-label="Check availability"
      className="w-full rounded-lg border border-line bg-paper-raised p-3 shadow-soft sm:p-2 sm:rounded-full"
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[1.3fr_1fr_auto] sm:items-center sm:gap-1.5">
        <div className="rounded-md border border-line bg-paper sm:rounded-full sm:border-0 sm:bg-transparent">
          <DateRangePicker
            checkIn={search.checkIn}
            checkOut={search.checkOut}
            onChange={({ checkIn, checkOut }) => onChange({ ...search, checkIn, checkOut })}
          />
        </div>

        <div className="rounded-md border border-line bg-paper sm:rounded-full sm:border-0 sm:bg-transparent">
          <GuestDropdown value={search.guests} onChange={(guests) => onChange({ ...search, guests })} />
        </div>

        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 font-600 text-on-ember transition-colors duration-200 hover:bg-walnut cursor-pointer"
        >
          Check dates
          <ArrowRight
            width={18}
            height={18}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
  );
}
