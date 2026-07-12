"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RoomSummaryCard } from "./RoomSummaryCard";
import { StickyBookBar } from "./StickyBookBar";
import { BookingRequestModal } from "./BookingRequestModal";
import { initialSearchStateFromParams, type Room } from "@/app/lib/booking";

export function RoomBookingSection({ room }: { room: Room }) {
  const params = useSearchParams();
  const [search, setSearch] = useState(() => initialSearchStateFromParams(params));
  const [modalOpen, setModalOpen] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <RoomSummaryCard
        ref={summaryRef}
        room={room}
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        guests={search.guests}
        onDatesChange={({ checkIn, checkOut }) => setSearch((s) => ({ ...s, checkIn, checkOut }))}
        onGuestsChange={(guests) => setSearch((s) => ({ ...s, guests }))}
        onBookNow={() => setModalOpen(true)}
      />

      <StickyBookBar
        room={room}
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        summaryRef={summaryRef}
        onBookNow={() => setModalOpen(true)}
      />

      <BookingRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        room={room}
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        guests={search.guests}
      />
    </>
  );
}
