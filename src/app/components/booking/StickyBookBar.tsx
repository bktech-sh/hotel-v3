"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { formatDateID, priceFmt, nightsBetween, type Room } from "@/app/lib/booking";

export function StickyBookBar({
  room,
  checkIn,
  checkOut,
  summaryRef,
  onBookNow,
}: {
  room: Room;
  checkIn: string;
  checkOut: string;
  summaryRef: RefObject<HTMLDivElement | null>;
  onBookNow: () => void;
}) {
  const [summaryVisible, setSummaryVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = summaryRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setSummaryVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [summaryRef]);

  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * room.priceIDR;

  const dateLabel =
    checkIn && checkOut ? `${formatDateID(checkIn)} — ${formatDateID(checkOut)}` : "Select dates";

  return (
    <div
      ref={barRef}
      className={`fixed inset-x-4 bottom-4 z-[150] transition-all duration-300 lg:hidden ${
        summaryVisible ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-full border border-line bg-paper-raised p-2.5 pl-5 shadow-float">
        <button
          type="button"
          onClick={() =>
            summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          className="min-w-0 flex-1 cursor-pointer text-left"
        >
          <span className="block truncate text-xs text-ink-muted">{dateLabel}</span>
          <span className="block font-serif text-lg text-ink">
            {nights > 0 ? priceFmt(total) : priceFmt(room.priceIDR)}
            <span className="ml-1 text-xs font-sans text-ink-muted">
              {nights > 0 ? "total" : "/ night"}
            </span>
          </span>
        </button>

        <button
          type="button"
          disabled={nights <= 0}
          onClick={onBookNow}
          className="shrink-0 cursor-pointer rounded-full bg-ember px-6 py-3 font-600 text-on-ember transition-colors hover:bg-walnut disabled:cursor-not-allowed disabled:opacity-40"
        >
          Book
        </button>
      </div>
    </div>
  );
}
