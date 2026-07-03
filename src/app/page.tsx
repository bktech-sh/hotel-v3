import Image from "next/image";
import SiteNav from "./components/SiteNav";
import AvailabilityBar from "./components/AvailabilityBar";
import Reveal from "./components/Reveal";
import {
  img,
  rooms,
  experiences,
  testimonials,
  press,
  priceFmt,
} from "./lib/content";
import {
  Flame,
  Tree,
  Mountain,
  Droplet,
  Coffee,
  Stars,
  MapPin,
  Plane,
  Car,
  Leaf,
  Wifi,
  ArrowRight,
  ArrowDown,
  Quote,
  Instagram,
  Mail,
  Phone,
} from "./components/icons";

const expIcon = { fireplace: Flame, walks: Tree, soak: Droplet, coffee: Coffee } as const;

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />

      <main id="main">
        <span id="top" className="sr-only" aria-hidden />

        {/* ============================ HERO ============================ */}
        <section className="relative min-h-[100svh] w-full overflow-hidden bg-timber">
          <Image
            src={img.hero.src}
            alt={img.hero.alt}
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover object-center"
          />
          {/* Warm dusk wash + lower gradient so the greeting reads on any photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(36,26,18,0.42) 0%, rgba(36,26,18,0.15) 35%, rgba(36,26,18,0.55) 72%, rgba(36,26,18,0.9) 100%)",
            }}
            aria-hidden
          />
          {/* extra centered vignette so centered text stays legible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 65% at 50% 48%, rgba(36,26,18,0.5), transparent 72%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(110% 70% at 50% 100%, rgba(192,114,47,0.32), transparent 60%)",
            }}
            aria-hidden
          />

          {/* Hero content: everything centered — eyebrow, headline, copy, and
              the availability card, all stacked and horizontally centered. */}
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1240px] flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-28">
            <p className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-timber/45 px-3.5 py-1.5 text-[0.65rem] font-600 uppercase tracking-[0.2em] text-ember-bright shadow-soft backdrop-blur-sm animate-[fade_1.1s_var(--ease-out-soft)_both] sm:mb-5 sm:px-4 sm:text-sm sm:tracking-[0.28em]">
              <Leaf width={14} height={14} className="flex-none sm:h-4 sm:w-4" />
              Lembang Highlands · West Java
            </p>
            <h1 className="mx-auto max-w-3xl font-serif text-[2rem] font-500 leading-[1.08] text-on-timber xs:text-[2.4rem] sm:text-5xl sm:leading-[1.05] animate-[rise_0.9s_var(--ease-out-soft)_both]">
              Come in from the cold.
              <br />
              <span className="italic text-ember-bright">
                The fire&apos;s already lit.
              </span>
            </h1>
            <p
              className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-on-timber/85 sm:mt-6 sm:max-w-xl sm:text-lg animate-[rise_0.9s_var(--ease-out-soft)_both]"
              style={{ animationDelay: "120ms" }}
            >
              A warm timber house on a pine-forest ridge above Lembang, where the
              coffee is local, the air is cold, and the room is always warm. We
              saved you a chair by the hearth.
            </p>

            {/* Centered availability card */}
            <div
              id="book"
              className="mt-8 flex w-full scroll-mt-28 justify-center animate-[rise_0.9s_var(--ease-out-soft)_both] sm:mt-12"
              style={{ animationDelay: "240ms" }}
            >
              <AvailabilityBar floating />
            </div>
          </div>

          <a
            href="#story"
            aria-label="Scroll to the story section"
            className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-on-timber/70 transition-colors hover:text-on-timber lg:flex"
          >
            Wander in
            <ArrowDown width={16} height={16} />
          </a>
        </section>

        {/* ============================ STORY ============================ */}
        <section id="story" className="grain relative scroll-mt-24 bg-paper">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-10 md:py-24">
            <Reveal className="md:col-span-5 md:pt-8">
              <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember">
                <Flame width={16} height={16} /> Kayon — the tree of life
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                A house named after wood, and shelter.
              </h2>
              <div className="mt-6 space-y-4 text-ink-muted">
                <p>
                  <span className="font-600 text-ink">Kayon</span> comes from{" "}
                  <em>kayu</em> — wood — and from the <em>gunungan</em>, the
                  tree-of-life that opens every shadow-play: the mountain, the
                  forest, the shelter at the centre of things. That is the whole
                  idea of this place.
                </p>
                <p>
                  We built it from timber on a ridge at 1,300 metres, where the
                  pines give way to tea gardens and the valley falls away toward
                  Bandung. Cold mornings, warm rooms. A kettle always on. Nothing
                  here asks you to perform — only to exhale.
                </p>
              </div>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {[
                  ["1,300 m", "on the ridge"],
                  ["6", "timber rooms"],
                  ["70 min", "from Bandung"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="font-serif text-2xl text-walnut">{n}</dt>
                    <dd className="text-xs uppercase tracking-wide text-ink-muted">
                      {l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Asymmetric image pair */}
            <div className="grid grid-cols-5 gap-4 md:col-span-7">
              <Reveal className="col-span-3 self-end" delay={80}>
                <Image
                  src={img.story.src}
                  alt={img.story.alt}
                  width={img.story.width}
                  height={img.story.height}
                  sizes="(max-width: 768px) 60vw, 40vw"
                  className="h-full w-full rounded-lg object-cover shadow-card"
                />
              </Reveal>
              <Reveal className="col-span-2 self-start pt-10" delay={200}>
                <Image
                  src={img.storyForest.src}
                  alt={img.storyForest.alt}
                  width={img.storyForest.width}
                  height={img.storyForest.height}
                  sizes="(max-width: 768px) 40vw, 26vw"
                  className="h-full w-full rounded-lg object-cover shadow-card"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================ ROOMS ============================ */}
        <section id="rooms" className="grain-dark relative scroll-mt-24 bg-timber">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember-bright">
                <Tree width={16} height={16} /> Rooms & villas
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-on-timber sm:text-4xl">
                Six rooms, each with its own patch of forest.
              </h2>
              <p className="mt-4 text-on-timber-muted">
                Every room is timber, wool, and warm light — a bed you sink into
                and a window onto the pines. Rates are per night, breakfast and the
                four-o&apos;clock fire included.
              </p>
            </Reveal>

            <div className="mt-14 space-y-6">
              {rooms.map((room, i) => (
                <Reveal
                  as="article"
                  key={room.id}
                  delay={i * 60}
                  className="group grid overflow-hidden rounded-xl bg-timber-raised ring-1 ring-white/8 md:grid-cols-12"
                >
                  <div
                    className={`relative aspect-[4/3] md:col-span-5 md:aspect-auto ${
                      i % 2 ? "md:order-last" : ""
                    }`}
                  >
                    <Image
                      src={room.img.src}
                      alt={room.img.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-7 md:col-span-7 md:p-10">
                    <div>
                      <h3 className="font-serif text-2xl text-on-timber">
                        {room.name}
                      </h3>
                      <p className="mt-1 text-on-timber-muted">{room.tagline}</p>
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-timber-muted">
                      <li className="flex items-center gap-2">
                        <Leaf width={16} height={16} className="text-forest-soft" />
                        {room.size}
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin width={16} height={16} className="text-forest-soft" />
                        {room.view}
                      </li>
                    </ul>
                    <div className="mt-2 flex flex-wrap items-end justify-between gap-4 border-t border-white/8 pt-5">
                      <p className="text-on-timber">
                        <span className="font-serif text-2xl text-ember-bright">
                          {priceFmt(room.priceIDR)}
                        </span>
                        <span className="text-sm text-on-timber-muted">
                          {" "}
                          / night
                        </span>
                      </p>
                      <a
                        href="#book"
                        className="inline-flex items-center gap-2 rounded-full border border-ember-bright/50 px-5 py-2.5 text-sm font-500 text-on-timber transition-colors hover:border-ember hover:bg-ember hover:text-on-ember cursor-pointer"
                      >
                        Reserve {room.name.split(" ")[0]}
                        <ArrowRight width={16} height={16} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= EXPERIENCES ========================= */}
        <section id="experiences" className="grain relative scroll-mt-24 bg-paper">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember">
                <Flame width={16} height={16} /> Days at the ridge
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                Slow mornings, wood-smoke evenings.
              </h2>
            </Reveal>

            {/* Editorial 2-col with offset rhythm */}
            <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
              {experiences.map((exp, i) => {
                const Icon = expIcon[exp.key as keyof typeof expIcon];
                return (
                  <Reveal
                    as="article"
                    key={exp.key}
                    delay={(i % 2) * 90}
                    className={`flex flex-col ${i % 2 ? "md:mt-16" : ""}`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-card">
                      <Image
                        src={exp.image.src}
                        alt={exp.image.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 46vw"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-5 flex items-center gap-2.5 font-serif text-xl text-ink">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-forest/10 text-forest">
                        <Icon width={18} height={18} />
                      </span>
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-ink-muted">{exp.body}</p>
                  </Reveal>
                );
              })}
            </div>

            {/* Small amenities strip */}
            <Reveal className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-line bg-paper-raised px-7 py-5 text-sm text-ink-muted">
              {(
                [
                  [Stars, "Stargazing deck"],
                  [Wifi, "Fibre wifi for remote work"],
                  [Coffee, "Local roastery & warung guide"],
                  [Droplet, "Wood-fired soaking tub"],
                ] as const
              ).map(([Icon, label]) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon width={18} height={18} className="text-ember" />
                  {label}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ============================ GALLERY ============================ */}
        <section id="gallery" className="grain-dark relative scroll-mt-24 bg-timber">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember-bright">
                  <Mountain width={16} height={16} /> The ridge, in pictures
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-on-timber sm:text-4xl">
                  Fog, firelight, and tall pines.
                </h2>
              </div>
            </Reveal>

            {/* Masonry-ish editorial grid */}
            <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {img.gallery.map((g, i) => (
                <Reveal
                  key={g.src}
                  delay={(i % 3) * 70}
                  className="mb-4 break-inside-avoid"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full rounded-lg object-cover ring-1 ring-white/8"
                  />
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-xs text-on-timber-muted/70">
              Photography placeholders — to be replaced with commissioned images of
              the villa.
            </p>
          </div>
        </section>

        {/* ======================== TESTIMONIALS ======================== */}
        <section className="grain relative bg-paper">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember">
                <Quote width={16} height={16} /> From the guest book
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                What people take home with them.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal
                  as="article"
                  key={t.name}
                  delay={i * 80}
                  className={`flex flex-col rounded-xl border border-line bg-paper-raised p-7 shadow-soft ${
                    i === 1 ? "md:mt-8" : ""
                  }`}
                >
                  <Quote width={28} height={28} className="text-ember/70" />
                  <p className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6 border-t border-line pt-4">
                    <p className="font-600 text-ink">{t.name}</p>
                    <p className="text-sm text-ink-muted">{t.detail}</p>
                  </footer>
                </Reveal>
              ))}
            </div>

            {/* Press strip */}
            <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-line pt-10 text-center">
              {press.map((p) => (
                <span key={p} className="font-serif text-sm italic text-ink-muted/80">
                  {p}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ============================ LOCATION ============================ */}
        <section id="location" className="grain-dark relative scroll-mt-24 bg-timber">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
            <Reveal>
              <p className="flex items-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember-bright">
                <MapPin width={16} height={16} /> Getting here
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-on-timber sm:text-4xl">
                Up the mountain, past the tea gardens.
              </h2>
              <p className="mt-4 text-on-timber-muted">
                We&apos;re on the ridge road above Lembang, north of Bandung. Send
                us your arrival time and we&apos;ll have coffee ready — and, if the
                road is misty, someone to meet you at the last turn.
              </p>

              <ul className="mt-8 space-y-5">
                {(
                  [
                    [
                      Plane,
                      "Husein Sastranegara (BDO)",
                      "Bandung's city airport — about 70 minutes up to the ridge. Kertajati (KJT) is the larger long-haul option, ~2.5 hours.",
                    ],
                    [
                      Car,
                      "From central Bandung",
                      "Roughly 70–90 minutes via Setiabudi and Lembang, depending on weekend traffic. Private transfer on request.",
                    ],
                    [
                      MapPin,
                      "The address",
                      "Jalan Punclut Ridge KM 4, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391.",
                    ],
                  ] as const
                ).map(([Icon, title, body]) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/8 text-ember-bright">
                      <Icon width={20} height={20} />
                    </span>
                    <div>
                      <p className="font-600 text-on-timber">{title}</p>
                      <p className="text-sm text-on-timber-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={120}
              className="relative min-h-[22rem] overflow-hidden rounded-xl ring-1 ring-white/8"
            >
              <Image
                src={img.gallery[1].src}
                alt="The misty valley below the ridge, on the drive up from Lembang"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 46vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-timber/70 to-transparent"
                aria-hidden
              />
              <p className="absolute bottom-5 left-5 right-5 font-serif text-lg text-on-timber">
                6.82°S, 107.60°E — where the pavement ends and the pines begin.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================ FINAL CTA ============================ */}
        <section className="grain relative bg-paper">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="overflow-hidden rounded-2xl bg-walnut px-7 py-14 text-center shadow-card sm:px-12 md:py-20">
              <p className="flex items-center justify-center gap-2 text-sm font-600 uppercase tracking-[0.2em] text-ember-bright">
                <Flame width={16} height={16} /> Your chair by the fire
              </p>
              <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl leading-tight text-on-walnut sm:text-4xl">
                The mountain is cold tonight. Come be warm.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-on-walnut/80">
                Tell us your dates and how many chairs to pull up. We&apos;ll do the
                rest — the fire, the coffee, the quiet.
              </p>
              <div className="mx-auto mt-8 max-w-2xl">
                <AvailabilityBar />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="grain-dark relative bg-timber text-on-timber-muted">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-600 text-on-timber">
                  Kayon
                </span>
                <span className="text-xs uppercase tracking-[0.35em] text-ember-bright">
                  Ridge
                </span>
              </p>
              <p className="mt-4 max-w-xs text-sm">
                A warm timber villa on the ridge above Lembang. Pine forest, tea
                gardens, and the valley below. A place to exhale, not to perform.
              </p>
              <div className="mt-6 flex gap-3">
                {(
                  [
                    [Instagram, "Instagram", "https://instagram.com"],
                    [Mail, "Email us", "mailto:stay@kayonridge.id"],
                    [Phone, "Call us", "tel:+62221234567"],
                  ] as const
                ).map(([Icon, label, href]) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-on-timber transition-colors hover:border-ember hover:bg-ember hover:text-on-ember cursor-pointer"
                  >
                    <Icon width={18} height={18} />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Footer" className="md:col-span-3">
              <h3 className="font-serif text-sm uppercase tracking-wide text-on-timber">
                Visit
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {(
                  [
                    ["#rooms", "Rooms & villas"],
                    ["#experiences", "Days at the ridge"],
                    ["#gallery", "Gallery"],
                    ["#location", "Getting here"],
                  ] as const
                ).map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="transition-colors hover:text-on-timber cursor-pointer"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-5">
              <h3 className="font-serif text-sm uppercase tracking-wide text-on-timber">
                Word from the ridge
              </h3>
              <p className="mt-4 text-sm">
                A slow letter, now and then — when the coffee harvest comes in, or
                the fog is especially good. No noise.
              </p>
              <form
                className="mt-4 flex max-w-sm overflow-hidden rounded-full border border-white/15 bg-white/5"
                aria-label="Newsletter signup"
              >
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-transparent px-5 py-3 text-sm text-on-timber outline-none placeholder:text-on-timber-muted/60"
                />
                <button
                  type="submit"
                  className="flex flex-none items-center gap-1.5 bg-ember px-5 text-sm font-500 text-on-ember transition-colors hover:bg-ember-bright cursor-pointer"
                >
                  Join
                  <ArrowRight width={16} height={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Kayon Ridge · Lembang, West Java, Indonesia.</p>
            <p className="flex flex-wrap gap-x-5 gap-y-1">
              <a href="#" className="hover:text-on-timber cursor-pointer">
                Privacy
              </a>
              <a href="#" className="hover:text-on-timber cursor-pointer">
                House notes
              </a>
              <span>stay@kayonridge.id · +62 22 123 4567</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
