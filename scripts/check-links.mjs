// Runs after every build (see "postbuild" in package.json).
//
// Reads every page in dist/ and checks each internal link and image:
//   • the target page or file exists in the build,
//   • page links end in "/" (the site's one URL form — see trailingSlash in
//     astro.config.mjs; a slash-less link costs visitors a redirect),
//   • a "#section" link points at an id that exists on the target page.
// External links aren't checked here: they'd make the build depend on other
// people's websites being up.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = await htmlFiles(DIST);
const html = new Map(await Promise.all(pages.map(async (f) => [f, await readFile(f, 'utf8')])));
const idsOf = (file) => new Set([...html.get(file).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const problems = [];

for (const [file, source] of html) {
  const page = '/' + path.relative(DIST, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  // Astro's own redirect pages are meta-refresh stubs; nothing to check.
  if (/http-equiv="refresh"/.test(source)) continue;

  for (const [, attr, raw] of source.matchAll(/\s(href|src)="(\/[^"]*)"/g)) {
    if (raw.startsWith('//')) continue;
    const [pathAndQuery, hash] = raw.split('#');
    const url = pathAndQuery.split('?')[0];
    const isFile = path.extname(url) !== '';

    if (isFile) {
      if (!existsSync(path.join(DIST, url))) problems.push(`${page}: ${attr}="${raw}" — file not found`);
      continue;
    }
    if (!url.endsWith('/')) {
      problems.push(`${page}: href="${raw}" — add a trailing slash ("${url}/")`);
      continue;
    }
    const target = path.join(DIST, url, 'index.html');
    if (!html.has(target)) {
      problems.push(`${page}: href="${raw}" — no page at ${url}`);
      continue;
    }
    if (hash && !idsOf(target).has(hash)) {
      problems.push(`${page}: href="${raw}" — no element with id="${hash}" on ${url}`);
    }
  }
}

if (problems.length) {
  console.error('\n✖ Broken or non-canonical internal links:\n');
  for (const p of problems) console.error(`  • ${p}`);
  console.error('');
  process.exit(1);
}

console.log(`✓ Internal links checked (${pages.length} pages)`);
