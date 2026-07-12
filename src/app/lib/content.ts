/* Kayon Ridge — content + verified Unsplash imagery.
   All photo IDs verified 200 OK. Intrinsic width/height set per image to
   prevent CLS. Replace with commissioned photography before launch (see NOTEs).
   Unsplash base carries ?auto=format&fit=crop&... — the reason next.config
   omits `search` on the remotePattern (Next 16 would otherwise 400 these). */

const U = (id: string, w: number, q = 82) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const img = {
  // Hero — misty pine valley / cabin at dusk. COMMISSION: replace with a real
  // dusk shot of the villa on the ridge, fireplace glow in the windows.
  hero: {
    src: U("1476514525535-07fb3b4ae5f1", 2000, 70),
    width: 2000,
    height: 1333,
    alt: "Mist settling over a pine-forested ridge at dusk above the Lembang valley",
  },
  // Story — warm timber cabin interior
  story: {
    src: U("1449158743715-0a90ebb6d2d8", 1400),
    width: 1400,
    height: 1750,
    alt: "The warm timber interior of a mountain cabin, lit low against the evening",
  },
  storyForest: {
    src: U("1441974231531-c6227db76b6e", 1200),
    width: 1200,
    height: 1500,
    alt: "Tall pines catching the last light on the forest floor",
  },
  // Rooms
  rooms: [
    {
      id: "gunungan",
      name: "Gunungan Loft",
      meaning: "“the tree of life” — the room up under the eaves",
      tagline: "The tree-of-life room, up under the eaves",
      blurb:
        "A warm loft bedroom under timber beams, with a low window onto the pines. Wake to birdsong and the smell of woodsmoke from the kitchen below.",
      size: "48 m²",
      sleeps: "2 guests · 1 queen",
      view: "Valley & pine canopy",
      priceIDR: 2_450_000,
      img: {
        src: U("1600607687939-ce8a6c25118c", 1200),
        width: 1200,
        height: 900,
        alt: "A warm loft bedroom with timber beams and a low window onto the pines",
      },
    },
    {
      id: "pinus",
      name: "Rumah Pinus",
      meaning: "“pine house” — a forest-floor suite",
      tagline: "Forest-floor suite with a private timber deck",
      blurb:
        "A calm suite in warm neutral tones opening onto a private timber deck, forest right at the door. Good for a slow week of remote work by the window.",
      size: "62 m²",
      sleeps: "2–3 guests · 1 king",
      view: "Pine forest, west-facing",
      priceIDR: 3_200_000,
      img: {
        src: U("1600566753086-00f18fb6b3ea", 1200),
        width: 1200,
        height: 900,
        alt: "A calm suite in warm neutral tones opening toward the forest",
      },
    },
    {
      id: "kebun-teh",
      name: "Kebun Teh Villa",
      meaning: "“tea garden villa” — our two-bedroom family house",
      tagline: "Two-bedroom family house over the tea garden",
      blurb:
        "A spacious two-bedroom villa over the tea garden, wood floors and soft textiles throughout, with room enough for the whole family and the valley view below.",
      size: "95 m²",
      sleeps: "4–5 guests · 2 bedrooms",
      view: "Tea gardens & valley below",
      priceIDR: 4_850_000,
      img: {
        src: U("1618221195710-dd6b41faaea6", 1200),
        width: 1200,
        height: 900,
        alt: "A spacious warm-lit villa living space with wood floors and soft textiles",
      },
    },
  ],
  // Experiences
  fireplace: {
    src: U("1520250497591-112f2f40a3f4", 1100),
    width: 1100,
    height: 733,
    alt: "A wood fire burning low in a stone hearth inside the villa",
  },
  soak: {
    src: U("1571003123894-1f0594d2b5d9", 1100),
    width: 1100,
    height: 733,
    alt: "Steam rising from an outdoor hot soak tub set among trees",
  },
  coffee: {
    src: U("1495474472287-4d71bcdd2085", 1100),
    width: 1100,
    height: 733,
    alt: "A slow pour-over of local highland coffee on a wooden counter",
  },
  dinner: {
    src: U("1543007630-9710e4a00a20", 1100),
    width: 1100,
    height: 733,
    alt: "A wood-fired dinner laid out on a long timber table",
  },
  // Gallery
  gallery: [
    {
      src: U("1518602164578-cd0074062767", 1000),
      width: 1000,
      height: 1250,
      alt: "The timber villa exterior glowing warm against the dusk forest",
    },
    {
      src: U("1470071459604-3b5ec3a7fe05", 1000),
      width: 1000,
      height: 667,
      alt: "Morning fog pouring through the valley below the ridge",
    },
    {
      src: U("1587061949409-02df41d5e562", 1000),
      width: 1000,
      height: 667,
      alt: "Neat rows of a highland tea garden climbing the hillside",
    },
    {
      src: U("1519710164239-da123dc03ef4", 1000),
      width: 1000,
      height: 1250,
      alt: "A clear night sky thick with stars over the mountain",
    },
    {
      src: U("1542314831-068cd1dbfeeb", 1000),
      width: 1000,
      height: 667,
      alt: "A small wooden cabin tucked into the pine forest",
    },
    {
      src: U("1564501049412-61c2a3083791", 1000),
      width: 1000,
      height: 1250,
      alt: "A mountain villa framed by tall trees and soft cloud",
    },
  ],
} as const;

export const rooms = img.rooms;

export const experiences = [
  {
    key: "fireplace",
    title: "The fire is always lit",
    body: "Come down before dusk. We keep the hearth going from four o'clock, and dinner is wood-fired — smoke, embers, and whatever the garden gave us that morning.",
    image: img.fireplace,
  },
  {
    key: "walks",
    title: "Forest & tea-garden walks",
    body: "Step out the door onto soft pine needles. A gentle loop through the tea gardens takes an hour; the ridge trail to the valley overlook takes two, and we'll pack you coffee for it.",
    image: img.dinner,
  },
  {
    key: "soak",
    title: "An outdoor hot soak",
    body: "The mountain air runs cold after sundown. Ease into the wood-fired soaking tub under the trees while the mist comes up the valley — the good kind of cold-then-warm.",
    image: img.soak,
  },
  {
    key: "coffee",
    title: "Local coffee & craft",
    body: "Beans grown a ridge over, roasted in Lembang, poured slow. Ask at the kitchen and someone will show you how we brew it — and where the good warungs are.",
    image: img.coffee,
  },
] as const;

export const testimonials = [
  {
    quote:
      "We came to switch off and actually did. The fire, the fog in the morning, coffee on the deck — I didn't open my laptop once, and I meant to.",
    name: "Dian & Rangga",
    detail: "Two nights in the Gunungan Loft",
  },
  {
    quote:
      "The kids ran wild in the pines and slept like logs. The staff felt like family who happened to have a very warm house on a mountain.",
    name: "The Wibowo family",
    detail: "Kebun Teh Villa, long weekend",
  },
  {
    quote:
      "As a remote worker I've stayed everywhere. Fast wifi, but the real luxury was the quiet and the wood-smoke. I extended twice.",
    name: "Sarah L.",
    detail: "A working week in Rumah Pinus",
  },
] as const;

export const press = [
  "Featured in DestinAsian",
  "Condé Nast Traveller — Where to go in West Java",
  "Manual Jakarta · Highland Escapes",
  "Whitespace Journal",
] as const;

export const priceFmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export const CONTACT = {
  address: "Jalan Punclut Ridge KM 4, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391",
  province: "West Java (Jawa Barat), Indonesia",
  phone: "+62 22 123 4567",
  whatsapp: "+62 812 3456 7890",
  email: "stay@kayonridge.id",
  airportCode: "BDO",
  airportName: "Husein Sastranegara",
  transferMins: "70 minutes",
};
