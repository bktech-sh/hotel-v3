"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Close, ChevronLeft, ChevronRight } from "@/app/components/icons";
import { useScrollLock } from "./usePopoverPosition";
import type { GalleryPhoto } from "@/app/lib/booking";

const SWIPE_THRESHOLD = 40;

export function PhotoLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  useScrollLock(true);
  const [ratio, setRatio] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photo = photos[index];
  const total = photos.length;

  const goTo = (next: number) => {
    setRatio(null);
    onIndexChange((next + total) % total);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  return createPortal(
    <div
      className="fixed inset-0 z-[400] flex flex-col bg-timber/95"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-5 py-4 text-on-timber"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-600">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-on-timber/10"
        >
          <Close width={20} height={20} />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center touch-pan-y px-4 pb-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta > SWIPE_THRESHOLD) goTo(index - 1);
          else if (delta < -SWIPE_THRESHOLD) goTo(index + 1);
          touchStartX.current = null;
        }}
      >
        <div
          className="relative max-h-full max-w-full"
          style={{
            width: "min(90vw, 64rem)",
            aspectRatio: ratio ?? 3 / 2,
          }}
        >
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="90vw"
            className="object-contain"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight) {
                setRatio(img.naturalWidth / img.naturalHeight);
              }
            }}
          />
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index - 1);
              }}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-on-timber/10 text-on-timber transition-colors hover:bg-on-timber/20"
            >
              <ChevronLeft width={20} height={20} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index + 1);
              }}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-on-timber/10 text-on-timber transition-colors hover:bg-on-timber/20"
            >
              <ChevronRight width={20} height={20} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className="flex justify-center gap-2 pb-5"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${
                i === index ? "w-6 bg-on-timber" : "w-1.5 bg-on-timber/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
