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
  redirects: {
    '/awards-and-judges': '/members/awards-and-judges',
  },
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
