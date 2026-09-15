// Runs before every build (see "prebuild" in package.json).
//
// Checks the photos editors upload to src/assets/content/ and stops the build
// with a plain-English message if one would cause trouble. The site resizes
// and converts photos itself, so the only real problems are files so large
// they bloat the repository and slow every build, and filenames the web can't
// link to cleanly.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.resolve('src/assets/content');
const HARD_LIMIT_MB = 8;   // build fails
const SOFT_LIMIT_MB = 3;   // build warns
const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const problems = [];
const warnings = [];

for (const name of await readdir(DIR)) {
  const file = path.join(DIR, name);
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
}

for (const w of warnings) console.warn(`⚠ Photo warning: ${w}`);

if (problems.length) {
  console.error('\n✖ The build stopped because of a problem with a photo:\n');
  for (const p of problems) console.error(`  • ${p}`);
  console.error('\nFix the photo, save, and the site will rebuild automatically.\n');
  process.exit(1);
}

console.log(`✓ Photos checked (${warnings.length ? `${warnings.length} large` : 'all within limits'})`);
