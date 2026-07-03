// Central registry of optimizable images living under src/assets/.
//
// Content and hero images are referenced throughout the site by public-style
// path strings (e.g. "/rosegarden.webp") stored in data files and component
// props. Keeping that stable string API means data doesn't need to know about
// Astro's asset pipeline. This module resolves such a string to the imported
// ImageMetadata so components can hand it to <Image /> / getImage() for
// automatic WebP + responsive srcsets. Anything not found here (logos,
// favicons, OG images — still served from public/) resolves to undefined and
// the caller falls back to a plain <img>.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const assetByName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop();
  if (name) assetByName[name] = mod.default;
}

/** Resolve a public-style path or bare filename to an imported asset, if any. */
export function resolveAsset(src: string): ImageMetadata | undefined {
  const name = src.replace(/^\//, '').split('/').pop();
  return name ? assetByName[name] : undefined;
}

/**
 * Clamp a list of desired render widths to an image's intrinsic width so Astro
 * never upscales (which it refuses to do) and we don't ship pointless variants.
 * Always returns at least one width.
 */
export function cappedWidths(intrinsicWidth: number, desired: number[]): number[] {
  const max = Math.max(...desired);
  const widths = desired.filter((w) => w < intrinsicWidth);
  widths.push(Math.min(intrinsicWidth, max));
  return [...new Set(widths)].sort((a, b) => a - b);
}
