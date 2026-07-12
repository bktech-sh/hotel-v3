"use client";

import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { GUEST_OPTIONS } from "@/app/lib/booking";
import { Check, Users } from "@/app/components/icons";
import { usePopoverPosition, useOutsideClose } from "./usePopoverPosition";

const POPOVER_WIDTH = 220;

export function GuestDropdown({
  value,
  onChange,
  label = "Guests",
  compact,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const position = usePopoverPosition(triggerRef, open, POPOVER_WIDTH);

  useOutsideClose(open, () => setOpen(false), [triggerRef, panelRef]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${value}`}
        className={[
          "flex w-full items-center gap-2.5 rounded-md text-left outline-none cursor-pointer",
          compact ? "py-1" : "px-3.5 py-2.5",
        ].join(" ")}
      >
        <Users width={compact ? 16 : 18} height={compact ? 16 : 18} className="shrink-0 text-ink-muted" />
        <span className="flex min-w-0 flex-col">
          {!compact && (
            <span className="text-[0.68rem] font-600 uppercase tracking-[0.14em] text-ink-muted">
              {label}
            </span>
          )}
          <span className="truncate text-[0.95rem] font-500 text-ink">
            {value} {parseInt(value, 10) === 1 ? "guest" : "guests"}
          </span>
        </span>
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-label={label}
            style={{ position: "fixed", top: position.top, left: position.left, width: POPOVER_WIDTH }}
            className="z-[200] overflow-hidden rounded-lg border border-line bg-paper-raised py-1.5 shadow-float"
          >
            {GUEST_OPTIONS.map((option) => {
              const selected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-paper"
                >
                  {option} {option === "1" ? "guest" : "guests"}
                  {selected && <Check width={16} height={16} className="text-ember" />}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}
