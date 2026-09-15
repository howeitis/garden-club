// Helpers shared by the Member of the Month index, the per-honoree pages, and
// the teasers on / and /members.
import { getImage } from 'astro:assets';
import type { Honoree } from '../data/index';
import { resolveAsset } from './assetImages';

export const MEMBER_OF_THE_MONTH_BASE = '/members/member-of-the-month';

/** Permanent, shareable URL for one honoree's profile. */
export function honoreePath(member: Honoree): string {
  return `${MEMBER_OF_THE_MONTH_BASE}/${member.id}/`;
}

/**
 * Absolute URL of a share image built from the honoree's portrait, so a post
 * linking to their profile shows their face rather than the club card.
 * Falls back to undefined (→ the default OG image) if the portrait can't be
 * resolved.
 */
export async function honoreeShareImage(
  member: Honoree,
  site: URL | undefined,
): Promise<string | undefined> {
  const asset = resolveAsset(member.data.portrait.image);
  if (!asset || !site) return undefined;
  // JPEG at 1200px wide: broadly supported by scrapers (WebP still isn't,
  // everywhere) and comfortably under the ~5 MB limits.
  const image = await getImage({ src: asset, width: Math.min(1200, asset.width), format: 'jpeg', quality: 80 });
  return new URL(image.src, site).toString();
}
