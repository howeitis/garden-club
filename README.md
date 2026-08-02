# Garden Gate Garden Club — Website

The official website for the **Garden Gate Garden Club (GGGC)**, a 501(c)(3) nonprofit garden club based in Greenville, Delaware, founded in September 1963.

The site's "heritage editorial" design system is built around the club's watercolor crest logo — deep gate-green, antique gold, peach blossom, and holly on warm ivory. See `CLAUDE.md` for the full design-system reference (palette, typography, components, and UI patterns).

**Live at [gardengategardenclub.com](https://gardengategardenclub.com)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build) 5 — static site generation |
| Styling | [Tailwind CSS](https://tailwindcss.com) 3 |
| Language | TypeScript 5 (strict mode) |
| Validation | [Zod](https://zod.dev) — all JSON data schema-validated at build time |
| Deployment | [Vercel](https://vercel.com) (static) |
| Forms | [Web3Forms](https://web3forms.com) (contact form → club inbox) |
| Fonts | Google Fonts — Cormorant Garamond (headings, wordmark), Inter (body, 18px base) |

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

The site is live at **https://gardengategardenclub.com** (domain registered through Vercel).

The domain is hardcoded as the `site` value in `astro.config.mjs` and mirrored in the `Sitemap:` line of `public/robots.txt`. It flows into canonical URLs, the sitemap, JSON-LD structured data, and Open Graph image URLs. **If the domain ever changes, update both files.**

`SITE_URL` overrides it if the site needs to build for a different host. It is deliberately *not* derived from Vercel's `VERCEL_URL`, which is the unique per-deployment hostname and would leak into canonical URLs and the sitemap.

### Who can deploy

The Vercel project lives on a personal Hobby account, but **this repository is public**, and Vercel's commit-author restriction applies only to private repos — so any GitHub collaborator can push to `main` and trigger a production deploy.

> ⚠️ **Keep this repository public.** If it is ever switched to private, pushes from anyone other than the Vercel account owner will start failing with *"Git author must have access to the project on Vercel to create deployments."* Never commit secrets; `.env` is gitignored and the Web3Forms key lives only in Vercel.

Note that environment variables, domain settings, build logs, and rollbacks remain accessible only to the Vercel account owner.

---

## Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**. For local development, copy `.env.example` to `.env` (gitignored) and fill it in.

| Variable | Required | Purpose |
|---|---|---|
| `PUBLIC_WEB3FORMS_KEY` | For the contact form | Web3Forms access key. Without it the contact page renders a `mailto:` fallback instead of the form. |
| `SITE_URL` | No | Overrides the production domain. Leave unset in normal operation. |

The `PUBLIC_` prefix is Astro's convention for values that are safe to ship to the browser — this key appears in the page HTML by design. It lives in an env var so it can be rotated without a code change.

---

## Contact Form

The contact form posts to [Web3Forms](https://web3forms.com), a no-account relay for static sites. Submissions are emailed straight to **gardengate.communications@gmail.com** — there is no dashboard, database, or password to maintain.

**How it's wired** (`src/components/ContactForm.astro`):

| Field | Purpose |
|---|---|
| `access_key` | From `PUBLIC_WEB3FORMS_KEY` |
| `subject` | Notification email subject line (reserved by Web3Forms) |
| `from_name` | Sender display name in the notification |
| `redirect` | Absolute URL to `/thank-you`, built from `Astro.site` |
| `botcheck` | Hidden honeypot checkbox — a checked value makes Web3Forms discard the submission |
| `user_subject` | The visitor's own "Subject" field, renamed to avoid colliding with the reserved `subject` above |

The visitor's `email` value is used as the reply-to, so replying to the notification goes straight back to them.

**To rotate or re-issue the key:** request a new one at [web3forms.com](https://web3forms.com) using the club inbox, then update `PUBLIC_WEB3FORMS_KEY` in Vercel and redeploy. Because the site is statically built, an env var change only takes effect on the next deploy.

**Limits:** the Web3Forms free tier covers 250 submissions/month, which is far more than this site should see. If spam ever becomes a problem, Web3Forms supports adding hCaptcha or reCAPTCHA to the same form.

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
│   ├── Header.astro         # Fixed ivory nav: crest + serif wordmark, dropdowns, mobile hamburger, scroll-reveal
│   ├── Footer.astro         # Deep-green 3-column footer, tri-color signature hairline
│   ├── PageHero.astro       # Interior hero: photo + accent-tinted wash, bottom-left display title
│   ├── SectionHeader.astro  # Gold small-caps eyebrow + optional folio numeral
│   ├── Flourish.astro       # Botanical sprig divider (the site's signature ornament)
│   ├── LandingCard.astro    # Editorial section link (resources landing)
│   ├── OfficerCard.astro    # Unboxed officer entry with rotating accent rule
│   ├── ProjectCard.astro    # Alternating photo/text feature row (community service)
│   ├── GardenCard.astro     # Alternating photo/text feature row (gardens to visit)
│   ├── PlantCard.astro      # Open gallery plant entry (native / banned variants)
│   ├── AwardCard.astro      # Hairline-anchored award entry with criteria & winners
│   ├── JudgeRow.astro       # Certified judge listing row
│   ├── SmartImage.astro     # Public-style path → optimized responsive WebP image
│   └── ContactForm.astro    # Web3Forms-backed contact form (mailto fallback if unconfigured)
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

.env.example            # Template for local environment variables
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

Place **photos** in `src/assets/content/` (heroes in `src/assets/heroes/`) so they're optimized to responsive WebP at build time. Use hyphenated filenames (no spaces):

```
src/assets/content/project-pollinator-garden.jpg   ✓
src/assets/content/project pollinator garden.jpg   ✗  (spaces break URLs)
```

Reference them in JSON / props by the same public-style string, e.g. `/project-pollinator-garden.jpg` — `SmartImage` and `PageHero` resolve it to the optimized asset (see the image-handling notes in `CLAUDE.md`). Only logos, favicons, and the OG image live in `public/`.

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

- ✅ **Production domain is live.** `gardengategardenclub.com`, registered through Vercel. Set in `astro.config.mjs` and `public/robots.txt` (see [Production Domain](#production-domain)).
- ✅ **Contact form is live.** Posts to Web3Forms, delivering to `gardengate.communications@gmail.com`. Requires `PUBLIC_WEB3FORMS_KEY` to be set in Vercel (see [Contact Form](#contact-form)).
- ⚠️ **The Vercel project is on a personal Hobby account.** Club collaborators can deploy because the repo is public, but env vars, the domain, and rollbacks stay owner-only (see [Who can deploy](#who-can-deploy)).
- 🖼️ **Images are optimized.** All photos are served as responsive WebP via `astro:assets` (heroes through `PageHero`/`getImage`, content images through the `SmartImage` component). Sources live in `src/assets/`; only logos, favicons, and the OG image remain in `public/`. Originals were multi-MB (e.g. `home-hero` 5.9 MB → ~143 KB). See "Adding images" above for the workflow.

### Repo hygiene done in this handoff pass
- `npm run check` (`astro check`) runs as a typecheck gate in CI before the build.
- `.nvmrc` pins Node 20; CI reads the version from it.
- Pruned ~61 MB of unreferenced original/duplicate image assets from `public/`.
- Added an MIT `LICENSE`.

## Backlog

Items on hold pending additional club details or future sprints. **These are now tracked as GitHub issues [#7–#20](https://github.com/howeitis/garden-club/issues)** — the list below is a summary; use the issues for status.

### Product
- [x] **Contact form** — Posts to Web3Forms, delivered to the club inbox, with a honeypot and a `mailto:` fallback when unconfigured
- [ ] **Officers roster** — Populate `officers.json` with full board names, roles, and optional bios
- [ ] **Events calendar** — Add upcoming meeting dates as structured data or a dedicated section
- [ ] **Newsletter signup** — Mailchimp or equivalent embed for email capture
- [ ] **Social links** — Add Facebook and other accounts to `contact.json > socialLinks`
- [ ] **Project images** — Add photo file paths to `imageReference` fields in `projects.json`

### Design
- [x] **Club logo** — The watercolor crest (`gggc-clean.png` / `gggcwhitelogo.png`) now anchors the header, footer, and the whole design system
- [ ] **Photo gallery** — Surface `club.jpg`, `club-2.jpg`, `longwood.jpg`, `flower.jpg`, and `joy-ericson.jpeg` in a gallery on the About or Home page
- [x] **Award card icons** — Emoji removed site-wide as part of the heritage-editorial redesign
- [ ] **Real photography** — Replace stock-style photos with photos of actual club members, meetings, and member gardens (the feature-row layouts are built to showcase them)
- [ ] **Seasonal hero touches** — Subtly shift hero/flourish accents with the seasons (blossom in spring, holly in winter — both in the crest)

### SEO
- [x] **Production domain** — `gardengategardenclub.com` set in `astro.config.mjs` and `robots.txt`
- [ ] **Search Console** — Verify the domain in [Google Search Console](https://search.google.com/search-console) and submit `https://gardengategardenclub.com/sitemap-index.xml`
- [ ] **Analytics** — Add Plausible or Fathom (privacy-friendly, lightweight), or enable Vercel Web Analytics

### Engineering
- [x] **Astro `<Image />` component** — Photos are served as responsive WebP via `SmartImage` / `PageHero` / `getImage()`
- [ ] **Officer photo field** — Add optional `photo` field to `OfficerSchema` and headshot slot to `OfficerCard.astro`
- [ ] **CMS evaluation** — Evaluate [Decap CMS](https://decapcms.org) (Git-backed, free) so non-technical board members can update content without touching code
