import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Use SITE_URL env var (set in Vercel/hosting dashboard) or derive from VERCEL_URL,
// falling back to the placeholder for local development.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://examplegardenclub.org');

export default defineConfig({
  output: 'static',
  site,
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
