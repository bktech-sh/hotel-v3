"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "@/app/components/icons";
import { ratingLabel, type Testimonial } from "@/app/lib/booking";

export function RoomReviews({
  rating,
  reviews,
}: {
  rating: number;
  reviews: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center gap-4">
        <span className="font-serif text-3xl text-ember">{rating.toFixed(1)}</span>
        <div>
          <p id="reviews-heading" className="font-600 text-ink">
            {ratingLabel(rating)}
          </p>
          <p className="text-sm text-ink-muted">{reviews.length} reviews</p>
        </div>
      </div>

      <div className="relative mt-5">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex w-[16rem] shrink-0 snap-start flex-col gap-4 rounded-lg border border-line bg-paper-raised p-5 shadow-soft"
            >
              <Quote width={26} height={26} className="text-ember/70" />
              <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                {review.quote}
              </blockquote>
              <figcaption className="border-t border-line pt-3 text-sm">
                <span className="font-600 text-ink">{review.name}</span>
                <span className="ml-2 text-ink-muted">{review.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {reviews.length > 1 && (
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => scrollBy(-1)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
            >
              <ChevronLeft width={17} height={17} />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => scrollBy(1)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
            >
              <ChevronRight width={17} height={17} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
