import { z } from 'zod';

// ─── clubInfo.json ─────────────────────────────────────────────────────────────
export const ClubInfoSchema = z.object({
  name: z.string(),
  foundingDates: z.object({
    club: z.string(),
    federation: z.string(),
    incorporated: z.string(),           // NEW: "October 2018"
  }),
  missionStatement: z.string(),
  nonprofitStatus: z.string(),
  theme: z.string(),
  themePeriod: z.string(),              // NEW: "2025-27"
  membership: z.object({               // NEW: membership stats
    activeMembers: z.number(),
    associateMembers: z.number(),
    honoraryMembers: z.number(),
    maxActive: z.number(),
    associateAndHonoraryNote: z.string(),
  }),
});

export type ClubInfo = z.infer<typeof ClubInfoSchema>;

// ─── contact.json ──────────────────────────────────────────────────────────────
export const ContactSchema = z.object({
  primaryEmail: z.string().email(),
  mailingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  socialLinks: z.record(z.string(), z.string()).optional(),
});

export type Contact = z.infer<typeof ContactSchema>;

// ─── meetings.json ─────────────────────────────────────────────────────────────
export const TimeBlockSchema = z.object({
  label: z.string(),
  time: z.string(),
});

export const MeetingsSchema = z.object({
  schedule: z.string(),                 // NEW: "Second Wednesday of each month…"
  timeBlocks: z.array(TimeBlockSchema),
  dues: z.object({                      // CHANGED: was z.string(), now an object
    activeMember: z.string(),
    associateMember: z.string(),
    deadline: z.string(),
  }),
  orderOfBusiness: z.array(z.string()),
});

export type Meetings = z.infer<typeof MeetingsSchema>;
export type TimeBlock = z.infer<typeof TimeBlockSchema>;

// ─── affiliations.json ─────────────────────────────────────────────────────────
export const AffiliationsSchema = z.object({
  ngc: z.object({
    name: z.string(),
    address: z.string(),               // NEW
    phone: z.string(),                 // NEW
    website: z.string(),               // NEW
    theme: z.string(),
    president: z.string(),
    presidentEmail: z.string(),        // NEW
    annualConvention: z.object({       // NEW
      dates: z.string(),
      location: z.string(),
    }),
  }),
  region: z.object({
    name: z.string(),
    abbreviation: z.string(),          // NEW (replaces director)
  }),
  state: z.object({
    name: z.string(),
    abbreviation: z.string(),          // NEW (replaces president/theme)
  }),
  other: z.array(z.object({           // NEW: additional affiliates
    name: z.string(),
  })),
  ngcSupport: z.array(z.string()),    // NEW: support narrative strings
});

export type Affiliations = z.infer<typeof AffiliationsSchema>;

// ─── officers.json ─────────────────────────────────────────────────────────────
export const OfficerSchema = z.object({
  role: z.string(),
  name: z.string(),
  sortOrder: z.number().int().positive(),
  bio: z.string().optional(),
});

export const OfficersSchema = z.array(OfficerSchema);

export type Officer = z.infer<typeof OfficerSchema>;

// ─── awards.json ───────────────────────────────────────────────────────────────
export const AwardSchema = z.object({
  awardName: z.string(),
  category: z.string(),               // NEW: "DFGC" | "GGGC"
  placement: z.string().nullable(),   // NEW: string or null
  year: z.string(),                   // NEW: "2024-25" | "Ongoing"
  description: z.string(),
  recentWinners: z.array(z.string()),
  judgingCriteria: z.array(z.string()),
});

export const AwardsSchema = z.array(AwardSchema);

export type Award = z.infer<typeof AwardSchema>;

// ─── judges.json ───────────────────────────────────────────────────────────────
export const JudgeSchema = z.object({
  name: z.string(),
  certificationLevel: z.string(),
  status: z.enum(['active', 'emeritus']),
});

export const JudgesSchema = z.array(JudgeSchema);

export type Judge = z.infer<typeof JudgeSchema>;

// ─── projects.json ─────────────────────────────────────────────────────────────
export const ProjectSchema = z.object({
  name: z.string(),
  yearsActive: z.string(),
  chairperson: z.string(),            // NEW
  description: z.string(),
  location: z.string(),
  imageReference: z.string(),
});

export const ProjectsSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

// ─── membersOfTheMonth.json ────────────────────────────────────────────────────
// One entry per honoree, newest first. The first entry is the current feature;
// the rest render as the "Past Honorees" strip on /members/member-of-the-month.
export const FeaturePhotoSchema = z.object({
  src: z.string(),                    // public-style path, e.g. "/joy-ericson-portrait.webp"
  alt: z.string(),
  caption: z.string().optional(),
  /** CSS object-position override for awkward crops (e.g. "center 20%") */
  position: z.string().optional(),
});

export const FeatureChapterSchema = z.object({
  label: z.string(),                  // small-caps chapter label, e.g. "The Beginning"
  text: z.string(),
  /** Optional inline link: the first occurrence of `phrase` in `text` becomes an anchor */
  link: z.object({ phrase: z.string(), href: z.string() }).optional(),
});

export const FeatureStatSchema = z.object({
  value: z.string(),                  // "40+"
  label: z.string(),                  // "Years as a certified flower show judge"
});

export const MemberOfTheMonthSchema = z.object({
  slug: z.string(),
  name: z.string(),
  /** Optional period label, e.g. "September 2026". Omit to show "Featured Member" only. */
  period: z.string().optional(),
  headline: z.string(),               // "Celebrating Joy Ericson"
  tagline: z.string(),                // "and her love of flowers"
  /** One-line summary for teasers (home page, members page, past-honorees strip) */
  summary: z.string(),
  photos: z.object({
    portrait: FeaturePhotoSchema,     // tall lead photo
    secondary: FeaturePhotoSchema.optional(),
  }),
  chapters: z.array(FeatureChapterSchema).min(1),
  stats: z.array(FeatureStatSchema).max(4).optional(),
  /** Closing note with an optional link, e.g. to an award that carries the honoree's name */
  note: z.object({
    text: z.string(),
    linkLabel: z.string().optional(),
    href: z.string().optional(),
  }).optional(),
});

export const MembersOfTheMonthSchema = z.array(MemberOfTheMonthSchema).min(1);

export type MemberOfTheMonth = z.infer<typeof MemberOfTheMonthSchema>;
export type FeaturePhoto = z.infer<typeof FeaturePhotoSchema>;
export type FeatureChapter = z.infer<typeof FeatureChapterSchema>;
export type FeatureStat = z.infer<typeof FeatureStatSchema>;
