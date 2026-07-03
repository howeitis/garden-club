# Garden Gate Garden Club — Website

The official website for the **Garden Gate Garden Club (GGGC)**, a 501(c)(3) nonprofit garden club based in Wilmington, Delaware, founded in September 1963.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) 5 — static site generation |
| Styling | [Tailwind CSS](https://tailwindcss.com) 3 |
| Language | TypeScript 5 (strict mode) |
| Validation | [Zod](https://zod.dev) — all JSON data schema-validated at build time |
| Deployment | [Vercel](https://vercel.com) (static) |
| Forms | [Formspree](https://formspree.io) (contact form) |
| Fonts | Google Fonts — Dancing Script (club name / script), Playfair Display (headings), Inter (body) |

---

## Local Development

### Prerequisites
- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/howeitis/garden-club.git
cd garden-club
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

### Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at localhost:4321 |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Deployment

The site deploys to **Vercel** as a fully static site.

- **Auto-deploy:** Vercel is connected to the GitHub repo and deploys automatically on every push to `main`.
- **CI:** GitHub Actions runs a build check on every push and pull request (see `.github/workflows/ci.yml`).
- **Config:** `vercel.json` at the project root sets the framework, build command, and output directory.

### Vercel Adapter (optional enhancement)
For optimal Vercel integration (edge functions, image optimization), install the Astro Vercel adapter when network access allows:

```bash
npm install @astrojs/vercel
```

Then update `astro.config.mjs`:

```js
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  // ...
});
```

### Production Domain
The `site` value in `astro.config.mjs` is resolved from the `SITE_URL` environment variable (set it in the Vercel dashboard), falling back to `VERCEL_URL`, then to a placeholder for local dev. This value flows into canonical URLs, the sitemap, JSON-LD structured data, and Open Graph image URLs. Once the final domain is confirmed, set `SITE_URL` in Vercel **and** update the `Sitemap:` host in `public/robots.txt` to match.

---

## Project Structure

```
src/
├── pages/                          # File-based routes → URLs
│   ├── index.astro                 # /
│   ├── about.astro                 # /about
│   ├── membership.astro            # /membership
│   ├── community-service.astro     # /community-service
│   ├── contact.astro               # /contact
│   ├── thank-you.astro             # /thank-you (form redirect)
│   ├── 404.astro                   # Custom 404
│   ├── resources.astro             # /resources (landing)
│   ├── resources/
│   │   ├── gardening-tips.astro    # /resources/gardening-tips
│   │   ├── plants.astro            # /resources/plants (native plants)
│   │   └── gardens.astro           # /resources/gardens (local gardens)
│   └── members/
│       ├── index.astro             # /members (member gardens)
│       └── awards-and-judges.astro # /members/awards-and-judges
├── layouts/
│   └── BaseLayout.astro     # Master layout: SEO, JSON-LD, fonts, View Transitions
├── components/
│   ├── Header.astro         # Sticky nav, scroll-reveal, Members dropdown, mobile hamburger
│   ├── Footer.astro         # 3-column footer with nav links
│   ├── PageHero.astro       # Shared hero band for interior pages
│   ├── SectionHeader.astro  # Section heading + decorative divider
│   ├── LandingCard.astro    # Card linking to a sub-section (e.g. resources landing)
│   ├── OfficerCard.astro    # Board member card
│   ├── ProjectCard.astro    # Community service project card
│   ├── GardenCard.astro     # Member / local garden card
│   ├── PlantCard.astro      # Native plant card
│   ├── AwardCard.astro      # Award with collapsible criteria & winners
│   ├── JudgeRow.astro       # Certified judge listing row
│   └── ContactForm.astro    # Formspree-backed contact form
└── data/
    ├── schema.ts            # Zod schemas for all data types
    ├── index.ts             # Validated data exports
    ├── clubInfo.json        # Club name, theme, membership stats
    ├── contact.json         # Email, mailing address, social links
    ├── meetings.json        # Schedule, time blocks, dues, agenda
    ├── affiliations.json    # NGC, regional, state affiliations
    ├── officers.json        # Board member roster
    ├── awards.json          # Award definitions and criteria
    ├── judges.json          # Certified judges list
    └── projects.json        # Community service projects

public/                 # Static assets served at root
├── favicon.svg             # SVG favicon (32×32, primary green + leaf)
├── gggc-hero.png           # Club hero image (used as logo + OG image)
├── ngc-logo.png            # National Garden Clubs logo
├── manifest.json           # PWA web manifest
├── robots.txt              # Crawler directives + sitemap reference
└── [hero + photo images]

.github/workflows/
└── ci.yml              # Build check on push/PR to main

vercel.json             # Vercel deployment configuration
```

---

## Updating Content

All site content lives in `src/data/*.json`. Most updates require **no code changes** — just edit the relevant JSON file and push.

| File | What to update |
|---|---|
| `clubInfo.json` | Club name, annual theme, membership counts, founding dates |
| `officers.json` | Board member names, roles, bios |
| `projects.json` | Community service projects, chairpersons, descriptions, photo paths |
| `awards.json` | Award names, winners, judging criteria |
| `judges.json` | Certified judges, certification level, active/emeritus status |
| `meetings.json` | Meeting schedule, dues amounts, order of business |
| `contact.json` | Primary email, mailing address, social media links |
| `affiliations.json` | NGC, regional, state affiliation details |

### Adding images

Place image files in `public/` using hyphenated filenames (no spaces):

```
public/project-pollinator-garden.jpg   ✓
public/project pollinator garden.jpg   ✗  (spaces break URLs)
```

Reference them in JSON as `/project-pollinator-garden.jpg`.

---

## SEO & Structured Data

Every page includes:

- **JSON-LD** — `Organization` + `LocalBusiness` schema with ISO-formatted founding date
- **Open Graph** — `og:title`, `og:description`, `og:image`, `og:url`
- **Twitter Card** — `summary_large_image` card with matching title/description/image
- **Canonical URLs** — auto-generated from `Astro.site` + pathname
- **Sitemap** — auto-generated at `/sitemap-index.xml` via `@astrojs/sitemap`
- **robots.txt** — at `/robots.txt` with sitemap reference

---

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`)
- ARIA labels on all interactive elements
- `aria-current="page"` on active nav links
- Decorative images marked `aria-hidden="true"` with empty `alt`
- Focus rings (`focus:ring-2`) on all keyboard-navigable elements
- Mobile navigation fully keyboard-accessible

---

## Handoff Notes

Known gaps for whoever picks this up next. The first two need info only the club can provide:

- ⚠️ **Contact form is inactive.** `src/components/ContactForm.astro` still posts to `https://formspree.io/f/YOUR_FORM_ID`. Submissions will fail until this is replaced with the club's real [Formspree](https://formspree.io) endpoint.
- ⚠️ **Production domain not confirmed.** `SITE_URL` (Vercel) and the `Sitemap:` host in `public/robots.txt` currently use the `garden-club-eight.vercel.app` placeholder. Update both once the final domain is live (see [Production Domain](#production-domain)).
- 🖼️ **Image optimization is partially done.** The page heroes (home + the shared `PageHero`) now serve optimized, responsive WebP via `astro:assets` — hero source files live in `src/assets/heroes/` and the 6 MB PNG/JPG originals no longer ship (e.g. `home-hero` 5.9 MB → ~143 KB). **Still to do:** the in-content images (garden/plant/project/tip cards) are plain `<img>` from `public/`. See issue [#9](https://github.com/howeitis/garden-club/issues/9).

### Repo hygiene done in this handoff pass
- `npm run check` (`astro check`) runs as a typecheck gate in CI before the build.
- `.nvmrc` pins Node 20; CI reads the version from it.
- Pruned ~61 MB of unreferenced original/duplicate image assets from `public/`.
- Added an MIT `LICENSE`.

## Backlog

Items on hold pending additional club details or future sprints. **These are now tracked as GitHub issues [#7–#20](https://github.com/howeitis/garden-club/issues)** — the list below is a summary; use the issues for status.

### Product
- [ ] **Fix contact form** — Replace `YOUR_FORM_ID` in `ContactForm.astro` with the real Formspree endpoint
- [ ] **Officers roster** — Populate `officers.json` with full board names, roles, and optional bios
- [ ] **Events calendar** — Add upcoming meeting dates as structured data or a dedicated section
- [ ] **Newsletter signup** — Mailchimp or equivalent embed for email capture
- [ ] **Social links** — Add Facebook and other accounts to `contact.json > socialLinks`
- [ ] **Project images** — Add photo file paths to `imageReference` fields in `projects.json`

### Design
- [ ] **Club logo** — Replace `gggc-hero.png` with a proper emblem-sized logo (SVG preferred); update header, footer, favicon, and `og:image`
- [ ] **Photo gallery** — Surface `club.jpg`, `club-2.jpg`, `longwood.jpg`, `flower.jpg`, and `joy-ericson.jpeg` in a gallery on the About or Home page
- [ ] **Award card icons** — Replace emoji (🏅 🥇 📅) with SVG icons for a more polished awards page

### SEO
- [ ] **Production domain** — Update `site` in `astro.config.mjs` once domain is confirmed; also update `robots.txt` sitemap URL
- [ ] **Analytics** — Add Plausible or Fathom (privacy-friendly, lightweight)

### Engineering
- [ ] **Astro `<Image />` component** — Replace plain `<img>` tags with Astro's built-in Image component for automatic WebP conversion, responsive srcsets, and layout shift prevention
- [ ] **Officer photo field** — Add optional `photo` field to `OfficerSchema` and headshot slot to `OfficerCard.astro`
- [ ] **CMS evaluation** — Evaluate [Decap CMS](https://decapcms.org) (Git-backed, free) so non-technical board members can update content without touching code
