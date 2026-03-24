# Garden Gate Garden Club Website

Static website for the Garden Gate Garden Club (GGGC), a nonprofit garden club in Hockessin, Delaware.

## Quick Start

```bash
npm install
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Tech Stack

- **Framework**: Astro 5 (static output, file-based routing)
- **Styling**: Tailwind CSS 3 with custom theme
- **Type Safety**: TypeScript + Zod schema validation
- **Deployment**: Vercel (config in `vercel.json`)
- **Fonts**: Playfair Display (headings) + Inter (body) via Google Fonts

## Project Structure

```
src/
├── pages/                    # File-based routes (each .astro → a URL)
│   ├── index.astro           # /
│   ├── about.astro           # /about
│   ├── membership.astro      # /membership
│   ├── community-service.astro  # /community-service
│   ├── members/
│   │   ├── index.astro       # /members (member gardens)
│   │   └── awards-and-judges.astro  # /members/awards-and-judges
│   ├── resources.astro       # /resources
│   ├── contact.astro         # /contact
│   ├── thank-you.astro       # /thank-you (form redirect)
│   └── 404.astro             # Custom 404
├── layouts/
│   └── BaseLayout.astro      # Master layout (Header, Footer, SEO, JSON-LD)
├── components/
│   ├── Header.astro          # Sticky nav with scroll-reveal, dropdown for Members, mobile hamburger
│   ├── Footer.astro          # 3-column footer with nav links
│   ├── AwardCard.astro       # Award display card
│   ├── JudgeRow.astro        # Judge list item
│   ├── OfficerCard.astro     # Board officer card
│   ├── ProjectCard.astro     # Community service project card
│   └── ContactForm.astro     # Formspree contact form
└── data/
    ├── schema.ts             # Zod schemas (types + validation)
    ├── index.ts              # Single import point for all data
    ├── clubInfo.json         # Club name, mission, theme, membership stats
    ├── contact.json          # Email, mailing address, social links
    ├── meetings.json         # Schedule, time blocks, dues
    ├── affiliations.json     # NGC, region, state affiliations
    ├── officers.json         # Board members with roles and bios
    ├── awards.json           # DFGC & GGGC awards with criteria
    ├── judges.json           # Certified judges (active & emeritus)
    └── projects.json         # Community service projects
public/                       # Static assets (images, favicon, manifest)
```

## Key Architecture Decisions

### Data Layer
- **All data lives in `src/data/*.json`** files validated by Zod schemas in `schema.ts`
- **Single import point**: Components import only from `src/data/index.ts`, never from individual JSON files
- **Build-time validation**: Malformed JSON fails the build with clear Zod errors
- To add/edit content: modify the JSON files. To change structure: update `schema.ts` first, then `index.ts`, then the JSON

### Routing
- File-based: add a `.astro` file in `src/pages/` to create a route
- Nested routes use folders (e.g., `src/pages/members/awards-and-judges.astro` → `/members/awards-and-judges`)
- Redirects configured in `astro.config.mjs` (e.g., `/awards-and-judges` → `/members/awards-and-judges`)

### Navigation
- **Header** (`src/components/Header.astro`): Sticky header with scroll-direction reveal (hides on scroll down, shows on scroll up). Two-line stacked club name as home link. Desktop nav with hover dropdown for "Members" (sub-items: Member Gardens, Awards & Judges). Mobile hamburger with collapsible sub-items. No dedicated "Home" link — the logo/club name links home.
- **Footer** (`src/components/Footer.astro`): Flat list of all nav links (no Home link)
- Nav order: About, Resources, Community Service, Members (dropdown), Membership, Contact
- Nav links are defined as arrays at the top of each component. **Update both** when adding/removing pages.

### Styling
All styling is Tailwind utility classes. No CSS modules or separate stylesheets.

**Theme colors** (defined in `tailwind.config.mjs`):
| Token          | Hex       | Usage                          |
|----------------|-----------|--------------------------------|
| `primary`      | `#2D5F3E` | Headers, buttons, links        |
| `background`   | `#F5F1EB` | Page background (cream)        |
| `text`         | `#3A3A3A` | Body text (charcoal)           |
| `accent`       | `#7B9E6B` | Borders, badges (sage green)   |
| `blossom`      | `#F2AABF` | Active nav, hero accents (pink)|
| `blossom-deep` | `#E07899` | Deeper pink for emphasis       |
| `holly`        | `#C41E3A` | Status badges, DFGC badges     |
| `holly-light`  | `#F7D7DD` | Soft holly tint                |
| `hen`          | `#A8C8E0` | Card borders, highlights (blue)|
| `coral`        | `#E8574F` | Bright accents                 |
| `sunflower`    | `#F4C430` | Highlights (yellow)            |
| `lavender`     | `#C5A8D4` | Emeritus judge sections        |
| `marigold`     | `#F28C28` | Warm accents (orange)          |

**Common patterns**:
- Hero sections: `relative bg-primary text-background py-16 sm:py-24 overflow-hidden` with overlay image
- Content containers: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`
- Cards: `bg-white rounded-xl border border-accent/20 shadow-sm p-6 hover:shadow-md transition-shadow`
- Section headings: `font-heading text-3xl font-bold text-text mb-8`
- Subtitle labels: `text-blossom text-xs font-semibold uppercase tracking-widest mb-3`

### SEO
- `BaseLayout.astro` handles: `<title>`, meta description, Open Graph, Twitter Cards, canonical URL, JSON-LD Organization schema
- Sitemap auto-generated by `@astrojs/sitemap`
- Each page sets `title` and `description` props on BaseLayout

## How to Add a New Page

1. Create `src/pages/your-page.astro` (or `src/pages/section/your-page.astro` for nested)
2. Import and wrap content with `BaseLayout`, passing `title` and `description`
3. Follow the hero section + content container pattern from existing pages
4. Add the route to nav arrays in both `Header.astro` and `Footer.astro`
5. If the page uses data, import from `src/data/index` only

## How to Add a New Data Type

1. Define the Zod schema in `src/data/schema.ts`
2. Create the JSON file in `src/data/`
3. Import, parse, and export in `src/data/index.ts`
4. Import the exported data in your page/component from `src/data/index`
