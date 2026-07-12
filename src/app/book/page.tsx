import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import { BookingFlow } from "@/app/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Rooms & Villas",
  description:
    "Browse all rooms and villas at Kayon Ridge and check availability for your stay above Lembang.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
        <Suspense fallback={null}>
          <BookingFlow />
        </Suspense>
      </main>
      <footer className="grain-dark relative bg-timber py-10 text-center text-sm text-on-timber-muted">
        <Link href="/#top" className="hover:text-on-timber cursor-pointer">
          Back to Kayon Ridge
        </Link>
      </footer>
    </>
  );
}
