// Renders public/og-share.png — the 1200×630 card that Facebook, iMessage,
// Slack, and search previews show for links to the site.
//
//   npm run build:share-card
//
// The card is drawn as SVG in the site's own system (ivory ground, the
// watercolor crest, Cormorant + Inter, gold hairlines) and rendered with
// resvg. The wordmark, founding line, and mission come from
// src/content/settings/club.yml, so a change there only needs a rerun.
// Fonts are Latin subsets of the same faces the site uses, in ./fonts.
//
// If you change the design, bump the output filename (og-share-v4.png …) and
// the reference in BaseLayout.astro: social networks cache the old URL.
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const OUT = here('../../public/og-share-v3.png');

const club = yaml.load(await readFile(here('../../src/content/settings/club.yml'), 'utf8'));
const crest = (await readFile(here('../../src/assets/brand/gggc-clean.png'))).toString('base64');
const site = 'gardengategardenclub.com';

// Wrap the mission to ~50 characters per line for the 29px italic measure.
function wrap(text, max = 50) {
  const words = text.split(' '); const lines = []; let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) { lines.push(line.trim()); line = w; } else line += ' ' + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}
const mission = wrap(club.mission);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF7F0"/>
  <!-- faint gold hairline frame, inset like the site's section rules -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#856B2E" stroke-opacity=".28" stroke-width="1.5"/>
  <!-- blossom → gold → sage signature line along the bottom edge -->
  <defs>
    <linearGradient id="sig" x1="0" x2="1">
      <stop offset="0" stop-color="#D9A0AE"/><stop offset=".5" stop-color="#DCC68E"/><stop offset="1" stop-color="#7A9367"/>
    </linearGradient>
  </defs>
  <rect x="0" y="624" width="1200" height="6" fill="url(#sig)"/>

  <!-- crest -->
  <image x="92" y="95" width="440" height="440" xlink:href="data:image/png;base64,${crest}"/>

  <!-- wordmark block -->
  <g font-family="Inter" font-weight="600" fill="#856B2E" font-size="19" letter-spacing="5.5">
    <text x="600" y="176">GREENVILLE, DELAWARE  ·  EST. ${esc(club.founded.split(' ').pop())}</text>
  </g>
  <text x="596" y="282" font-family="Cormorant Garamond" font-weight="600" font-size="104" fill="#2A5434" letter-spacing="-1">Garden Gate</text>
  <text x="602" y="326" font-family="Inter" font-weight="600" font-size="23" fill="#33322C" letter-spacing="10">GARDEN CLUB</text>
  <rect x="600" y="358" width="72" height="1.5" fill="#856B2E" fill-opacity=".7"/>

  <g font-family="Cormorant Garamond" font-style="italic" font-weight="500" font-size="29" fill="#33322C" fill-opacity=".82">
    ${mission.map((l, i) => `<text x="600" y="${406 + i * 39}">${esc(l)}</text>`).join('\n    ')}
  </g>

  <text x="600" y="562" font-family="Inter" font-weight="600" font-size="20" fill="#856B2E" letter-spacing="2.5">${site}</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    loadSystemFonts: false,
    fontFiles: [
      here('fonts/CormorantGaramond-SemiBold.ttf'),
      here('fonts/CormorantGaramond-MediumItalic.ttf'),
      here('fonts/Inter-Regular.ttf'),
      here('fonts/Inter-SemiBold.ttf'),
    ],
  },
});
// Re-encode through sharp: a palette PNG at high quality is ~half the size
// with no visible loss on the flat ivory ground.
const png = await sharp(resvg.render().asPng()).png({ palette: true, quality: 92, compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);
console.log(`wrote ${OUT} (${(png.length / 1024).toFixed(0)} KB)`);
