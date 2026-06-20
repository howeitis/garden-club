// ─────────────────────────────────────────────────────────────────────────────
// Image registry — bridges string paths to Astro's build-time image pipeline.
//
// Components and data files reference images by their original public-style path
// (e.g. "/rosegarden.webp"). The actual files now live in src/assets/images/ so
// that `astro:assets` can optimize them (format conversion, compression,
// responsive widths). This module eagerly globs those assets and maps each one
// back to its "/filename" path so callers can keep using simple strings.
//
// Add an image: drop the file in src/assets/images/ and reference it as
// "/<filename>" — no import needed. A missing file throws at build time with a
// clear message, so broken references can never ship silently.
// ─────────────────────────────────────────────────────────────────────────────
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const byPath = new Map<string, ImageMetadata>();
for (const [key, mod] of Object.entries(modules)) {
  // "/src/assets/images/rosegarden.webp" → "/rosegarden.webp"
  byPath.set(key.replace('/src/assets/images', ''), mod.default);
}

/** Resolve a "/filename.ext" path to its optimized ImageMetadata. */
export function resolveImage(path: string): ImageMetadata {
  const meta = byPath.get(path);
  if (!meta) {
    throw new Error(
      `[images] No asset found for "${path}". ` +
        `Place the file at "src/assets/images${path}" (referenced via "${path}").`
    );
  }
  return meta;
}
