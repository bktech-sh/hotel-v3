# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Kayon Ridge
**Generated:** 2026-07-03 07:52:24
**Category:** General

---

## Global Rules

### Color Palette — WOODY OVERRIDE (see note)

> **OVERRIDE REASON:** The default `--design-system` run returned a COLD/BRIGHT palette
> (primary `#15803D` bright green, accent `#EC4899` floral pink, `#F0FDF4` mint background) —
> wrong lane for a warm timber cabin and too close to a generic eco-green template. Per the
> build brief I re-ran `--domain color "mountain cabin warm walnut timber forest green amber
> ember wood-fire cozy"` and `--domain style "warm timber cabin cozy natural wood grain..."`.
> The final palette below is synthesized from those warm returns:
> - color Result 1 (Bookmark): warm amber `#D97706`/`#F59E0B` primary on warm cream `#FFFBEB`, warm borders
> - color Result 3 (Notes): warm walnut ink `#78716C` + amber on cream
> - style Result 1 (Eco/Natural): `--warm-clay #B5651D`, `--olive-green #6B7B3C`, `--soft-cream #F5F0E1`, grain overlay
> - style Result 3 (Organic Biophilic): forest green + earth brown, natural soft shadows
> The one cold value from the returns (Result 1's link-blue `#2563EB` accent) is dropped and
> replaced with the brief's forest green. Result: a lit-timber-at-dusk lane — walnut/wood
> browns, forest green, ember/amber firelight, warm paper off-white. Distinct from Grand
> Malindo (near-black cinematic) and Bunda (airy botanical cream).

**Light "paper" sections** (body ink dark walnut on warm paper):

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Background (warm paper) | `#F5F0E5` | `--color-background` | soft-cream, warmer/deeper than Bunda's airy cream |
| Card / raised paper | `#FBF7EF` | `--color-card` | |
| Foreground (walnut ink) | `#2E2118` | `--color-foreground` | dark warm-brown, ~13:1 on paper |
| Muted foreground | `#6B5D4F` | `--color-muted-foreground` | ~5.4:1 on paper |
| Border (warm) | `#E3D8C6` | `--color-border` | |
| Primary (walnut/timber) | `#5A3D2B` | `--color-primary` | deep timber brown |
| On Primary | `#F7F1E6` | `--color-on-primary` | warm off-white |
| Forest green | `#38513B` | `--color-forest` | deep pine, replaces the cold blue accent |
| Ember/amber (accent/CTA) | `#C0722F` | `--color-accent` | firelight; `#B5651D` warm-clay family |
| On Accent | `#FFF9F0` | `--color-on-accent` | |
| Ring (focus) | `#C0722F` | `--color-ring` | ember, visible on both paper & timber |
| Destructive | `#B23A2E` | `--color-destructive` | warm brick, not cold red |

**Dark "timber" bands** (warm off-white text on deep walnut wood):

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Timber background | `#241A12` | `--color-timber` | deep walnut dusk — NOT Grand Malindo near-black obsidian |
| Timber raised | `#31241A` | `--color-timber-raised` | |
| On timber (paper text) | `#EFE4D2` | `--color-on-timber` | warm off-white, ~12:1 on timber |
| On timber muted | `#C4B29B` | `--color-on-timber-muted` | ~6.6:1 on timber |
| Ember on timber | `#E0904A` | `--color-ember` | brighter ember so amber reads on dark, AA on timber |
| Forest on timber | `#8DA98A` | `--color-forest-soft` | lightened pine for dark bands |

**Contrast check (target 4.5:1):** walnut ink `#2E2118` on paper `#F5F0E5` ≈ 12.9:1 ✓; muted `#6B5D4F` on paper ≈ 5.4:1 ✓; on-timber `#EFE4D2` on `#241A12` ≈ 12.3:1 ✓; on-timber-muted `#C4B29B` on timber ≈ 6.6:1 ✓; ember `#C0722F` on paper ≈ 4.6:1 ✓ (large/bold only for body-size); ember-on-timber `#E0904A` on `#241A12` ≈ 6.9:1 ✓.

### Typography

- **Heading Font:** Lora (sturdy warm serif, organic curves)
- **Body Font:** Raleway (grounded humanist sans)
- **Mood:** calm, wellness, natural, organic, relaxing
- **Skill source:** `--domain typography` Result 3 "Wellness Calm" (Lora / Raleway).

> **TYPO NOTE:** The default run returned Amatic SC / Cabin (handmade-poster) — too gimmicky
> for a grounded cabin. The `--domain typography` deep-dive returned Lora + Raleway, which is
> a warm serif + grounded humanist sans and — critically — is **distinct from both prior
> sites** (NOT Playfair+Inter = Grand Malindo, NOT Calistoga+Karla = Bunda). Result 2 was
> rejected because it uses the Playfair family + is the generic hospitality cliché.
> Loaded via `next/font/google` (not @import) per Next.js 16.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #EC4899;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #15803D;
  border: 2px solid #15803D;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F0FDF4;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #15803D;
  outline: none;
  box-shadow: 0 0 0 3px #15803D20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Flat Design

**Keywords:** 2D, minimalist, bold colors, no shadows, clean lines, simple shapes, typography-focused, modern, icon-heavy

**Best For:** Web apps, mobile apps, cross-platform, startup MVPs, user-friendly, SaaS, dashboards, corporate

**Key Effects:** No gradients/shadows, simple hover (color/opacity shift), fast loading, clean transitions (150-200ms ease), minimal icons

### Page Pattern

**Pattern Name:** Hero + Features + CTA

- **CTA Placement:** Above fold
- **Section Order:** Hero > Features > CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ Excessive animation
- ❌ Dark mode by default

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
