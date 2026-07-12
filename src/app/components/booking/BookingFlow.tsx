"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DateSelector } from "./DateSelector";
import { RoomFilters } from "./RoomFilters";
import { FilterSheet } from "./FilterSheet";
import { RoomList } from "./RoomList";
import {
  ROOMS,
  applyFilters,
  initialFiltersFromSearch,
  initialSearchStateFromParams,
} from "@/app/lib/booking";

export function BookingFlow() {
  const params = useSearchParams();
  const [search, setSearch] = useState(() => initialSearchStateFromParams(params));
  const [filters, setFilters] = useState(() => initialFiltersFromSearch(search));

  const rooms = useMemo(() => applyFilters([...ROOMS], filters), [filters]);

  return (
    <div>
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember">
          Rooms &amp; villas
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Find your room at Kayon Ridge
        </h1>
        <p className="mt-3 text-ink-muted">
          Six rooms, each with its own patch of forest. Rates include breakfast and the
          four-o&apos;clock fire.
        </p>
      </div>

      <div className="mt-8">
        <DateSelector search={search} onChange={setSearch} />
      </div>

      <div className="mt-6 flex justify-end">
        <FilterSheet filters={filters} onApply={setFilters} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[18rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-xl border border-line bg-paper-raised p-6 shadow-soft">
            <RoomFilters filters={filters} onChange={setFilters} />
          </div>
        </aside>

        <RoomList rooms={rooms} search={search} />
      </div>
    </div>
  );
}
