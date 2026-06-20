// Build-time Open Graph image renderer.
//
// Recreates the club's share-card template as an SVG (so the headline can vary
// per page) and rasterizes it to PNG with resvg, using the vendored brand
// fonts. Runs only at build time inside the OG endpoint — never shipped to the
// browser.
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Fonts are read from source at build time (this module never runs in the
// browser), so resolve them from the project root rather than the bundle.
const fontDir = join(process.cwd(), 'src', 'assets', 'fonts');
const fontFiles = [
  'PlayfairDisplay-Bold.ttf',
  'DancingScript-Bold.ttf',
  'Inter-Regular.ttf',
  'Inter-SemiBold.ttf',
].map((f) => join(fontDir, f));

const WIDTH = 1200;
const HEIGHT = 630;

// Brand palette (mirrors tailwind.config.mjs)
const GREEN = '#2D5F3E';
const CREAM = '#F5F1EB';
const PINK = '#F2AABF';
const PINK_SOFT = '#FBDDE6';
const PINK_RING = '#F7C9D6';
const ROSE = '#B23A5B';
const YELLOW = '#F4C430';
const YELLOW_DEEP = '#E0A800';
const GRAY = '#5A5A5A';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Greedy word-wrap to a target max characters per line (≤ 2 lines). Long single
// words are allowed to overflow onto their own line.
function wrapTitle(title: string, maxChars = 13): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

// Five-petal blossom matching the site logo, centered at (cx, cy).
function blossom(cx: number, cy: number): string {
  const petals = [0, 72, 144, 216, 288]
    .map(
      (a) =>
        `<ellipse cx="${cx}" cy="${cy - 96}" rx="58" ry="96" fill="${PINK}" transform="rotate(${a} ${cx} ${cy})"/>`
    )
    .join('');
  return `
    <circle cx="${cx}" cy="${cy}" r="232" fill="${PINK_SOFT}" opacity="0.55"/>
    <circle cx="${cx}" cy="${cy}" r="196" fill="${PINK_RING}" opacity="0.45"/>
    ${petals}
    <circle cx="${cx}" cy="${cy}" r="52" fill="${YELLOW}"/>
    <circle cx="${cx}" cy="${cy}" r="30" fill="${YELLOW_DEEP}"/>
  `;
}

function buildSvg(rawTitle: string): string {
  const lines = wrapTitle(rawTitle);
  const titleSize = 88;
  const lineHeight = titleSize * 1.04;
  const titleTop = lines.length > 1 ? 250 : 300;

  const titleTspans = lines
    .map(
      (line, i) =>
        `<text x="90" y="${titleTop + i * lineHeight}" font-family="Playfair Display" font-weight="700" font-size="${titleSize}" fill="${GREEN}">${escapeXml(
          line
        )}</text>`
    )
    .join('');

  const underlineY = titleTop + (lines.length - 1) * lineHeight + 34;
  const subtitleY = underlineY + 70;
  const taglineY = subtitleY + 52;

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FCEDF2"/>
        <stop offset="1" stop-color="${CREAM}"/>
      </linearGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
    <rect width="${WIDTH}" height="10" fill="${PINK}"/>
    <rect y="${HEIGHT - 10}" width="${WIDTH}" height="10" fill="${PINK}"/>

    ${blossom(910, 300)}

    <line x1="90" y1="92" x2="700" y2="92" stroke="${PINK}" stroke-width="2" opacity="0.5"/>
    <text x="90" y="150" font-family="Dancing Script" font-weight="700" font-size="46" fill="${ROSE}">Garden Gate Garden Club</text>

    ${titleTspans}
    <rect x="92" y="${underlineY}" width="150" height="6" rx="3" fill="${PINK}"/>

    <text x="92" y="${subtitleY}" font-family="Inter" font-size="30" fill="${ROSE}">Greenville, Delaware &#183; Est. 1963</text>
    <text x="92" y="${taglineY}" font-family="Inter" font-size="26" fill="${GRAY}">Cultivating beauty, community, and a love of gardening.</text>
  </svg>`;
}

export function renderOgPng(title: string): Buffer {
  const svg = buildSvg(title);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',
    },
  });
  return resvg.render().asPng();
}

// Pre-read font buffers so a missing font fails the build loudly and early.
for (const f of fontFiles) readFileSync(f);
