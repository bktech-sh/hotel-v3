"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/app/components/icons";
import type { GalleryPhoto } from "@/app/lib/booking";

export function RoomCardCarousel({
  photos,
  alt,
}: {
  photos: GalleryPhoto[];
  alt: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(index);
  };

  return (
    <div className="group relative h-full min-h-[14rem] overflow-hidden">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div key={i} className="relative h-full w-full shrink-0 snap-start">
            <Image
              src={photo.src}
              alt={`${alt} — photo ${i + 1}`}
              fill
              loading={i === 0 ? undefined : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            disabled={active === 0}
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(active - 1);
            }}
            className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-paper-raised/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 disabled:hidden"
          >
            <ChevronLeft width={18} height={18} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            disabled={active === photos.length - 1}
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(active + 1);
            }}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-paper-raised/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 disabled:hidden"
          >
            <ChevronRight width={18} height={18} />
          </button>

          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === active ? "bg-on-timber" : "bg-on-timber/45"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
