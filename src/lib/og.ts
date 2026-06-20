// Central registry of pages that get a generated Open Graph share image.
// Each entry maps a route to the headline shown on its OG card. The OG endpoint
// (src/pages/og/[slug].png.ts) renders one PNG per entry, and BaseLayout points
// each page's <meta og:image> at the matching slug.

export interface OgPage {
  slug: string;
  path: string;
  /** Headline rendered on the share image. */
  title: string;
}

export const ogPages: OgPage[] = [
  { slug: 'home',              path: '/',                          title: 'Garden Gate Garden Club' },
  { slug: 'about',             path: '/about',                     title: 'About Us' },
  { slug: 'resources',         path: '/resources',                 title: 'Resources' },
  { slug: 'gardening-tips',    path: '/resources/gardening-tips',  title: 'Gardening Tips' },
  { slug: 'plants',            path: '/resources/plants',          title: 'Plants of Delaware' },
  { slug: 'gardens',           path: '/resources/gardens',         title: 'Gardens to Visit' },
  { slug: 'community-service', path: '/community-service',          title: 'Community Service' },
  { slug: 'members',           path: '/members',                   title: 'Members' },
  { slug: 'awards-and-judges', path: '/members/awards-and-judges', title: 'Awards & Judges' },
  { slug: 'membership',        path: '/membership',                title: 'Membership' },
  { slug: 'contact',           path: '/contact',                   title: 'Contact Us' },
];

/** Map a request pathname to its OG slug, defaulting to the home card. */
export function ogSlugForPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return ogPages.find((p) => p.path === clean)?.slug ?? 'home';
}
