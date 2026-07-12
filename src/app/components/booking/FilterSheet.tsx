"use client";

import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { RoomFilters } from "./RoomFilters";
import { Close, Filter } from "@/app/components/icons";
import { useOutsideClose, useScrollLock } from "./usePopoverPosition";
import { filtersAreDefault, type RoomFilters as RoomFiltersState } from "@/app/lib/booking";

export function FilterSheet({
  filters,
  onApply,
}: {
  filters: RoomFiltersState;
  onApply: (next: RoomFiltersState) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);
  useOutsideClose(open, () => setOpen(false), [panelRef]);

  const activeCount = filtersAreDefault(filters) ? 0 : 1;

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setDraft(filters);
          setOpen(true);
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper-raised px-4 py-2.5 text-sm font-600 text-ink shadow-soft"
      >
        <Filter width={17} height={17} />
        Filters
        {activeCount > 0 && (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-ember text-xs text-on-ember">
            {activeCount}
          </span>
        )}
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[300]">
            <div className="absolute inset-0 bg-timber/50" aria-hidden />
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Filter rooms"
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-xl bg-paper-raised p-6 shadow-float"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg text-ink">Filters</h2>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink hover:bg-paper"
                >
                  <Close width={18} height={18} />
                </button>
              </div>

              <RoomFilters filters={draft} onChange={setDraft} />

              <button
                type="button"
                onClick={() => {
                  onApply(draft);
                  setOpen(false);
                }}
                className="mt-6 w-full cursor-pointer rounded-full bg-ember py-3.5 font-600 text-on-ember transition-colors hover:bg-walnut"
              >
                Apply Filters
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
