# Garden Gate Garden Club Website

Static website for the **Garden Gate Garden Club (GGGC)**, a nonprofit garden club in Greenville, Delaware, founded in September 1963.

---

## Quick Start

```bash
npm install
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

A `.claude/launch.json` is configured so `preview_start` can launch the dev server by name.

---

## Tech Stack

| Layer           | Tool                                              |
|-----------------|----------------------------------------------------|
| **Framework**   | Astro 5 — static output, file-based routing        |
| **Styling**     | Tailwind CSS 3, utility-only (no CSS modules)      |
| **Types**       | TypeScript + Zod schema validation                 |
| **Deployment**  | Vercel (`vercel.json`)                             |
| **Fonts**       | Cormorant Garamond (headings, wordmark, folio numerals), Inter (body, 18px base) via Google Fonts |
| **Transitions** | Astro View Transitions API + IntersectionObserver scroll fade-in + hero entrance animation |

---

## Design System — "Heritage Editorial"

The design is built around the club's watercolor crest logo (`public/gggc-clean.png`): a wrought-iron gate with peach blossoms, holly, and gold scrollwork. Every color comes from that artwork. The overall feel is a well-set gardening annual: large serif display type, letterspaced small-caps labels, fine gold hairlines, and content set directly on the warm-ivory page ground rather than in white boxes.

**Core principles:**

1. **Unboxed layouts.** Content sits on the ivory background separated by gold hairlines (`divide-gold/20`, `border-gold/25`). White containers are the exception, not the default.
2. **One accent hue per element.** Color appears as deliberate single accents (a pink numeral, a sage dot), often rotating across siblings — never as competing tints fighting on one element.
3. **Editorial feature rows.** Lists of rich items (projects, gardens) alternate image/text sides down the page via a `flip` prop.
4. **Typographic scale.** Page titles up to `text-8xl`, section headings `text-4xl sm:text-5xl`, both with `tracking-[-0.01em]`. Headings get `text-wrap: balance` globally.
5. **Signature ornaments.** The `Flourish` botanical sprig (sage leaves + blossom bud between gold hairlines), the blossom→gold→sage gradient hairline (hero bottom edges, footer top), oversized italic folio numerals (`01`, `02`, …), drop caps, and corner-bracket quote frames. No emoji anywhere.

---

## Project Structure

```
src/
├── pages/                         # File-based routes (each .astro → a URL)
│   ├── index.astro                # / (home)
│   ├── about.astro                # /about
│   ├── resources.astro            # /resources (landing: links to 3 subpages)
│   ├── resources/
│   │   ├── gardening-tips.astro   # /resources/gardening-tips
│   │   ├── plants.astro           # /resources/plants (natives + invasives)
│   │   └── gardens.astro          # /resources/gardens (local + regional)
│   ├── community-service.astro    # /community-service
│   ├── members/
│   │   ├── index.astro            # /members (member gardens)
│   │   └── awards-and-judges.astro # /members/awards-and-judges
│   ├── membership.astro           # /membership
│   ├── contact.astro              # /contact
│   ├── thank-you.astro            # /thank-you (form redirect)
│   └── 404.astro                  # Custom 404
├── layouts/
│   └── BaseLayout.astro           # Master layout: Header, Footer, SEO, JSON-LD, View Transitions, global CSS (fade-in, hero-rise, reduced motion, focus styles)
├── components/
│   ├── Header.astro               # Fixed light-ivory nav: color crest + serif wordmark, small-caps links with gold active underline, Resources/Members dropdowns, mobile hamburger, scroll-direction reveal
│   ├── Footer.astro               # Deep-green 3-column footer, serif wordmark, Est. line, tri-color signature hairline on top
│   ├── PageHero.astro             # Interior hero: photo + accent-tinted wash, bottom-left display title, entrance animation (accent prop — see below)
│   ├── SectionHeader.astro        # Gold small-caps eyebrow + optional oversized italic folio numeral (number prop)
│   ├── Flourish.astro             # Botanical sprig divider (tone: light | dark)
│   ├── LandingCard.astro          # Unboxed section link: text + staggered 2x2 photo cluster (flip, eyebrowColor props)
│   ├── OfficerCard.astro          # Unboxed officer entry with rotating accent rule (index prop)
│   ├── ProjectCard.astro          # Editorial feature row for projects (flip prop)
│   ├── GardenCard.astro           # Editorial feature row for gardens to visit (flip prop)
│   ├── PlantCard.astro            # Open gallery entry (variant: native | banned)
│   ├── AwardCard.astro            # Hairline-anchored award entry, criteria/winners side by side
│   ├── JudgeRow.astro             # Plain list row; parent supplies divide-y/border
│   ├── SmartImage.astro           # Resolves public-style path → optimized responsive WebP <Image>
│   └── ContactForm.astro          # Formspree contact form (unboxed)
└── data/
    ├── schema.ts                  # Zod schemas (types + validation)
    ├── index.ts                   # Single import point for all data
    ├── clubInfo.json              # Club name, mission, theme, membership stats
    ├── contact.json               # Email, mailing address, social links
    ├── meetings.json              # Schedule, time blocks, dues
    ├── affiliations.json          # NGC, region, state affiliations
    ├── officers.json              # Board members with roles and bios
    ├── awards.json                # DFGC & GGGC awards with criteria
    ├── judges.json                # Certified judges (active & emeritus)
    └── projects.json              # Community service projects
public/                            # Logos, favicons, OG image only (photos live in src/assets/)
```

---

## Key Architecture Decisions

### Data Layer
- **All data lives in `src/data/*.json`** files validated by Zod schemas in `schema.ts`.
- **Single import point**: Components import only from `src/data/index.ts`, never from individual JSON files.
- **Build-time validation**: Malformed JSON fails the build with clear Zod errors.
- To **add/edit content**: modify the JSON files. To **change structure**: update `schema.ts` first, then `index.ts`, then the JSON.

### Routing
- **File-based**: add a `.astro` file in `src/pages/` to create a route.
- **Nested routes** use folders (e.g. `src/pages/members/awards-and-judges.astro` → `/members/awards-and-judges`).
- **Redirects** configured in `astro.config.mjs` (e.g. `/awards-and-judges` → `/members/awards-and-judges`).

### Navigation
- **Header** (`src/components/Header.astro`):
  - Fixed, light ivory (`bg-background/95 backdrop-blur`), dark-green text, gold shadow hairline.
  - Full-color crest (`/gggc-clean.png`) + serif "Garden Gate" wordmark with a small-caps "Garden Club · Est. 1963" tagline (Est. hidden on mobile).
  - Scroll-direction reveal (hides on scroll down, shows on scroll up via `-translate-y-full` toggle, `requestAnimationFrame`-throttled).
  - Desktop nav: small-caps letterspaced links, gold underline on active; hover dropdowns for "Resources" and "Members".
  - Mobile hamburger with collapsible sub-items and gold left-rule active state.
- **Footer** (`src/components/Footer.astro`): deep green, white crest, serif wordmark, "Greenville, Delaware · Est. 1963" line, Explore links, theme quote. Topped by the tri-color signature hairline.
- **Nav order**: About, Community Service, Resources (dropdown), Members (dropdown), Membership, Contact.
- Nav links are defined as arrays at the top of **both** Header.astro and Footer.astro. **Update both** when adding/removing pages.

### Styling
All styling is Tailwind utility classes. No CSS modules or separate stylesheets (global keyframes/reset live in `BaseLayout.astro`).

**Fonts** (defined in `tailwind.config.mjs` → `fontFamily`):

| Token         | Font               | Usage                                        |
|---------------|--------------------|----------------------------------------------|
| `font-heading`| Cormorant Garamond | Display titles, section headings, wordmark, folio numerals (italic), prices |
| `font-body`   | Inter              | Body text (default, 18px base)               |
| `font-script` | Cormorant Garamond | Legacy alias — the cursive wordmark was retired; do not use in new code |

**Theme colors** (defined in `tailwind.config.mjs` → `colors`) — all drawn from the crest logo:

| Token          | Hex       | Usage                                              |
|----------------|-----------|----------------------------------------------------|
| `primary`      | `#2A5434` | Deep gate green: buttons, footer, wordmark          |
| `background`   | `#FAF7F0` | Warm ivory page ground                             |
| `text`         | `#33322C` | Warm ink body text                                 |
| `gold`         | `#8F7433` | **Primary accent**: eyebrows, hairlines, folio numerals |
| `gold-soft`    | `#C9AE6A` | Gold for dark grounds (hero eyebrows, footer labels)|
| `accent`       | `#7A9367` | Sage foliage: flourish leaves, native-plant accents |
| `blossom`      | `#D9A0AE` | Dusty peach-blossom pink (rules, dots, quote marks) |
| `blossom-deep` | `#A65868` | Blossom for text on light grounds                  |
| `holly`        | `#8E3B45` | Refined holly-berry burgundy: badges, stat accents  |
| `holly-light`  | `#F2E4E2` | Soft holly tint                                    |
| `hen`          | `#A9BFCE` | Muted slate blue (dots, hero tints)                |
| `coral`        | `#B96A57` | Muted terracotta (rarely used)                     |
| `sunflower`    | `#C9A24B` | Light antique gold (rules)                          |
| `lavender`     | `#A79BB8` | Muted garden lavender (hero tints)                 |
| `marigold`     | `#A87B2F` | Deep ochre gold: frequency labels, stat accents     |

**Color discipline:** gold is the workhorse accent; the other hues appear as *single deliberate touches* (one per element, rotating across siblings). Never reintroduce multi-color gradients or per-section rainbow theming.

**Common UI patterns** (copy these for consistency):

```
Interior hero:      <PageHero eyebrow title subtitle image accent /> — accent tints the photo wash
Content containers: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24  (max-w-5xl on narrow pages)
Section heading:    <SectionHeader label="Small Caps Label" number="01" />
                    <h2 class="font-heading text-4xl sm:text-5xl font-semibold tracking-[-0.01em] text-text mb-5">
Intro paragraph:    text-text/75 mb-12 leading-relaxed max-w-2xl
Eyebrow label:      text-gold text-xs font-semibold uppercase tracking-[0.28em]  (0.65–0.68rem/0.2em for small)
Primary button:     inline-flex items-center gap-2.5 bg-primary text-background text-[0.8rem] font-semibold
                    uppercase tracking-[0.18em] px-9 py-4 rounded-sm hover:bg-[#1f4128] transition-colors
                    duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
Entry separators:   parent: divide-y divide-gold/20 · rows: py-14 first:pt-0 last:pb-0
Editorial row:      grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center; image md:col-span-5 (or 7),
                    text the rest; alternate sides with flip / md:order-2
Unboxed table/list: border-t border-gold/25 header rule + divide-y divide-primary/10 rows
Hairline aside:     border-l-2 border-gold/50 pl-7 (italic note)
Divider ornament:   <Flourish /> (light) or <Flourish tone="dark" /> on green/photo
Signature line:     h-[2px] bg-gradient-to-r from-blossom/70 via-gold-soft/70 to-accent/70
```

### PageHero accent tints
`PageHero` accepts `accent` (default `"green"`): `blossom · sage · gold · holly · hen · lavender · marigold`. It selects a color-tinted wash gradient over the hero photo that blends into the brand's deep green at the bottom. **Match the accent to the hue used on the page** (current map: about=blossom, membership=marigold, community-service=sage, resources=gold, gardening-tips=marigold, plants=sage, gardens=hen, members=lavender, awards=holly, contact=hen). New tints are added to the `WASHES` record in `PageHero.astro` — the classes must remain literal strings so Tailwind's scanner picks them up.

### Page Transitions & Scroll Animations
- **Astro View Transitions** are enabled in `BaseLayout.astro` via `<ClientRouter />` with custom `fadeSlideIn`/`fadeSlideOut` keyframes.
- **Scroll fade-in**: add `class="fade-in-section"` to a `<section>` to fade+rise it on scroll. The IntersectionObserver re-initializes after every view transition (`astro:page-load`).
- **Hero entrance**: `hero-rise` (+ `hero-rise-2/3/4` for stagger delays) animates hero content upward on arrival.
- **Reduced motion**: all of the above are disabled under `prefers-reduced-motion: reduce` (see the global `<style>` in BaseLayout). Any new animation must be added to that block.

### SEO
- `BaseLayout.astro` handles: `<title>`, meta description, Open Graph, Twitter Cards, canonical URL, JSON-LD Organization schema.
- Sitemap auto-generated by `@astrojs/sitemap`.
- Each page sets `title` and `description` props on BaseLayout.
- OG image: `public/og-share-v2.png` (1200x630, ~88 KB).

---

## How to Add a New Page

1. Create `src/pages/your-page.astro` (or `src/pages/section/your-page.astro` for nested).
2. Import and wrap content with `BaseLayout`, passing `title` and `description`.
3. Start with `<PageHero>` (pick a fitting `accent`), then a `max-w-6xl … py-20 space-y-24` container.
4. Use `<SectionHeader label number>` + the h2 pattern for each section; add `class="fade-in-section"`.
5. Add the route to nav arrays in **both** `Header.astro` and `Footer.astro`.
6. If the page uses data, import from `src/data/index` only.

## How to Add a New Data Type

1. Define the Zod schema in `src/data/schema.ts`.
2. Create the JSON file in `src/data/`.
3. Import, parse, and export in `src/data/index.ts`.
4. Import the exported data in your page/component from `src/data/index`.

## How to Add Images

**Photos are optimized through `astro:assets`** — only logos, favicons, and the OG image stay in `public/`.
- Put the source file in `src/assets/` (heroes in `src/assets/heroes/`, everything else in `src/assets/content/`).
- **Content images** (galleries, feature rows, inline): use the `SmartImage` component (`src/components/SmartImage.astro`) instead of `<img>`. Pass a public-style string, e.g. `<SmartImage src="/rosegarden.webp" alt="…" />`. It resolves the filename to the imported asset via `src/lib/assetImages.ts` and emits a responsive WebP `<Image>`; anything it can't find (still in `public/`) falls back to a plain `<img>`. Optional `widths` / `sizes` props tune the srcset. Extra attributes (`class`, `class:list`, `style`, `loading`, `onerror`, …) pass straight through.
- **Page heroes**: pass the string to `PageHero` as `image="/my-hero.jpg"` — same resolver.
- The home hero (`src/pages/index.astro`) uses `getImage()` directly for its art-directed mobile/desktop `<picture>`.
- Data files (`projects.json`, plant/garden arrays, etc.) reference images by the same `/filename.ext` string — just drop the source in `src/assets/content/`.
- Use `loading="eager"` only for above-fold hero images; everything else `loading="lazy"`.

## Resources Section Structure

`/resources` is a landing page of three `LandingCard` links (each with its own `eyebrowColor` and alternating `flip`). The content lives on three subpages, each with data arrays defined in frontmatter:

1. **`resources/gardening-tips.astro`** — `evergreenTips[]` + `gardenRhythms[]` (open gallery grids, marigold frequency labels).
2. **`resources/plants.astro`** — `nativePlants[]` (blossom bloom badges) + `bannedPlants[]` (holly "Invasive" badges).
3. **`resources/gardens.astro`** — `localGardens[]` + `regionalGardens[]` (alternating `GardenCard` feature rows).

## Key Files to Edit for Common Tasks

| Task                        | File(s)                                      |
|-----------------------------|----------------------------------------------|
| Change club info/mission    | `src/data/clubInfo.json`                     |
| Update officers/board       | `src/data/officers.json`                     |
| Edit meeting schedule       | `src/data/meetings.json`                     |
| Modify awards or judges     | `src/data/awards.json`, `src/data/judges.json`|
| Update nav links            | `Header.astro` AND `Footer.astro`            |
| Change theme colors         | `tailwind.config.mjs`                        |
| Change fonts                | `tailwind.config.mjs` + Google Fonts link in `BaseLayout.astro` |
| Hero wash tints             | `WASHES` in `src/components/PageHero.astro`  |
| Add/edit gardening tips     | `src/pages/resources/gardening-tips.astro`   |
| Add/edit native plants      | `src/pages/resources/plants.astro`           |
| Add/edit gardens to visit   | `src/pages/resources/gardens.astro`          |
| Featured member gardens     | `src/pages/members/index.astro` (frontmatter)|
| SEO / meta tags             | `src/layouts/BaseLayout.astro`               |
| Contact form                | `src/components/ContactForm.astro`           |
