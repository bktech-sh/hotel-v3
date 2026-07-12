import { CONTACT, img, priceFmt, rooms, testimonials } from "./content";

export type Room = (typeof rooms)[number];
export type Testimonial = (typeof testimonials)[number];

export { rooms as ROOMS, testimonials as TESTIMONIALS, priceFmt };

/* ----------------------------- Search state ----------------------------- */

export type SearchState = {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: string; // "1"–"8"
};

export const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export const EMPTY_SEARCH: SearchState = { checkIn: "", checkOut: "", guests: "2" };

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  if (!DATE_KEY_RE.test(checkIn) || !DATE_KEY_RE.test(checkOut)) return 0;
  const inDate = new Date(`${checkIn}T00:00:00Z`);
  const outDate = new Date(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) return 0;
  const diffDays = Math.round((outDate.getTime() - inDate.getTime()) / 86_400_000);
  return diffDays > 0 ? diffDays : 0;
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateKey(value: string): Date | null {
  if (!DATE_KEY_RE.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export function initialSearchStateFromParams(params: URLSearchParams): SearchState {
  const checkInRaw = params.get("checkIn") ?? "";
  const checkOutRaw = params.get("checkOut") ?? "";
  const guestsRaw = params.get("guests") ?? "";

  const datesValid =
    DATE_KEY_RE.test(checkInRaw) &&
    DATE_KEY_RE.test(checkOutRaw) &&
    nightsBetween(checkInRaw, checkOutRaw) > 0;

  const guestsValid = (GUEST_OPTIONS as readonly string[]).includes(guestsRaw);

  return {
    checkIn: datesValid ? checkInRaw : "",
    checkOut: datesValid ? checkOutRaw : "",
    guests: guestsValid ? guestsRaw : "2",
  };
}

export function searchStateToParams(search: SearchState): string {
  const params = new URLSearchParams();
  if (search.checkIn) params.set("checkIn", search.checkIn);
  if (search.checkOut) params.set("checkOut", search.checkOut);
  if (search.guests) params.set("guests", search.guests);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/* ----------------------------- Room facets ----------------------------- */

export function maxSleeps(room: Room): number {
  const match = room.sleeps.match(/\d+/g);
  return match ? parseInt(match[match.length - 1], 10) : 1;
}

export const PRICE_BOUNDS = {
  min: Math.min(...rooms.map((r) => r.priceIDR)),
  max: Math.max(...rooms.map((r) => r.priceIDR)),
};

export const VIEW_OPTIONS = Array.from(new Set(rooms.map((r) => r.view)));

/* ----------------------------- Filters ----------------------------- */

export type RoomFilters = {
  priceMax: number;
  guests: number;
  views: string[];
};

export const DEFAULT_FILTERS: RoomFilters = {
  priceMax: PRICE_BOUNDS.max,
  guests: 1,
  views: [],
};

export function initialFiltersFromSearch(search: SearchState): RoomFilters {
  const parsedGuests = parseInt(search.guests, 10);
  const guests =
    (GUEST_OPTIONS as readonly string[]).includes(search.guests) &&
    Number.isFinite(parsedGuests)
      ? parsedGuests
      : DEFAULT_FILTERS.guests;
  return { ...DEFAULT_FILTERS, guests };
}

export function filtersAreDefault(filters: RoomFilters): boolean {
  return (
    filters.priceMax === DEFAULT_FILTERS.priceMax &&
    filters.guests === DEFAULT_FILTERS.guests &&
    filters.views.length === 0
  );
}

export function applyFilters(roomList: Room[], filters: RoomFilters): Room[] {
  return roomList.filter((room) => {
    if (room.priceIDR > filters.priceMax) return false;
    if (maxSleeps(room) < filters.guests) return false;
    if (filters.views.length > 0 && !filters.views.includes(room.view)) return false;
    return true;
  });
}

/* ----------------------------- Deterministic gallery / rating / reviews ----------------------------- */

export type GalleryPhoto = { src: string; alt: string };

function roomIndex(room: Room): number {
  const i = rooms.findIndex((r) => r.id === room.id);
  return i === -1 ? 0 : i;
}

function sumCharCodes(value: string): number {
  let sum = 0;
  for (let i = 0; i < value.length; i++) sum += value.charCodeAt(i);
  return sum;
}

export function roomGallery(room: Room): GalleryPhoto[] {
  const offset = roomIndex(room) % img.gallery.length;
  const rotated = img.gallery.slice(offset).concat(img.gallery.slice(0, offset));
  const rest = rotated.slice(0, 4).map((g) => ({ src: g.src, alt: g.alt }));
  return [{ src: room.img.src, alt: `${room.name} — ${room.tagline}` }, ...rest];
}

export function roomRating(room: Room): number {
  const seed = sumCharCodes(room.id);
  // Deterministic value in [4.6, 5.0]
  return Math.round((4.6 + (seed % 41) / 100) * 10) / 10;
}

export function ratingLabel(rating: number): string {
  if (rating >= 4.9) return "Exceptional";
  if (rating >= 4.7) return "Excellent";
  if (rating >= 4.4) return "Very Good";
  return "Good";
}

export function roomReviews(room: Room): Testimonial[] {
  const offset = roomIndex(room) % testimonials.length;
  return testimonials.slice(offset).concat(testimonials.slice(0, offset));
}

/* ----------------------------- Date formatting ----------------------------- */

export function formatDateID(value: string): string {
  const date = fromDateKey(value);
  if (!date) return "";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ----------------------------- Booking request ----------------------------- */

export type BookingRequestDetails = {
  fullName: string;
  whatsapp: string;
  notes: string;
};

export type BookingRequestErrors = Partial<
  Record<keyof BookingRequestDetails, string>
>;

const PHONE_RE = /^\+?[\d\s-]{9,15}$/;

export function validateBookingRequest(
  details: BookingRequestDetails,
): BookingRequestErrors {
  const errors: BookingRequestErrors = {};
  if (!details.fullName.trim()) errors.fullName = "Please tell us your name.";
  if (!details.whatsapp.trim()) {
    errors.whatsapp = "Please add a WhatsApp or phone number.";
  } else if (!PHONE_RE.test(details.whatsapp.trim())) {
    errors.whatsapp = "Please enter a valid phone number.";
  }
  return errors;
}

export function buildWhatsAppBookingUrl(args: {
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: string;
  details: BookingRequestDetails;
}): string {
  const { room, checkIn, checkOut, guests, details } = args;
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * room.priceIDR;

  const lines = [
    `Hi Kayon Ridge! I'd like to book a room.`,
    ``,
    `*Room:* ${room.name} (${room.size}, ${room.view})`,
    `Check-in: ${formatDateID(checkIn)}`,
    `Check-out: ${formatDateID(checkOut)}`,
    `Nights: ${nights}`,
    `Guests: ${guests}`,
    `Rate: ${priceFmt(room.priceIDR)} / night`,
    `*Total: ${priceFmt(total)}*`,
    ``,
    `Name: ${details.fullName}`,
    `WhatsApp: ${details.whatsapp}`,
    ...(details.notes.trim() ? [`Notes: ${details.notes.trim()}`] : []),
  ];

  const message = encodeURIComponent(lines.join("\n"));
  const number = CONTACT.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${message}`;
}
