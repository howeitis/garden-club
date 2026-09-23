// Runs before every build (see "prebuild" in package.json).
//
// Checks the photos in src/assets/ (editor uploads in content/, page heroes in
// heroes/) and stops the build with a plain-English message if one would
// cause trouble. The site resizes and converts photos itself, so the only real
// problems are files so large they bloat the repository and slow every build,
// and filenames the web can't link to cleanly.
//
// It also warns — without stopping the build — about uploads nothing uses
// and camera-style names like "IMG_1875.jpeg" that say nothing about the photo.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIRS = ['src/assets/content', 'src/assets/heroes'].map((d) => path.resolve(d));
const CONTENT_DIR = DIRS[0];
const HARD_LIMIT_MB = 8;   // build fails
const SOFT_LIMIT_MB = 3;   // build warns
const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
// Phone and camera defaults: "IMG_1875", "DSC01234", "PXL_2024…", "1000019960".
const CAMERA_NAME = /^(img|dsc|dscn|dcim|pxl|photo|image)?[_-]?\d[\d_-]*(-\d+)?$/i;

const problems = [];
const warnings = [];

// Everything that can mention a photo by filename: content files and code.
async function sourceText(dir) {
  let text = '';
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.startsWith(path.resolve('src/assets'))) continue;
      text += await sourceText(full);
    } else if (/\.(md|ya?ml|astro|ts|mjs)$/.test(entry.name)) {
      text += await readFile(full, 'utf8');
    }
  }
  return text;
}
const sources = await sourceText(path.resolve('src'));

for (const dir of DIRS) {
  for (const name of await readdir(dir)) {
    const file = path.join(dir, name);
    const info = await stat(file);
    if (!info.isFile()) continue;

    const ext = path.extname(name).toLowerCase();
    const mb = info.size / (1024 * 1024);

    if (!ALLOWED.has(ext)) {
      problems.push(`${name}: only JPG, PNG, and WebP photos are supported. Please convert it (most phones and computers can "Export as JPEG").`);
      continue;
    }
    if (/\s/.test(name) || /[^a-z0-9._-]/i.test(name)) {
      problems.push(`${name}: the filename has spaces or unusual characters. Rename it using only letters, numbers, and dashes (e.g. "spring-planting.jpg").`);
    }
    if (mb > HARD_LIMIT_MB) {
      problems.push(`${name} is ${mb.toFixed(1)} MB — too large. Please resize it to under ${SOFT_LIMIT_MB} MB (about 2000 pixels wide is plenty) and upload it again.`);
    } else if (mb > SOFT_LIMIT_MB) {
      warnings.push(`${name} is ${mb.toFixed(1)} MB. It will work, but photos under ${SOFT_LIMIT_MB} MB keep the site quick to update.`);
    }

    if (dir === CONTENT_DIR) {
      if (CAMERA_NAME.test(path.basename(name, ext))) {
        warnings.push(`${name}: a descriptive name like "fire-pink.jpg" helps the photo show up in image search. Consider re-uploading it with one.`);
      }
      if (!sources.includes(`/${name}`)) {
        warnings.push(`${name} isn't used on any page. If it was uploaded by mistake, it can be deleted.`);
      }
    }
  }
}

for (const w of warnings) console.warn(`⚠ Photo note: ${w}`);

if (problems.length) {
  console.error('\n✖ The build stopped because of a problem with a photo:\n');
  for (const p of problems) console.error(`  • ${p}`);
  console.error('\nFix the photo, save, and the site will rebuild automatically.\n');
  process.exit(1);
}

console.log(`✓ Photos checked (${warnings.length ? `${warnings.length} note${warnings.length === 1 ? '' : 's'}` : 'all within limits'})`);
