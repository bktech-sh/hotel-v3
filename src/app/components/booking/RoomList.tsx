"use client";

import { useRouter } from "next/navigation";
import { RoomCardCarousel } from "./RoomCardCarousel";
import { Ruler, Users, View } from "@/app/components/icons";
import {
  priceFmt,
  roomGallery,
  searchStateToParams,
  type Room,
  type SearchState,
} from "@/app/lib/booking";

export function RoomList({
  rooms,
  search,
}: {
  rooms: Room[];
  search: SearchState;
}) {
  if (rooms.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line p-10 text-center">
        <p className="text-ink">No rooms match your filters.</p>
        <p className="mt-1.5 text-sm text-ink-muted">
          Try widening your price range or lowering the guest count.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} search={search} />
      ))}
    </div>
  );
}

function RoomCard({ room, search }: { room: Room; search: SearchState }) {
  const router = useRouter();
  const href = `/book/${room.id}${searchStateToParams(search)}`;

  const navigate = () => router.push(href);

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate();
        }
      }}
      className="group grid cursor-pointer grid-cols-1 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-soft transition-shadow duration-300 hover:shadow-card sm:grid-cols-[16rem_1fr] lg:grid-cols-[20rem_1fr]"
    >
      <RoomCardCarousel photos={roomGallery(room)} alt={room.name} />

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div>
          <h3 className="font-serif text-xl leading-tight text-ink">{room.name}</h3>
          <p className="mt-1 text-xs italic text-ink-muted">{room.meaning}</p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {room.tagline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink">
            <li className="flex items-center gap-1.5">
              <Ruler width={15} height={15} className="text-ember" />
              {room.size}
            </li>
            <li className="flex items-center gap-1.5">
              <View width={15} height={15} className="text-ember" />
              {room.view}
            </li>
            <li className="flex items-center gap-1.5">
              <Users width={15} height={15} className="text-ember" />
              {room.sleeps}
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <div>
            <span className="font-serif text-xl text-ink">{priceFmt(room.priceIDR)}</span>
            <span className="ml-1 text-xs text-ink-muted">/ night</span>
          </div>
          <span className="rounded-full border border-ember px-5 py-2.5 text-sm font-600 text-ember transition-colors duration-200 group-hover:bg-ember group-hover:text-on-ember">
            Select room
          </span>
        </div>
      </div>
    </article>
  );
}
