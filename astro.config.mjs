import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://your-garden-club.vercel.app',
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
