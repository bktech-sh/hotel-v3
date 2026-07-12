"use client";

import { GuestDropdown } from "./GuestDropdown";
import {
  DEFAULT_FILTERS,
  PRICE_BOUNDS,
  VIEW_OPTIONS,
  filtersAreDefault,
  priceFmt,
  type RoomFilters as RoomFiltersState,
} from "@/app/lib/booking";

export function RoomFilters({
  filters,
  onChange,
}: {
  filters: RoomFiltersState;
  onChange: (next: RoomFiltersState) => void;
}) {
  const isDefault = filtersAreDefault(filters);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-ink">Filters</h3>
        {!isDefault && (
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="cursor-pointer text-sm font-600 text-ember underline underline-offset-2 hover:text-walnut"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between text-sm text-ink">
          <span className="font-600">Max price / night</span>
          <span className="text-ink-muted">{priceFmt(filters.priceMax)}</span>
        </div>
        <input
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={50_000}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          aria-label="Maximum price per night"
          className="mt-3 w-full cursor-pointer accent-ember"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-muted">
          <span>{priceFmt(PRICE_BOUNDS.min)}</span>
          <span>{priceFmt(PRICE_BOUNDS.max)}</span>
        </div>
      </div>

      <div>
        <span className="text-sm font-600 text-ink">Guests</span>
        <div className="mt-2 rounded-md border border-line bg-paper px-3.5 py-2.5">
          <GuestDropdown
            value={String(filters.guests)}
            onChange={(v) => onChange({ ...filters, guests: parseInt(v, 10) })}
            label="Guests"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-600 text-ink">View</legend>
        <div className="mt-2 flex flex-col gap-2">
          {VIEW_OPTIONS.map((view) => {
            const checked = filters.views.includes(view);
            return (
              <label key={view} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      views: checked
                        ? filters.views.filter((v) => v !== view)
                        : [...filters.views, view],
                    })
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-ember"
                />
                <span>{view}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
