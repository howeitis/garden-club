# Garden Gate Garden Club Website

Static website for the **Garden Gate Garden Club (GGGC)**, a nonprofit garden club in Hockessin, Delaware.

Live at **https://gardengategardenclub.com** (Vercel-registered domain). The domain is hardcoded as `site` in `astro.config.mjs` and mirrored in the `Sitemap:` line of `public/robots.txt` — **change both together**. `SITE_URL` overrides it; it is deliberately not derived from `VERCEL_URL` (that's the per-deployment hostname and would leak into canonicals).

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
| **Deployment**  | Vercel (`vercel.json`) — `gardengategardenclub.com` |
| **Forms**       | Web3Forms relay → club Gmail inbox                 |
| **Fonts**       | Cormorant Garamond (headings + wordmark), Inter (body) via Google Fonts |
| **Images**      | `astro:assets` — sources in `src/assets/`, resolved via `SmartImage` / `assetImages.ts` |
| **Transitions** | Astro View Transitions API + IntersectionObserver scroll fade-in |

**Design system**: a "heritage editorial" look built around the club's watercolor crest — deep gate-green, antique gold, dusty blossom rose, and holly burgundy on warm ivory. Content sits directly on the ivory ground separated by gold hairlines (`border-gold/20`, `divide-gold/20`); there are **no white card boxes**. Decorative accents use the `Flourish` botanical divider, never emoji.

---

## Project Structure

```
src/
├── pages/                         # File-based routes (each .astro → a URL)
│   ├── index.astro                # / (home)
│   ├── about.astro                # /about
│   ├── resources.astro            # /resources (landing page linking to sub-pages)
│   ├── resources/
│   │   ├── gardening-tips.astro   # /resources/gardening-tips
│   │   ├── plants.astro           # /resources/plants (native & banned plants)
│   │   └── gardens.astro          # /resources/gardens (local gardens to visit)
│   ├── community-service.astro    # /community-service
│   ├── members/
│   │   ├── index.astro            # /members (member gardens)
│   │   └── awards-and-judges.astro # /members/awards-and-judges
│   ├── membership.astro           # /membership
│   ├── contact.astro              # /contact
│   ├── thank-you.astro            # /thank-you (form redirect)
│   └── 404.astro                  # Custom 404
├── layouts/
│   └── BaseLayout.astro           # Master layout: Header, Footer, SEO, JSON-LD, View Transitions, scroll fade-in
├── components/
│   ├── Header.astro               # Fixed ivory nav: watercolor crest + serif wordmark, dropdowns for Resources & Members, mobile hamburger
│   ├── Footer.astro               # Deep-green 3-column footer: white logo, serif wordmark, Est. 1963, affiliations bar
│   ├── PageHero.astro             # Interior-page hero: full-bleed photo under green wash, display-scale title bottom-left
│   ├── SectionHeader.astro        # Gold letterspaced eyebrow label, optional italic folio numeral ("01", "02", …)
│   ├── Flourish.astro             # Botanical sprig divider between gold hairlines (tone="light"|"dark")
│   ├── SmartImage.astro           # Resolves public-style path strings to optimized astro:assets images
│   ├── LandingCard.astro          # Open photo-cluster composition linking to a sub-page (resources landing)
│   ├── GardenCard.astro           # Member / local garden feature row
│   ├── PlantCard.astro            # Native plant gallery entry
│   ├── AwardCard.astro            # Hairline-anchored award entry with criteria & winners
│   ├── JudgeRow.astro             # Judge list item
│   ├── OfficerCard.astro          # Board officer list item (gold-rule)
│   ├── ProjectCard.astro          # Community service full-width photo/text feature row
│   └── ContactForm.astro          # Web3Forms contact form (hairline column rule, no card)
├── lib/
│   └── assetImages.ts             # Glob-imports src/assets/**, maps "/filename.ext" → imported asset
├── assets/
│   ├── heroes/                    # Page hero source images (optimized at build)
│   └── content/                   # All other photo sources (cards, galleries, inline)
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
public/                            # Only logos, favicons, manifest, robots.txt, OG image
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
- **Nested routes** use folders (e.g., `src/pages/members/awards-and-judges.astro` → `/members/awards-and-judges`).
- **Redirects** configured in `astro.config.mjs` (e.g., `/awards-and-judges` → `/members/awards-and-judges`).

### Navigation
- **Header** (`src/components/Header.astro`):
  - Fixed ivory bar (`fixed top-0`, `bg-background/95 backdrop-blur-md`) with scroll-direction reveal (hides on scroll down, shows on scroll up via `-translate-y-full` toggle, driven by `requestAnimationFrame`).
  - Home link is the watercolor crest (`/gggc-clean.png`) plus a serif wordmark: "Garden Gate" in `font-heading` over a small-caps gold "Garden Club · Est. 1963" line. No separate "Home" nav link.
  - Nav links are letterspaced small-caps with a gold underline on the active page.
  - Desktop hover dropdowns for **Resources** (Gardening Tips, Plants, Gardens to Visit) and **Members** (Member Gardens, Awards & Judges).
  - Mobile hamburger with collapsible sub-items.
- **Footer** (`src/components/Footer.astro`): Deep-green (`bg-primary`) 3-column footer with the white logo (`/gggcwhitelogo.png`), serif wordmark, and an affiliations bar. Footer nav lists **only top-level pages** — subpages are reachable via the header dropdowns.
- **Nav order**: About, Community Service, Resources (dropdown), Members (dropdown), Membership, Contact.
- Nav links are defined as arrays at the top of **both** Header.astro and Footer.astro. **Update both** when adding/removing pages.

### Styling
All styling is Tailwind utility classes. No CSS modules or separate stylesheets.

**Fonts** (defined in `tailwind.config.mjs` → `fontFamily`; loaded via Google Fonts in `BaseLayout.astro`):

| Token         | Font              | Usage                                          |
|---------------|-------------------|------------------------------------------------|
| `font-heading`| Cormorant Garamond| Headings, wordmark, display type, folio numerals |
| `font-body`   | Inter             | Body text (default)                            |
| `font-script` | Cormorant Garamond| **Legacy alias** — the cursive wordmark was retired; renders the heading serif |

**Theme colors** (defined in `tailwind.config.mjs` → `colors` — heritage palette drawn from the club's watercolor crest):

| Token          | Hex       | Usage                                        |
|----------------|-----------|----------------------------------------------|
| `primary`      | `#2A5434` | Deep gate green — footer, hero wash, buttons |
| `background`   | `#FAF7F0` | Warm ivory page ground                       |
| `text`         | `#33322C` | Warm ink body text                           |
| `accent`       | `#7A9367` | Sage foliage                                 |
| `gold`         | `#8F7433` | Antique-gold scrollwork — **primary accent**: hairlines, eyebrows, active nav |
| `gold-soft`    | `#C9AE6A` | Lighter gold for rules on dark grounds       |
| `blossom`      | `#D9A0AE` | Dusty peach-blossom pink                     |
| `blossom-deep` | `#A65868` | Deep blossom for text on light grounds       |
| `holly`        | `#8E3B45` | Refined holly-berry burgundy (badges)        |
| `holly-light`  | `#F2E4E2` | Soft holly tint                              |
| `hen`          | `#A9BFCE` | Muted slate blue                             |
| `coral`        | `#B96A57` | Muted terracotta                             |
| `sunflower`    | `#C9A24B` | Antique gold, light                          |
| `lavender`     | `#A79BB8` | Muted garden lavender (emeritus judges)      |
| `marigold`     | `#A87B2F` | Deep ochre gold                              |

There is also a `tracking-label` letterSpacing token (`0.24em`) for small-caps eyebrow labels.

**Common UI patterns** (copy these for consistency — the design is *unboxed*: no white cards, no rounded corners, no drop shadows on content):

```
Page heroes:        use <PageHero eyebrow="…" title="…" subtitle="…" image="/my-hero.jpg" />
Content containers: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20
Section headings:   font-heading text-4xl sm:text-5xl font-semibold tracking-[-0.01em] text-text
Eyebrow labels:     use <SectionHeader label="…" number="01" /> (gold small-caps + optional folio numeral)
Dividers:           use <Flourish /> (light grounds) or <Flourish tone="dark" /> (green/photo grounds)
List separation:    divide-y divide-gold/20  (gold hairlines between entries, not boxed cards)
Feature rows:       alternating full-width photo/text rows, image side flipping down the page
Small-caps text:    text-xs font-semibold uppercase tracking-[0.2em]–[0.3em] (gold on light, gold-soft on dark)
```

### Page Transitions & Scroll Animations
- **Astro View Transitions** are enabled in `BaseLayout.astro` via `<ClientRouter />`.
- Page transitions use custom `fadeSlideIn` / `fadeSlideOut` keyframe animations on `::view-transition-old(root)` and `::view-transition-new(root)`.
- **Scroll fade-in**: Add `class="fade-in-section"` to any `<section>` to make it fade + slide up when scrolled into view. The `IntersectionObserver` is initialized on load and re-initialized after every view transition via `astro:after-swap`.

### SEO
- `BaseLayout.astro` handles: `<title>`, meta description, Open Graph, Twitter Cards, canonical URL, JSON-LD Organization schema.
- Sitemap auto-generated by `@astrojs/sitemap`.
- Each page sets `title` and `description` props on BaseLayout.
- OG image: `public/og-share-v2.png` (1200x630, ~88 KB).

### Contact Form
`ContactForm.astro` POSTs to `https://api.web3forms.com/submit`, which emails submissions to the club inbox (`gardengate.communications@gmail.com`). No server, no database.

- The access key comes from `import.meta.env.PUBLIC_WEB3FORMS_KEY` (set in Vercel; `.env.example` documents it). It's public by design — it ships in the HTML — but lives in an env var so it can be rotated without a code change.
- **If the key is unset, the component renders a `mailto:` fallback instead of the form.** Never let it emit a form that would silently drop messages. This is why local and CI builds pass without the key.
- Reserved Web3Forms field names: `access_key`, `subject`, `from_name`, `redirect`, `botcheck`. The visitor's own subject input is named **`user_subject`** to avoid colliding with the reserved `subject` (which sets the notification email's subject line).
- `botcheck` is a visually hidden checkbox honeypot; Web3Forms discards submissions where it's checked.
- Success redirects to `/thank-you` via an absolute URL built from `Astro.site`.

---

## How to Add a New Page

1. Create `src/pages/your-page.astro` (or `src/pages/section/your-page.astro` for nested).
2. Import and wrap content with `BaseLayout`, passing `title` and `description`.
3. Open with `<PageHero eyebrow="…" title="…" subtitle="…" image="/…" />`, then follow the content container pattern from existing pages.
4. Add `class="fade-in-section"` to content sections for scroll animation.
5. Add the route to nav arrays in **both** `Header.astro` and `Footer.astro`.
6. If the page uses data, import from `src/data/index` only.

## How to Add a New Data Type

1. Define the Zod schema in `src/data/schema.ts`.
2. Create the JSON file in `src/data/`.
3. Import, parse, and export in `src/data/index.ts`.
4. Import the exported data in your page/component from `src/data/index`.

## How to Add Images

**Photos are optimized through `astro:assets`** — only logos, favicons, and the OG image stay in `public/`. Use hyphenated filenames (no spaces). Use `loading="eager"` for hero/above-fold images, `loading="lazy"` for everything else.
- Put the source file in `src/assets/` (heroes in `src/assets/heroes/`, everything else in `src/assets/content/`).
- **Content images** (cards, galleries, inline): use the `SmartImage` component (`src/components/SmartImage.astro`) instead of `<img>`. Pass the same public-style string, e.g. `<SmartImage src="/rosegarden.webp" alt="…" />`. It resolves the filename to the imported asset via `src/lib/assetImages.ts` and emits a responsive WebP `<Image>`; anything it can't find (still in `public/`) falls back to a plain `<img>`. Optional `widths` / `sizes` props tune the srcset. Extra attributes (`class`, `class:list`, `style`, `loading`, `onerror`, …) pass straight through.
- **Page heroes**: pass the string to `PageHero` as `image="/my-hero.jpg"` — it uses the same resolver.
- The home hero (`src/pages/index.astro`) uses `getImage()` directly for its art-directed mobile/desktop `<picture>`.
- Data files (`projects.json`, plant/garden arrays, etc.) keep referencing images by the same `/filename.ext` string — no changes needed there. Just drop the source in `src/assets/content/`.

## Resources Section Structure

Resources is a landing page (`src/pages/resources.astro`) with three `LandingCard` links to sub-pages. Content lives as data arrays in each sub-page's frontmatter:

1. **Gardening Tips** (`src/pages/resources/gardening-tips.astro`) — `evergreenTips[]` and `gardenRhythms[]`, rendered as open gallery entries (photo, serif title, text — no card chrome).
2. **Native & Banned Plants** (`src/pages/resources/plants.astro`) — `nativePlants[]` and `bannedPlants[]`, rendered as open gallery entries.
3. **Gardens to Visit** (`src/pages/resources/gardens.astro`) — `localGardens[]`, rendered as alternating full-width photo/text feature rows.

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
| Add/edit gardening tips     | `src/pages/resources/gardening-tips.astro` (frontmatter) |
| Add/edit native/banned plants | `src/pages/resources/plants.astro` (frontmatter) |
| Add/edit local gardens      | `src/pages/resources/gardens.astro` (frontmatter) |
| SEO / meta tags             | `src/layouts/BaseLayout.astro`               |
| Contact form                | `src/components/ContactForm.astro` (+ `PUBLIC_WEB3FORMS_KEY` in Vercel) |
| Production domain           | `astro.config.mjs` AND `public/robots.txt`   |
| Section eyebrows / dividers | `src/components/SectionHeader.astro`, `src/components/Flourish.astro` |
| Image resolution / srcsets  | `src/components/SmartImage.astro`, `src/lib/assetImages.ts` |
