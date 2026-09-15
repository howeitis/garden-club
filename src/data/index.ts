/**
 * src/data/index.ts — the single place pages and components get content from.
 *
 * All content lives in src/content/ as small Markdown and YAML files, defined
 * and validated in src/content.config.ts. This module reads those collections
 * once at build time, sorts them, and exports plain values so pages can use
 * `club.name` or `projects.map(…)` without touching the content API.
 *
 * Nothing here is edited to change what the site says — edit the files in
 * src/content/ (or use the CMS). Change this file only when adding a new
 * collection or a new derived value.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

// ── Settings and page copy (one YAML file each) ──────────────────────────────

type Settings = CollectionEntry<'settings'>['data'];
type PageCopy = CollectionEntry<'pages'>['data'];

async function setting<K extends Settings['file']>(file: K): Promise<Extract<Settings, { file: K }>> {
  const entry = await getEntry('settings', file);
  if (!entry) throw new Error(`Missing settings file: src/content/settings/${file}.yml`);
  if (entry.data.file !== file) {
    throw new Error(`src/content/settings/${file}.yml must begin with the line "file: ${file}"`);
  }
  return entry.data as Extract<Settings, { file: K }>;
}

async function pageCopy<K extends PageCopy['page']>(page: K): Promise<Extract<PageCopy, { page: K }>> {
  const entry = await getEntry('pages', page);
  if (!entry) throw new Error(`Missing page copy file: src/content/pages/${page}.yml`);
  if (entry.data.page !== page) {
    throw new Error(`src/content/pages/${page}.yml must begin with the line "page: ${page}"`);
  }
  return entry.data as Extract<PageCopy, { page: K }>;
}

export const club = await setting('club');
export const contact = await setting('contact');
export const meetings = await setting('meetings');
export const affiliations = await setting('affiliations');

/** Editable paragraphs for a page: `const copy = await getPageCopy('about')`. */
export const getPageCopy = pageCopy;

// ── Lists (one Markdown file per item) ───────────────────────────────────────

type Ordered = { data: { order: number }; id: string };
const byOrder = <T extends Ordered>(entries: T[]) =>
  [...entries].sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));

export type Project = CollectionEntry<'projects'>;
export type Honoree = CollectionEntry<'membersOfTheMonth'>;
export type MemberGarden = CollectionEntry<'memberGardens'>;
export type Officer = CollectionEntry<'officers'>;
export type Judge = CollectionEntry<'judges'>;
export type Award = CollectionEntry<'awards'>;
export type Plant = CollectionEntry<'plants'>;
export type Garden = CollectionEntry<'gardens'>;
export type GardeningTip = CollectionEntry<'gardeningTips'>;

export const projects = byOrder(await getCollection('projects'));
export const memberGardens = byOrder(await getCollection('memberGardens'));
export const judges = byOrder(await getCollection('judges'));
export const awards = byOrder(await getCollection('awards'));
export const plants = byOrder(await getCollection('plants'));
export const gardens = byOrder(await getCollection('gardens'));
export const gardeningTips = byOrder(await getCollection('gardeningTips'));

// Officers whose name is still the "TBD" placeholder stay in the files (so the
// roles are documented) but are never shown. The About page hides the whole
// section while this list is empty.
export const officers = byOrder(await getCollection('officers')).filter(
  (o) => o.data.name.trim().toUpperCase() !== 'TBD',
);

// Honorees, newest first. The first one is the current Member of the Month.
export const membersOfTheMonth = [...(await getCollection('membersOfTheMonth'))].sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id),
);
if (membersOfTheMonth.length === 0) {
  throw new Error('src/content/members-of-the-month/ is empty — the site needs at least one honoree.');
}
export const currentMemberOfTheMonth: Honoree = membersOfTheMonth[0];

/** "September 2026" for an honoree, or undefined if the club chose not to show it. */
export function honoreePeriod(member: Honoree): string | undefined {
  if (!member.data.showDate) return undefined;
  return member.data.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// ── Derived values ───────────────────────────────────────────────────────────

export const foundingYear = club.founded.split(' ').pop() ?? '';

/** "1963-09" for schema.org, from "September 1963". */
export const foundingDateISO = (() => {
  const months: Record<string, string> = {
    January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
    July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
  };
  const [month, year] = club.founded.split(' ');
  return `${year}-${months[month] ?? '01'}`;
})();
