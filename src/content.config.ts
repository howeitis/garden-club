// ─────────────────────────────────────────────────────────────────────────────
// Content collections — the single definition of every editable thing on the
// site. Each collection below is a folder under src/content/ holding one small
// file per item (Markdown for things with prose, YAML for settings). Astro
// validates every file against its schema at build time and stops the build,
// naming the file and field, if something is missing or the wrong shape.
//
// Editors normally work through the Pages CMS admin (see .pages.yml and
// CONTENT_GUIDE.md), which builds its forms from the same field names used
// here. Keep the two in sync when adding a field.
//
// Conventions
//   • `order` — a number used to sort items on the page, smallest first.
//     Gaps are fine (10, 20, 30) so items can be slotted in later.
//   • Images are referenced by filename with a leading slash ("/photo.jpg")
//     and live in src/assets/content/. Any JPG, PNG, or WebP works; the site
//     converts and resizes them itself. See scripts/check-images.mjs for the
//     size limits.
// ─────────────────────────────────────────────────────────────────────────────
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Reusable field definitions ───────────────────────────────────────────────

// The CMS saves a blank optional field as "" rather than leaving it out, and
// a blank optional object as { image: "", alt: "" }. Treat those as absent so
// editors never see an error for a field they simply didn't fill in.
const blankToUndefined = (value: unknown) => {
  if (value === '' || value === null) return undefined;
  if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
    const hasContent = Object.values(value as Record<string, unknown>).some((v) => v !== '' && v !== null && v !== undefined);
    if (!hasContent) return undefined;
  }
  return value;
};
const optional = <T extends z.ZodTypeAny>(schema: T) => z.preprocess(blankToUndefined, schema.optional());

/** An optional single line of text ("" counts as not provided). */
const optionalString = optional(z.string());

/** A photo filename such as "/rosegarden.jpg". */
const imagePath = z
  .string({ required_error: 'An image filename is required, e.g. "/photo.jpg"' })
  .regex(/^\/[^/]+\.(jpe?g|png|webp|avif)$/i, {
    message: 'Image must be a filename starting with "/" and ending in .jpg, .png, or .webp — e.g. "/photo.jpg". The file itself goes in src/assets/content/.',
  });

/** CSS object-position, for photos that crop badly ("center 30%"). */
const imageFocus = optionalString.describe('Where to keep the focus when the photo is cropped, e.g. "center 30%" keeps the top third in view.');

const orderField = z
  .number({ invalid_type_error: '"order" must be a number (smallest shows first)' })
  .default(100);

const webAddress = z
  .string()
  .regex(/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i, {
    message: 'Website should be the address without "https://", e.g. "longwoodgardens.org"',
  });

// ── Lists (one Markdown file per item) ───────────────────────────────────────

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string({ required_error: 'Every project needs a "title"' }),
    years: z.string({ required_error: 'Every project needs "years", e.g. "2014–present" or "2025–2026"' }),
    chair: z.string({ required_error: 'Every project needs a "chair" (the member who leads it)' }),
    location: z.string({ required_error: 'Every project needs a "location"' }),
    image: imagePath,
    order: orderField,
  }),
});

const membersOfTheMonth = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/members-of-the-month' }),
  schema: z.object({
    name: z.string({ required_error: 'Every honoree needs a "name"' }),
    date: z.coerce.date({
      required_error: 'Every honoree needs a "date" (the month they were featured, e.g. 2026-09-01). It decides the order — newest is the current honoree.',
    }),
    showDate: z.boolean().default(true).describe('Show the month on the page (turn off if the club would rather not date the feature).'),
    headline: z.string({ required_error: 'Every honoree needs a "headline", e.g. "Celebrating Joy Ericson"' }),
    tagline: z.string({ required_error: 'Every honoree needs a "tagline" — the italic second line, e.g. "and her love of flowers"' }),
    summary: z.string({ required_error: 'Every honoree needs a one-sentence "summary" (used on the home page and in the archive)' }),
    portrait: z.object({
      image: imagePath,
      alt: z.string({ required_error: 'The portrait needs an "alt" description for screen readers' }),
      caption: optionalString,
      focus: imageFocus,
    }),
    secondPhoto: optional(z.object({
      image: imagePath,
      alt: z.string({ required_error: 'The second photo needs an "alt" description' }),
      caption: optionalString,
      focus: imageFocus,
    })),
    stats: z.array(z.object({
      value: z.string({ required_error: 'Each stat needs a "value", e.g. "40+"' }),
      label: z.string({ required_error: 'Each stat needs a "label", e.g. "Years as a certified judge"' }),
    })).max(4, { message: 'At most four stats fit in the "at a glance" strip' }).default([]),
    note: optional(z.object({
      text: z.string(),
      linkText: optionalString,
      link: optionalString,
    })),
  }),
});

const memberGardens = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/member-gardens' }),
  schema: z.object({
    name: z.string({ required_error: 'Every garden needs a "name", e.g. "Pollinator Paradise"' }),
    gardener: z.string({ required_error: 'Every garden needs the "gardener" — the member\'s name' }),
    highlight: optionalString.describe('A short badge, e.g. "Certified wildlife habitat"'),
    image: imagePath,
    focus: imageFocus,
    order: orderField,
  }),
});

const officers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/officers' }),
  schema: z.object({
    role: z.string({ required_error: 'Every officer needs a "role", e.g. "President"' }),
    name: z.string({ required_error: 'Every officer needs a "name"' }),
    order: orderField,
  }),
});

const judges = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/judges' }),
  schema: z.object({
    name: z.string({ required_error: 'Every judge needs a "name"' }),
    level: z.string({ required_error: 'Every judge needs a "level", e.g. "Master Judge"' }),
    status: z.enum(['active', 'emeritus'], {
      errorMap: () => ({ message: '"status" must be either "active" or "emeritus"' }),
    }).default('active'),
    order: orderField,
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/awards' }),
  schema: z.object({
    name: z.string({ required_error: 'Every award needs a "name"' }),
    type: z.enum(['received', 'given'], {
      errorMap: () => ({ message: '"type" must be "received" (an award the club won) or "given" (an award the club presents to members)' }),
    }),
    placement: optionalString.describe('e.g. "1st Place" — for awards the club received'),
    year: z.string({ required_error: 'Every award needs a "year", e.g. "2024-25" or "Ongoing"' }),
    criteria: z.array(z.string()).default([]).describe('Eligibility and judging criteria — for awards the club gives'),
    winners: z.array(z.string()).default([]).describe('Recent recipients — for awards the club gives'),
    order: orderField,
  }),
});

const plants = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/plants' }),
  schema: z.object({
    name: z.string({ required_error: 'Every plant needs a "name"' }),
    scientificName: z.string({ required_error: 'Every plant needs a "scientificName", e.g. "Ilex opaca"' }),
    type: z.enum(['native', 'invasive'], {
      errorMap: () => ({ message: '"type" must be "native" or "invasive"' }),
    }),
    bloom: optionalString.describe('Bloom period for natives, e.g. "May – June"'),
    image: imagePath,
    order: orderField,
  }),
});

const gardens = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/gardens' }),
  schema: z.object({
    name: z.string({ required_error: 'Every garden needs a "name"' }),
    location: z.string({ required_error: 'Every garden needs a "location", e.g. "Kennett Square, PA"' }),
    region: z.enum(['local', 'regional'], {
      errorMap: () => ({ message: '"region" must be "local" (Brandywine Valley) or "regional" (worth the drive)' }),
    }),
    website: webAddress,
    image: imagePath,
    order: orderField,
  }),
});

const gardeningTips = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/gardening-tips' }),
  schema: z.object({
    title: z.string({ required_error: 'Every tip needs a "title"' }),
    section: z.enum(['fundamentals', 'rhythms'], {
      errorMap: () => ({ message: '"section" must be "fundamentals" (evergreen tips) or "rhythms" (recurring tasks)' }),
    }),
    frequency: optionalString.describe('For rhythms: how often, e.g. "Weekly"'),
    image: imagePath,
    order: orderField,
  }),
});

// ── Settings (one YAML file each) ────────────────────────────────────────────

const settings = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/settings' }),
  schema: z.discriminatedUnion('file', [
    z.object({
      file: z.literal('club'),
      name: z.string(),
      shortName: z.string().default('GGGC'),
      founded: z.string().describe('e.g. "September 1963"'),
      joinedFederation: z.string().describe('e.g. "June 1964"'),
      incorporated: z.string().describe('e.g. "October 2018"'),
      mission: z.string(),
      nonprofitStatus: z.string(),
      theme: z.string().describe('The club\'s current theme, shown on the home page and in the footer'),
      themeYears: z.string().describe('e.g. "2025-27"'),
      membership: z.object({
        active: z.number(),
        associate: z.number(),
        honorary: z.number(),
        maxActive: z.number(),
        note: z.string(),
      }),
    }),
    z.object({
      file: z.literal('contact'),
      email: z.string().email({ message: 'The club email must be a valid address' }),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
      }),
      social: z.object({
        facebook: optional(z.string().url({ message: 'The Facebook link must be a full address starting with https://' })),
        instagram: optional(z.string().url({ message: 'The Instagram link must be a full address starting with https://' })),
      }).default({}),
    }),
    z.object({
      file: z.literal('meetings'),
      schedule: z.string().describe('e.g. "Second Wednesday of each month, September through June."'),
      timeBlocks: z.array(z.object({ label: z.string(), time: z.string() })),
      dues: z.object({
        active: z.string(),
        associate: z.string(),
        deadline: z.string(),
      }),
      orderOfBusiness: z.array(z.string()),
    }),
    z.object({
      file: z.literal('affiliations'),
      national: z.object({
        name: z.string(),
        address: z.string(),
        phone: z.string(),
        website: webAddress,
        theme: z.string(),
        president: z.string(),
        presidentEmail: z.string().email(),
        convention: optional(z.object({ dates: z.string(), location: z.string() })),
      }),
      region: z.object({ name: z.string(), abbreviation: z.string() }),
      state: z.object({ name: z.string(), abbreviation: z.string() }),
      other: z.array(z.object({ name: z.string() })).default([]),
      howWeSupport: z.array(z.string()).default([]),
    }),
  ]),
});

// ── Page copy (one YAML file per page) ───────────────────────────────────────
// The paragraphs on each page that the club may want to reword. Layout,
// headings, and button labels stay in the page code.

const pages = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/pages' }),
  schema: z.discriminatedUnion('page', [
    z.object({
      page: z.literal('home'),
      communityIntro: z.string().describe('Paragraph under "Cultivating Beauty Where We Live"'),
      contactIntro: z.string().describe('Paragraph in the green "Get in Touch" band'),
    }),
    z.object({
      page: z.literal('about'),
      history: z.string().describe('The "Our History" paragraphs (Markdown; blank line between paragraphs)'),
    }),
    z.object({
      page: z.literal('community-service'),
      heroSubtitle: z.string(),
    }),
    z.object({
      page: z.literal('members'),
      heroSubtitle: z.string(),
      gardensIntro: z.string(),
    }),
    z.object({
      page: z.literal('member-of-the-month'),
      heroSubtitle: z.string(),
    }),
    z.object({
      page: z.literal('membership'),
      heroSubtitle: z.string(),
      applyHeading: z.string(),
      applyText: z.string(),
      agendaIntro: z.string(),
      closingText: z.string(),
    }),
    z.object({
      page: z.literal('contact'),
      heroSubtitle: z.string(),
    }),
    z.object({
      page: z.literal('resources'),
      heroSubtitle: z.string(),
      tipsDescription: z.string(),
      plantsDescription: z.string(),
      gardensDescription: z.string(),
    }),
    z.object({
      page: z.literal('gardening-tips'),
      heroSubtitle: z.string(),
      fundamentalsIntro: z.string(),
      rhythmsIntro: z.string(),
    }),
    z.object({
      page: z.literal('plants'),
      heroSubtitle: z.string(),
      nativesIntro: z.string(),
      invasivesIntro: z.string(),
    }),
    z.object({
      page: z.literal('gardens'),
      heroSubtitle: z.string(),
      localIntro: z.string(),
      regionalIntro: z.string(),
    }),
  ]),
});

export const collections = {
  projects,
  membersOfTheMonth,
  memberGardens,
  officers,
  judges,
  awards,
  plants,
  gardens,
  gardeningTips,
  settings,
  pages,
};
