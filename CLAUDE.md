# Garden Gate Garden Club Website

Static website for the **Garden Gate Garden Club (GGGC)**, a nonprofit garden club in Hockessin, Delaware.

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
| **Fonts**       | Dancing Script (club name), Playfair Display (headings), Inter (body) via Google Fonts |
| **Transitions** | Astro View Transitions API + IntersectionObserver scroll fade-in |

---

## Project Structure

```
src/
├── pages/                         # File-based routes (each .astro → a URL)
│   ├── index.astro                # / (home)
│   ├── about.astro                # /about
│   ├── resources.astro            # /resources (tips, native plants, local gardens)
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
│   ├── Header.astro               # Sticky nav with scroll-direction reveal, two-line club name (Dancing Script), dropdown for Members, mobile hamburger
│   ├── Footer.astro               # 3-column footer with nav links, club name in Dancing Script
│   ├── AwardCard.astro            # Award display card
│   ├── JudgeRow.astro             # Judge list item
│   ├── OfficerCard.astro          # Board officer card
│   ├── ProjectCard.astro          # Community service project card
│   └── ContactForm.astro          # Formspree contact form
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
public/                            # Static assets (images, favicon, manifest)
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
  - Sticky `position: sticky; top: 0` with scroll-direction reveal (hides on scroll down, shows on scroll up via `-translate-y-full` toggle).
  - Two-line stacked club name in **Dancing Script** (`font-script`) as home link — no separate "Home" nav link.
  - Desktop nav has hover dropdown for "Members" (sub-items: Member Gardens, Awards & Judges).
  - Mobile hamburger with collapsible sub-items.
  - The scroll-reveal script uses `requestAnimationFrame` for performance.
- **Footer** (`src/components/Footer.astro`): Flat list of all nav links, club name in Dancing Script.
- **Nav order**: About, Resources, Community Service, Members (dropdown), Membership, Contact.
- Nav links are defined as arrays at the top of **both** Header.astro and Footer.astro. **Update both** when adding/removing pages.

### Styling
All styling is Tailwind utility classes. No CSS modules or separate stylesheets.

**Fonts** (defined in `tailwind.config.mjs` → `fontFamily`):

| Token        | Font             | Usage                                |
|--------------|------------------|--------------------------------------|
| `font-script`| Dancing Script   | Club name in header, footer, hero    |
| `font-heading`| Playfair Display| Section headings, card titles        |
| `font-body`  | Inter            | Body text (default)                  |

**Theme colors** (defined in `tailwind.config.mjs` → `colors`):

| Token          | Hex       | Usage                                |
|----------------|-----------|--------------------------------------|
| `primary`      | `#2D5F3E` | Headers, buttons, links (forest green)|
| `background`   | `#F5F1EB` | Page background (cream)              |
| `text`         | `#3A3A3A` | Body text (charcoal)                 |
| `accent`       | `#7B9E6B` | Borders, badges (sage green)         |
| `blossom`      | `#F2AABF` | Active nav, hero accents (pink)      |
| `blossom-deep` | `#E07899` | Deeper pink for emphasis             |
| `holly`        | `#C41E3A` | Status badges, DFGC badges (red)     |
| `holly-light`  | `#F7D7DD` | Soft holly tint                      |
| `hen`          | `#A8C8E0` | Card borders, highlights (blue)      |
| `coral`        | `#E8574F` | Bright accents (coral-red)           |
| `sunflower`    | `#F4C430` | Highlights (yellow)                  |
| `lavender`     | `#C5A8D4` | Emeritus judge sections (purple)     |
| `marigold`     | `#F28C28` | Warm accents (orange)                |

**Common UI patterns** (copy these for consistency):

```
Hero sections:      relative bg-primary text-background py-16 sm:py-24 overflow-hidden  (+ overlay image)
Content containers: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16
Cards:              bg-white rounded-xl border border-accent/20 shadow-sm p-6 hover:shadow-md transition-shadow
Section headings:   font-heading text-3xl font-bold text-text mb-8
Subtitle labels:    text-blossom text-xs font-semibold uppercase tracking-widest mb-3
Decorative dividers: <div class="flex items-center gap-3 mb-4">
                       <div class="h-px flex-1 bg-gradient-to-r from-blossom/30 to-transparent"></div>
                       <span class="text-blossom text-xs font-semibold uppercase tracking-widest">Label</span>
                       <div class="h-px flex-1 bg-gradient-to-l from-blossom/30 to-transparent"></div>
                     </div>
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

---

## How to Add a New Page

1. Create `src/pages/your-page.astro` (or `src/pages/section/your-page.astro` for nested).
2. Import and wrap content with `BaseLayout`, passing `title` and `description`.
3. Follow the hero section + content container pattern from existing pages.
4. Add `class="fade-in-section"` to content sections for scroll animation.
5. Add the route to nav arrays in **both** `Header.astro` and `Footer.astro`.
6. If the page uses data, import from `src/data/index` only.

## How to Add a New Data Type

1. Define the Zod schema in `src/data/schema.ts`.
2. Create the JSON file in `src/data/`.
3. Import, parse, and export in `src/data/index.ts`.
4. Import the exported data in your page/component from `src/data/index`.

## How to Add Images

1. Drop image files into `public/` (any format: jpg, png, webp, avif).
2. Reference in templates as `src="/filename.jpg"` (no `public/` prefix).
3. Use `loading="eager"` for hero/above-fold images, `loading="lazy"` for everything else.
4. For hover-zoom effect: wrap in `overflow-hidden` div, add `transition-transform duration-500 group-hover:scale-105` to `<img>`.

**Page hero images are optimized** and handled differently from content images:
- Put the hero source file in `src/assets/heroes/` (not `public/`).
- Pass it to `PageHero` with the same public-style string, e.g. `image="/my-hero.jpg"` — `PageHero` resolves the filename to the imported asset and emits an optimized, responsive WebP `<Image>`. A filename with no match in `src/assets/heroes/` falls back to a plain `<img>` from `public/`.
- The home hero (`src/pages/index.astro`) uses `getImage()` directly for its art-directed mobile/desktop `<picture>`.
- Content images (cards, galleries) still use plain `<img>` from `public/` — migrating those to `astro:assets` is tracked as a backlog item.

## Resources Page Structure

The Resources page (`src/pages/resources.astro`) has three sections, each with its own data array defined in the frontmatter:

1. **Gardening Tips** (`gardeningTips[]`) — 6 cards in a 3-column grid with large photos (h-64 sm:h-72).
2. **Native Plants of Delaware** (`nativePlants[]`) — 5 cards in a 2-column grid with large photo placeholders (h-72 sm:h-80). Each card has a colored gradient background. **To add real photos**: replace the placeholder `<div>` with an `<img>` tag.
3. **Local Gardens to Visit** (`localGardens[]`) — 3 horizontal cards with side-by-side photo + text layout.

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
| Add/edit gardening tips     | `src/pages/resources.astro` (frontmatter)    |
| Add/edit native plants      | `src/pages/resources.astro` (frontmatter)    |
| Add/edit local gardens      | `src/pages/resources.astro` (frontmatter)    |
| SEO / meta tags             | `src/layouts/BaseLayout.astro`               |
| Contact form                | `src/components/ContactForm.astro`           |
