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
| Fonts | Google Fonts — Playfair Display (headings) + Inter (body) |

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
Once the final domain is confirmed, update `site` in `astro.config.mjs`. This value flows into canonical URLs, the sitemap, JSON-LD structured data, and Open Graph image URLs.

---

## Project Structure

```
src/
├── pages/              # 7 pages + 404
│   ├── index.astro
│   ├── about.astro
│   ├── membership.astro
│   ├── community-service.astro
│   ├── awards-and-judges.astro
│   ├── contact.astro
│   ├── thank-you.astro
│   └── 404.astro
├── layouts/
│   └── BaseLayout.astro    # Master layout: SEO, JSON-LD, fonts, meta tags
├── components/
│   ├── Header.astro         # Responsive nav with mobile hamburger
│   ├── Footer.astro         # 3-column footer with theme display
│   ├── OfficerCard.astro    # Board member card
│   ├── ProjectCard.astro    # Community service project card
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

## Backlog

Items on hold pending additional club details or future sprints.

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
