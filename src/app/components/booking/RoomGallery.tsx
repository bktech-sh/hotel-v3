"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoLightbox } from "./PhotoLightbox";
import { Images } from "@/app/components/icons";
import type { GalleryPhoto } from "@/app/lib/booking";

export function RoomGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hero, ...thumbs] = photos;
  const visibleThumbs = thumbs.slice(0, 4);

  return (
    <>
      <div className="flex flex-col gap-1.5 lg:h-[34rem] lg:flex-row">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="relative h-44 w-full cursor-pointer overflow-hidden rounded-lg sm:h-56 lg:h-full lg:flex-1"
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </button>

        <div className="grid grid-cols-4 gap-1.5 lg:h-full lg:w-[45%] lg:grid-cols-2 lg:grid-rows-2">
          {visibleThumbs.map((photo, i) => {
            const isLast = i === visibleThumbs.length - 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i + 1)}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg lg:aspect-auto lg:h-full"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 25vw, 22vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
                {isLast && (
                  <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-timber/55 text-sm font-600 text-on-timber">
                    <Images width={17} height={17} />
                    See all photos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}
