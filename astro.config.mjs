import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// The club's production domain. This flows into canonical URLs, the sitemap,
// JSON-LD, and the absolute Open Graph image URL, so it must always be the
// public domain — never a per-deployment hostname. (An earlier version derived
// this from Vercel's VERCEL_URL, which is the unique per-deployment URL and
// would have leaked into canonicals and the sitemap.)
//
// SITE_URL overrides it if the site ever needs to build for a different host.
const site = process.env.SITE_URL || 'https://gardengategardenclub.com';

export default defineConfig({
  output: 'static',
  site,
  // Every URL ends in a slash — canonicals, the sitemap, and internal links
  // all agree. vercel.json's `"trailingSlash": true` 308-redirects the
  // slash-less form, and scripts/check-links.mjs fails the build on an
  // internal link without one. Redirects for moved pages live in vercel.json
  // (real HTTP 308s; Astro's static `redirects` only emit meta-refresh pages).
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      // /thank-you exists only as the contact form's redirect target. It has no
      // standalone value in search results, so keep it out of the sitemap.
      // The page also sets noindex — see BaseLayout's `noindex` prop.
      filter: (page) => !page.endsWith('/thank-you/'),
    }),
  ],
});
