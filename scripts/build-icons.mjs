// Regenerates every PNG icon from public/favicon.svg (the small-size mark).
//   npm run build:icons
//
// "any" icons are the badge as drawn. "maskable" icons (Android home screen)
// get an ivory bleed with the mark scaled into the 80% safe zone, because the
// OS crops them to a circle or squircle and would otherwise clip the ring.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

async function render(size, file) {
  await sharp(svg, { density: 72 * size / 40 }).resize(size, size).png().toFile(out(file));
  console.log(`${file}  ${size}×${size}`);
}

async function renderMaskable(size, file) {
  const inner = Math.round(size * 0.8);
  const mark = await sharp(svg, { density: 72 * inner / 40 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#FAF7F0' } })
    .composite([{ input: mark, left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) }])
    .png().toFile(out(file));
  console.log(`${file}  ${size}×${size} (maskable)`);
}

await render(16, 'favicon-16x16.png');
await render(32, 'favicon-32x32.png');
await render(180, 'apple-touch-icon.png');
await render(192, 'favicon-192x192.png');
await render(512, 'favicon-512x512.png');
await renderMaskable(192, 'maskable-192x192.png');
await renderMaskable(512, 'maskable-512x512.png');
