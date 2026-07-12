"use client";

import { forwardRef } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { GuestDropdown } from "./GuestDropdown";
import { priceFmt, nightsBetween, type Room } from "@/app/lib/booking";

export const RoomSummaryCard = forwardRef<
  HTMLDivElement,
  {
    room: Room;
    checkIn: string;
    checkOut: string;
    guests: string;
    onDatesChange: (next: { checkIn: string; checkOut: string }) => void;
    onGuestsChange: (value: string) => void;
    onBookNow: () => void;
  }
>(function RoomSummaryCard(
  { room, checkIn, checkOut, guests, onDatesChange, onGuestsChange, onBookNow },
  ref,
) {
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * room.priceIDR;

  return (
    <div ref={ref} className="rounded-xl border border-line bg-paper-raised p-6 shadow-float">
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-2xl text-ink">{priceFmt(room.priceIDR)}</span>
        <span className="text-sm text-ink-muted">/ night</span>
      </div>

      <div className="mt-5 flex flex-col gap-2 rounded-md border border-line divide-y divide-line">
        <div className="px-3.5 py-2">
          <DateRangePicker checkIn={checkIn} checkOut={checkOut} onChange={onDatesChange} />
        </div>
        <div className="px-3.5 py-2">
          <GuestDropdown value={guests} onChange={onGuestsChange} />
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-ink">
          <div className="flex justify-between text-ink-muted">
            <span>
              {priceFmt(room.priceIDR)} × {nights} night{nights === 1 ? "" : "s"}
            </span>
            <span>{priceFmt(total)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2 font-600">
            <span>Total</span>
            <span>{priceFmt(total)}</span>
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={nights <= 0}
        onClick={onBookNow}
        className="mt-5 w-full cursor-pointer rounded-full bg-ember py-3.5 font-600 text-on-ember transition-colors hover:bg-walnut disabled:cursor-not-allowed disabled:opacity-40"
      >
        Book Now
      </button>
    </div>
  );
});
