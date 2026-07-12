import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import { Ruler, Users, View } from "@/app/components/icons";
import { RoomGallery } from "@/app/components/booking/RoomGallery";
import { RoomReviews } from "@/app/components/booking/RoomReviews";
import { RoomBookingSection } from "@/app/components/booking/RoomBookingSection";
import { ROOMS, roomGallery, roomRating, roomReviews } from "@/app/lib/booking";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ roomId: room.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomId: string }>;
}): Promise<Metadata> {
  const { roomId } = await params;
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) return {};
  return {
    title: room.name,
    description: room.tagline,
    alternates: { canonical: `/book/${room.id}` },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) notFound();

  const gallery = roomGallery(room);
  const rating = roomRating(room);
  const reviews = roomReviews(room);

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          <Link href="/" className="hover:text-ember">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/book" className="hover:text-ember">
            Rooms &amp; Villas
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{room.name}</span>
        </nav>

        <div className="mt-5">
          <RoomGallery photos={gallery} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-ink">
              {room.name}
            </h1>
            <p className="mt-1.5 text-sm italic text-ink-muted">{room.meaning}</p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink">
              <li className="flex items-center gap-2">
                <Ruler width={18} height={18} className="text-ember" />
                {room.size}
              </li>
              <li className="flex items-center gap-2">
                <View width={18} height={18} className="text-ember" />
                {room.view}
              </li>
              <li className="flex items-center gap-2">
                <Users width={18} height={18} className="text-ember" />
                {room.sleeps}
              </li>
            </ul>

            <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">{room.blurb}</p>

            <div className="mt-10 border-t border-line pt-8">
              <RoomReviews rating={rating} reviews={reviews} />
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Suspense fallback={null}>
              <RoomBookingSection room={room} />
            </Suspense>
          </div>
        </div>
      </main>
      <footer className="grain-dark relative bg-timber py-10 text-center text-sm text-on-timber-muted">
        <Link href="/#top" className="hover:text-on-timber cursor-pointer">
          Back to Kayon Ridge
        </Link>
      </footer>
    </>
  );
}
