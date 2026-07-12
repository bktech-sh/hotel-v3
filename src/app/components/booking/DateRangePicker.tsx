"use client";

import { createPortal } from "react-dom";
import { useMemo, useRef, useState } from "react";
import {
  MONTH_NAMES,
  WEEKDAY_LABELS,
  fromDateKey,
  nightsBetween,
  toDateKey,
} from "@/app/lib/booking";
import { Calendar, ChevronLeft, ChevronRight } from "@/app/components/icons";
import { usePopoverPosition, useOutsideClose } from "./usePopoverPosition";

const DESKTOP_POPOVER_WIDTH = 640;
const MOBILE_POPOVER_WIDTH = 320;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function isBefore(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

function daysInMonth(monthStart: Date): (Date | null)[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: firstWeekday }, () => null);
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));
  return cells;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  compact,
}: {
  checkIn: string;
  checkOut: string;
  onChange: (next: { checkIn: string; checkOut: string }) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [draftIn, setDraftIn] = useState(checkIn);
  const [draftOut, setDraftOut] = useState(checkOut);
  const [hovered, setHovered] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const d = fromDateKey(checkIn) ?? startOfToday();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const popoverWidth =
    typeof window !== "undefined" && window.innerWidth < 640
      ? MOBILE_POPOVER_WIDTH
      : DESKTOP_POPOVER_WIDTH;
  const position = usePopoverPosition(triggerRef, open, popoverWidth);

  const today = useMemo(() => startOfToday(), []);
  const draftInDate = fromDateKey(draftIn);
  const draftOutDate = fromDateKey(draftOut);
  const nights = nightsBetween(draftIn, draftOut);

  const openPopover = () => {
    setDraftIn(checkIn);
    setDraftOut(checkOut);
    const base = fromDateKey(checkIn) ?? today;
    setVisibleMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    setOpen(true);
  };

  const closeDiscard = () => setOpen(false);

  useOutsideClose(open, closeDiscard, [triggerRef, panelRef]);

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (!draftInDate || draftOutDate || !isBefore(draftInDate, day)) {
      // Start a fresh range (nothing picked yet, both already set, or clicking
      // at/before the current check-in restarts the range).
      setDraftIn(toDateKey(day));
      setDraftOut("");
      return;
    }
    setDraftOut(toDateKey(day));
  };

  const confirm = () => {
    if (!draftIn || !draftOut) return;
    onChange({ checkIn: draftIn, checkOut: draftOut });
    setOpen(false);
  };

  const label =
    checkIn && checkOut
      ? `${formatShort(checkIn)} — ${formatShort(checkOut)}`
      : "Select dates";

  const months = [visibleMonth, addMonths(visibleMonth, 1)];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openPopover())}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Check in — check out: ${label}`}
        className={[
          "flex w-full items-center gap-2.5 rounded-md text-left outline-none cursor-pointer",
          compact ? "py-1" : "px-3.5 py-2.5",
        ].join(" ")}
      >
        <Calendar width={compact ? 16 : 18} height={compact ? 16 : 18} className="shrink-0 text-ink-muted" />
        <span className="flex min-w-0 flex-col">
          {!compact && (
            <span className="text-[0.68rem] font-600 uppercase tracking-[0.14em] text-ink-muted">
              Check In — Check Out
            </span>
          )}
          <span className="truncate text-[0.95rem] font-500 text-ink">{label}</span>
        </span>
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-label="Choose check-in and check-out dates"
            style={{ position: "fixed", top: position.top, left: position.left, width: popoverWidth }}
            className="z-[200] overflow-hidden rounded-lg border border-line bg-paper-raised shadow-float"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-paper"
              >
                <ChevronLeft width={18} height={18} />
              </button>
              <span className="text-sm font-600 text-ink">
                {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Select dates"}
              </span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-paper"
              >
                <ChevronRight width={18} height={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4 sm:flex-row">
              {(popoverWidth >= DESKTOP_POPOVER_WIDTH ? months : [months[0]]).map((month, i) => (
                <MonthGrid
                  key={i}
                  month={month}
                  today={today}
                  draftIn={draftInDate}
                  draftOut={draftOutDate}
                  hovered={hovered}
                  onHover={setHovered}
                  onDayClick={handleDayClick}
                />
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-line px-4 py-3">
              <button
                type="button"
                onClick={closeDiscard}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-600 text-ink-muted transition-colors hover:bg-paper"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={!draftIn || !draftOut}
                className="cursor-pointer rounded-full bg-ember px-5 py-2 text-sm font-600 text-on-ember transition-colors hover:bg-walnut disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function formatShort(value: string): string {
  const d = fromDateKey(value);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function MonthGrid({
  month,
  today,
  draftIn,
  draftOut,
  hovered,
  onHover,
  onDayClick,
}: {
  month: Date;
  today: Date;
  draftIn: Date | null;
  draftOut: Date | null;
  hovered: Date | null;
  onHover: (day: Date | null) => void;
  onDayClick: (day: Date) => void;
}) {
  const cells = daysInMonth(month);
  const rangeEnd = draftOut ?? (draftIn && hovered && isBefore(draftIn, hovered) ? hovered : null);

  return (
    <div className="flex-1">
      <p className="mb-2 text-center text-sm font-600 text-ink">
        {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
      </p>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-ink-muted">
        {WEEKDAY_LABELS.map((w) => (
          <span key={w}>{w}</span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const disabled = isBefore(day, today);
          const isStart = draftIn && isSameDay(day, draftIn);
          const isEnd = draftOut && isSameDay(day, draftOut);
          const inRange =
            draftIn && rangeEnd && isBefore(draftIn, day) && isBefore(day, rangeEnd);

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onDayClick(day)}
              onMouseEnter={() => onHover(day)}
              onMouseLeave={() => onHover(null)}
              aria-label={day.toDateString()}
              aria-pressed={Boolean(isStart || isEnd)}
              className={[
                "grid h-8 w-8 cursor-pointer place-items-center rounded-full text-sm transition-colors",
                disabled ? "cursor-not-allowed text-ink-muted/30" : "text-ink",
                isStart || isEnd ? "bg-ember text-on-ember" : "",
                inRange && !isStart && !isEnd ? "bg-ember/15" : "",
                !disabled && !isStart && !isEnd ? "hover:bg-paper" : "",
              ].join(" ")}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
