"use client";

import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { Close } from "@/app/components/icons";
import { useOutsideClose, useScrollLock } from "./usePopoverPosition";
import {
  buildWhatsAppBookingUrl,
  formatDateID,
  priceFmt,
  nightsBetween,
  validateBookingRequest,
  type BookingRequestDetails,
  type BookingRequestErrors,
  type Room,
} from "@/app/lib/booking";

export function BookingRequestModal({
  open,
  onClose,
  room,
  checkIn,
  checkOut,
  guests,
}: {
  open: boolean;
  onClose: () => void;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [details, setDetails] = useState<BookingRequestDetails>({
    fullName: "",
    whatsapp: "",
    notes: "",
  });
  const [errors, setErrors] = useState<BookingRequestErrors>({});

  useScrollLock(open);
  useOutsideClose(open, onClose, [panelRef]);

  if (!open) return null;

  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * room.priceIDR;

  const field = (key: keyof BookingRequestDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDetails((d) => ({ ...d, [key]: e.target.value }));
    setErrors((e2) => ({ ...e2, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateBookingRequest(details);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const url = buildWhatsAppBookingUrl({ room, checkIn, checkOut, guests, details });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-timber/50 p-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Complete your booking request"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-paper-raised p-6 shadow-float"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg text-ink">Complete your request</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink hover:bg-paper"
          >
            <Close width={18} height={18} />
          </button>
        </div>

        <div className="mt-4 rounded-md bg-paper p-4 text-sm text-ink">
          <p className="font-600">{room.name}</p>
          <p className="mt-1 text-ink-muted">
            {formatDateID(checkIn)} — {formatDateID(checkOut)} · {nights} night{nights === 1 ? "" : "s"} ·{" "}
            {guests} {parseInt(guests, 10) === 1 ? "guest" : "guests"}
          </p>
          <p className="mt-2 font-600">{priceFmt(total)} total</p>
        </div>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <Field label="Full name" error={errors.fullName}>
            <input
              type="text"
              value={details.fullName}
              onChange={field("fullName")}
              className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ember"
            />
          </Field>

          <Field label="WhatsApp / phone number" error={errors.whatsapp}>
            <input
              type="tel"
              value={details.whatsapp}
              onChange={field("whatsapp")}
              className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ember"
            />
          </Field>

          <Field label="Notes (optional)">
            <textarea
              value={details.notes}
              onChange={field("notes")}
              rows={3}
              className="w-full resize-none rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-ember"
            />
          </Field>

          <button
            type="submit"
            className="mt-1 w-full cursor-pointer rounded-full bg-ember py-3.5 font-600 text-on-ember transition-colors hover:bg-walnut"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-600 text-ink">{label}</span>
      {children}
      {error && <span className="text-xs font-600 text-ember">{error}</span>}
    </label>
  );
}
