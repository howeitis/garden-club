# Garden Gate Garden Club Website

Static website for the **Garden Gate Garden Club (GGGC)**, a nonprofit garden club in Greenville, Delaware, founded in September 1963.

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
| **Content**     | Astro content collections — one Markdown/YAML file per item under `src/content/`, Zod-validated |
| **Editing**     | Pages CMS (app.pagescms.org) — git-backed admin configured by `.pages.yml` |
| **Types**       | TypeScript + Zod schema validation                 |
| **Deployment**  | Vercel (`vercel.json`) — `gardengategardenclub.com` |
| **Forms**       | Web3Forms relay → club Gmail inbox                 |
| **Fonts**       | Cormorant Garamond (headings, wordmark, folio numerals), Inter (body, 18px base) — self-hosted via `@fontsource-variable` |
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
│   │   ├── index.astro            # /members (member gardens + Member of the Month callout)
│   │   ├── member-of-the-month/
│   │   │   ├── index.astro        # /members/member-of-the-month (current honoree + archive; canonical → current slug)
│   │   │   └── [slug].astro       # /members/member-of-the-month/<slug> (permanent per-honoree page)
│   │   └── awards-and-judges.astro # /members/awards-and-judges
│   ├── membership.astro           # /membership
│   ├── contact.astro              # /contact
│   ├── thank-you.astro            # /thank-you (form redirect)
│   └── 404.astro                  # Custom 404
├── layouts/
│   └── BaseLayout.astro           # Master layout: Header, Footer, SEO, JSON-LD, View Transitions, global CSS (fade-in, hero-rise, reduced motion, focus styles)
├── components/
│   ├── Header.astro               # Fixed light-ivory nav: color crest + serif wordmark, small-caps links with gold active underline, Resources/Members dropdowns, mobile hamburger, scroll-direction reveal
│   ├── Footer.astro               # Deep-green 4-column footer (identity, Explore, Resources, theme); links every page
│   ├── PageHero.astro             # Interior hero: photo + accent-tinted wash, bottom-left display title, entrance animation (accent prop — see below)
│   ├── Breadcrumb.astro           # Subpage trail + BreadcrumbList JSON-LD (items prop, Home implied)
│   ├── SectionHeader.astro        # Gold small-caps eyebrow + optional oversized italic folio numeral (number prop)
│   ├── Flourish.astro             # Botanical sprig divider (tone: light | dark)
│   ├── Button.astro               # The one button style: variant primary|light|outline|outline-light, arrow, href or type=submit
│   ├── ArrowIcon.astro            # The thin → used after link labels (direction, class)
│   ├── Prose.astro                # Typography wrapper for editor-written Markdown (<Content /> or html prop)
│   ├── LandingCard.astro          # Unboxed section link: text + staggered 2x2 photo cluster (flip, eyebrowColor props)
│   ├── OfficerCard.astro          # Unboxed officer entry with rotating accent rule (officer entry, index)
│   ├── ProjectCard.astro          # Editorial feature row for a project entry (flip prop)
│   ├── GardenCard.astro           # Editorial feature row for a garden entry (flip prop)
│   ├── PlantCard.astro            # Open gallery entry for a plant entry (badge from data.type)
│   ├── AwardCard.astro            # Award the club *gives* (CEW): criteria/winners side by side
│   ├── MemberProfile.astro        # Member of the Month feature article (chapters from the Markdown body) + "by the numbers" strip
│   ├── HonoreeGrid.astro          # Grid of honorees linking to their permanent pages
│   ├── JudgeRow.astro             # Plain list row; parent supplies divide-y/border
│   ├── SmartImage.astro           # Resolves public-style path → optimized responsive WebP <Image>; fails the build on a missing file
│   └── ContactForm.astro          # Web3Forms contact form (unboxed)
├── content/                       # ALL editable content — see "Content Layer"
│   ├── members-of-the-month/*.md  # one per honoree (newest `date` = current)
│   ├── projects/*.md · officers/*.md · member-gardens/*.md · awards/*.md
│   ├── judges/*.md · plants/*.md · gardens/*.md · gardening-tips/*.md
│   ├── settings/                  # club.yml · contact.yml · meetings.yml · affiliations.yml
│   └── pages/                     # editable paragraphs per page (home.yml, about.yml, …)
├── content.config.ts              # defineCollection + Zod schema for every collection (plain-English error messages)
├── data/
│   └── index.ts                   # Reads collections once; exports sorted lists, settings, getPageCopy(), derived values
└── lib/
    ├── assetImages.ts             # Resolves "/file.jpg" strings → imported ImageMetadata
    ├── markdown.ts                # marked → HTML for Markdown inside YAML text fields (block / inline)
    └── memberOfTheMonth.ts        # honoreePath(), honoreeShareImage() for MOTM URLs and OG images
.pages.yml                         # Pages CMS admin config — labels, descriptions, dropdowns; mirrors content.config.ts
scripts/check-images.mjs           # Pre-build lint of src/assets/content (size, filename); wired via "prebuild"
public/                            # Logos, favicons, OG image only (photos live in src/assets/)
```

---

## Key Architecture Decisions

### Content Layer

**Every editable thing is a file under `src/content/`**, read through Astro content collections.

- **Lists** (projects, honorees, officers, judges, awards, member gardens, plants, gardens, gardening tips) are **one Markdown file per item**: frontmatter for the fields, the body for the description. Adding an item = adding a file. Items sort by an `order` number (honorees by `date`, newest first).
- **Settings** (`src/content/settings/*.yml`) and **page copy** (`src/content/pages/*.yml`) are single YAML files. Each declares which one it is (`file: club`, `page: about`) so a misnamed file fails loudly.
- **`src/content.config.ts` is the schema.** Zod with `required_error` / `errorMap` messages written for club members ("`type` must be native or invasive"). Optional fields go through `optional()` / `optionalString`, which treat `""` and empty objects as absent — the CMS writes blanks for untouched fields.
- **`src/data/index.ts` is the only import point for pages.** It awaits the collections once at module load and exports plain values: `club`, `contact`, `meetings`, `affiliations`, the sorted lists, `currentMemberOfTheMonth`, `honoreePeriod()`, `getPageCopy('about')`, `foundingYear`, `foundingDateISO`. Pages never call `getCollection` themselves.
- **Markdown bodies render via `render(entry)` → `<Content />`**, wrapped in `<Prose>` for house typography. Markdown inside YAML strings (About history, intros with *italics*) goes through `block()` / `inline()` from `src/lib/markdown.ts` and `set:html`.
- **`.pages.yml` is the admin's mirror of the schema.** Same field names, plus labels/descriptions/dropdown labels. **Any field you add or rename must be changed in both `content.config.ts` and `.pages.yml`.** The CMS commits straight to `main`; a bad save fails the build (site unchanged) with the message from the schema.
- Photos live in `src/assets/content/` (any JPG/PNG/WebP; the CMS uploads there) and are referenced as `/filename.jpg`. `scripts/check-images.mjs` runs before every build and fails on >8 MB or unsafe filenames, warns >3 MB.

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
- Nav links are defined as arrays at the top of **both** Header.astro (`navLinks`) and Footer.astro (`navColumns`, which lists every subpage too). **Update both** when adding/removing pages.

### Styling
All styling is Tailwind utility classes. No CSS modules or separate stylesheets (global keyframes/reset live in `BaseLayout.astro`).

**Fonts** — self-hosted variable fonts imported in `BaseLayout.astro` from `@fontsource-variable/*` (no Google Fonts request). Family names in `tailwind.config.mjs` → `fontFamily` must match the `@font-face` names those packages declare:

| Token         | Font                          | Usage                                        |
|---------------|-------------------------------|----------------------------------------------|
| `font-heading`| "Cormorant Garamond Variable" | Display titles, section headings, wordmark, folio numerals (italic), prices |
| `font-body`   | "Inter Variable"              | Body text (default, 18px base)               |

The one exception to utility-only styling is the scoped `<style>` in `MemberProfile.astro`, which styles the Markdown-rendered chapters (CSS counters for the folio numerals) because those elements can't carry classes.
| `font-script` | Cormorant Garamond | Legacy alias — the cursive wordmark was retired; do not use in new code |

**Theme colors** (defined in `tailwind.config.mjs` → `colors`) — all drawn from the crest logo:

| Token          | Hex       | Usage                                              |
|----------------|-----------|----------------------------------------------------|
| `primary`      | `#2A5434` | Deep gate green: buttons, footer, wordmark          |
| `background`   | `#FAF7F0` | Warm ivory page ground                             |
| `text`         | `#33322C` | Warm ink body text                                 |
| `gold`         | `#856B2E` | **Primary accent**: eyebrows, hairlines, folio numerals |
| `gold-soft`    | `#DCC68E` | Gold for dark grounds (hero eyebrows, footer labels)|
| `accent`       | `#7A9367` | Sage foliage: flourish leaves, native-plant accents |
| `blossom`      | `#D9A0AE` | Dusty peach-blossom pink (rules, dots, quote marks) |
| `blossom-deep` | `#A65868` | Blossom for text on light grounds                  |
| `holly`        | `#8E3B45` | Refined holly-berry burgundy: badges, stat accents  |
| `holly-light`  | `#F2E4E2` | Soft holly tint                                    |
| `hen`          | `#A9BFCE` | Muted slate blue (dots, hero tints)                |
| `coral`        | `#B96A57` | Muted terracotta (rarely used)                     |
| `sunflower`    | `#C9A24B` | Light antique gold (rules)                          |
| `lavender`     | `#A79BB8` | Muted garden lavender (hero tints)                 |
| `marigold`     | `#8F6826` | Deep ochre gold: frequency labels, stat accents     |

**Color discipline:** gold is the workhorse accent; the other hues appear as *single deliberate touches* (one per element, rotating across siblings). Never reintroduce multi-color gradients or per-section rainbow theming.

**Contrast floors (WCAG AA, measured against the ivory ground):** `gold`, `marigold`, and `gold-soft` were darkened/lightened to pass 4.5:1 for small text — don't lighten them. Muted text is `text-text/70` at minimum (4.84:1); `/65` and below fail for anything under 18px. On the green footer, `text-background/70` is the floor. `accent` (sage) fails at 3.2:1 and is only used for large display numerals and decorative strokes.

**Common UI patterns** (copy these for consistency):

```
Interior hero:      <PageHero eyebrow title subtitle image accent /> — accent tints the photo wash
Content containers: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24  (max-w-5xl on narrow pages)
Section heading:    <SectionHeader label="Small Caps Label" number="01" />
                    <h2 class="font-heading text-4xl sm:text-5xl font-semibold tracking-[-0.01em] text-text mb-5">
Intro paragraph:    text-text/75 mb-12 leading-relaxed max-w-2xl
Eyebrow label:      text-gold text-xs font-semibold uppercase tracking-[0.28em]  (0.65–0.68rem/0.2em for small)
Buttons:            <Button href="/x">Label</Button> · variant="light" on green/photo · "outline" secondary ·
                    "outline-light" secondary on green · arrow (→) · arrow="back" · type="submit" for forms
Link arrow:         <ArrowIcon class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
Editor Markdown:    <Prose class="text-text/75"><Content /></Prose>  or  <Prose html={block(copy.history)} />
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
- `BaseLayout.astro` handles: `<title>`, meta description, Open Graph, Twitter Cards, canonical URL, JSON-LD `Organization` schema (with `url`, `logo`, `memberOf`, `nonprofitStatus`).
- Optional BaseLayout props: `canonical` (override, used by the MOTM index), `ogImage` / `ogImageAlt` (page-specific share image), `ogType` (`article` for profiles), `jsonLd` (array of extra schema blocks — `@context` is added for you).
- Subpages render `<Breadcrumb items={[…]} />` under the hero; it emits the matching `BreadcrumbList` schema.
- Sitemap auto-generated by `@astrojs/sitemap`.
- Each page sets `title` and `description` props on BaseLayout. **Titles and descriptions carry place names** ("Greenville, Delaware", "Wilmington, DE", "Delaware (Zone 7a)") — that's the local-search signal; keep them when editing.
- OG image: `public/og-share-v2.png` (1200x630, ~88 KB).
- `BaseLayout` takes a `noindex` prop that emits `<meta name="robots" content="noindex, follow" />`. Used by `/thank-you`, which is also filtered out of the sitemap in `astro.config.mjs`. **Both are required** — excluding a page from the sitemap doesn't stop it being indexed if anything links to it.
- The old `garden-club-eight.vercel.app` host 307-redirects to the custom domain. This is Vercel platform behavior, **not** `vercel.json` — a host-matched redirect rule there was tested and had no effect (the 307 persisted with the rule removed, and ignored both `permanent` and `statusCode`). Don't re-add one; change it under Project → Settings → Domains if a 308 is ever needed.

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
3. Start with `<PageHero>` (pick a fitting `accent`), then a `max-w-6xl … py-20 space-y-24` container.
4. Use `<SectionHeader label number>` + the h2 pattern for each section; add `class="fade-in-section"`.
5. Add the route to nav arrays in **both** `Header.astro` and `Footer.astro`.
6. If the page uses data, import from `src/data/index` only.

## How to Add a New Collection (or a field to one)

1. **`src/content.config.ts`** — add the `defineCollection` (or the field), with a plain-English `required_error` / `errorMap` message. Use `optionalString` / `optional()` for anything not required.
2. **`.pages.yml`** — add the matching collection or field with a `label` and a one-line `description` an editor would understand. Enums become `type: select` with labelled values; Markdown bodies are `component: body`.
3. **`src/data/index.ts`** — export the sorted list (`byOrder(await getCollection('…'))`) and a type alias.
4. Create the folder and at least one file under `src/content/`; run `npx astro sync` so the types exist, then `npm run check`.
5. Use it from a page via `src/data/index` only. Render bodies with `render(entry)` + `<Prose><Content /></Prose>`.
6. Add a row to the "What you can edit" table in `CONTENT_GUIDE.md`.

## How to Add Images

**Photos are optimized through `astro:assets`** — only logos, favicons, and the OG image stay in `public/`.
- Put the source file in `src/assets/` (heroes in `src/assets/heroes/`, everything else in `src/assets/content/`).
- **Content images** (galleries, feature rows, inline): use the `SmartImage` component (`src/components/SmartImage.astro`) instead of `<img>`. Pass a public-style string, e.g. `<SmartImage src="/metzlers.webp" alt="…" />`. It resolves the filename to the imported asset via `src/lib/assetImages.ts` and emits a responsive WebP `<Image>`; anything it can't find (still in `public/`) falls back to a plain `<img>`. Optional `widths` / `sizes` props tune the srcset. Extra attributes (`class`, `class:list`, `style`, `loading`, `onerror`, …) pass straight through.
- **Page heroes**: pass the string to `PageHero` as `image="/my-hero.jpg"` — same resolver.
- The home hero (`src/pages/index.astro`) uses `getImage()` directly for its art-directed mobile/desktop `<picture>`.
- Content files reference images by the same `/filename.ext` string (`image: /photo.jpg`) — just drop the source in `src/assets/content/`. Plain JPG/PNG is fine; conversion to WebP happens at build. `SmartImage` throws at build time if the file doesn't exist.
- Use `loading="eager"` only for above-fold hero images; everything else `loading="lazy"`.

## Member of the Month

One Markdown file per honoree in `src/content/members-of-the-month/`. **The newest `date` is the current honoree** (`currentMemberOfTheMonth`); `showDate: false` hides the month label ("Featured Member" instead).

- **Every honoree gets a permanent page** at `/members/member-of-the-month/<file-id>/` (`[slug].astro`, via `getStaticPaths`). This is the URL to share on social — it carries the honoree's portrait as the OG image and a `Person` schema, and it keeps working after they roll off the index.
- `/members/member-of-the-month/` (`index.astro`) shows the current honoree in full plus a "Past Honorees" grid, and **canonicalizes to the current honoree's slug URL** so the two never compete in search.
- The current honoree also feeds the callout on `/members` and the teaser on the home page; both link to the permanent URL via `honoreePath()`.
- **The story is the Markdown body.** Each `## Heading` is a chapter; `MemberProfile.astro` renders `<Content />` inside `.story` and styles the h2s as small-caps chapter labels with CSS-counter folio numerals (01, 02…), a drop cap on the first paragraph, and hairlines between chapters. Inline links are ordinary Markdown links.
- Frontmatter: `name`, `date`, `showDate`, `headline` / `tagline` (two-line display title), `summary` (one line for teasers), `portrait { image, alt, caption?, focus? }`, optional `secondPhoto`, `stats[]` (≤4 `{ value, label }`), optional `note { text, linkText?, link? }`.

## Resources Section Structure

`/resources` is a landing page of three `LandingCard` links (descriptions from `pages/resources.yml`). The three subpages read their lists from collections and split them by a field:

1. **`resources/gardening-tips.astro`** — `gardeningTips` split by `section: fundamentals | rhythms`.
2. **`resources/plants.astro`** — `plants` split by `type: native | invasive`.
3. **`resources/gardens.astro`** — `gardens` split by `region: local | regional`.

## Key Files to Edit for Common Tasks

| Task                        | File(s)                                      |
|-----------------------------|----------------------------------------------|
| Any content (text, lists, photos) | `src/content/**` — or the club does it in Pages CMS |
| Club info / mission / theme | `src/content/settings/club.yml`              |
| Officers / board            | `src/content/officers/*.md` (`name: TBD` hides a role) |
| Meeting schedule / dues     | `src/content/settings/meetings.yml`          |
| Awards or judges            | `src/content/awards/*.md` (`type: received` → trophy list by `year`; `given` → `AwardCard`), `src/content/judges/*.md` |
| Member of the Month         | `src/content/members-of-the-month/*.md` (+ photos in `src/assets/content/`) |
| Page paragraphs / hero subtitles | `src/content/pages/<page>.yml`          |
| What a field *is* (validation, labels) | `src/content.config.ts` **and** `.pages.yml` |
| Update nav links            | `Header.astro` AND `Footer.astro`            |
| Change theme colors         | `tailwind.config.mjs`                        |
| Change fonts                | `tailwind.config.mjs` + the `@fontsource-variable` imports in `BaseLayout.astro` |
| Hero wash tints             | `WASHES` in `src/components/PageHero.astro`  |
| SEO / meta tags             | `src/layouts/BaseLayout.astro`               |
| Contact form                | `src/components/ContactForm.astro` (+ `PUBLIC_WEB3FORMS_KEY` in Vercel) |
| Production domain           | `astro.config.mjs` AND `public/robots.txt`   |
| Photo size limits           | `scripts/check-images.mjs`                   |
