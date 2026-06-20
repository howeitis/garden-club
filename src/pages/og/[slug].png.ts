// Generates one Open Graph share image per registered page at build time.
// Route: /og/<slug>.png — referenced by BaseLayout's <meta og:image>.
import type { APIRoute, GetStaticPaths } from 'astro';
import { ogPages } from '../../lib/og';
import { renderOgPng } from '../../lib/renderOg';

export const getStaticPaths: GetStaticPaths = () =>
  ogPages.map((page) => ({
    params: { slug: page.slug },
    props: { title: page.title },
  }));

export const GET: APIRoute = ({ props }) => {
  const png = renderOgPng((props as { title: string }).title);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
