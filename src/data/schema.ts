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

// ─── memberGardens.json ──────────────────────────────────────────────────────
export const MemberGardenSchema = z.object({
  name: z.string(),
  member: z.string(),
  description: z.string(),
  highlight: z.string(),
  image: z.string(),
  /** Optional object-position override, e.g. "center 35%". */
  imagePosition: z.string().optional(),
});

export const MemberGardensSchema = z.array(MemberGardenSchema);

export type MemberGarden = z.infer<typeof MemberGardenSchema>;

// ─── gardeningTips.json ──────────────────────────────────────────────────────
export const GardeningTipSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

export const GardenRhythmSchema = GardeningTipSchema.extend({
  frequency: z.string(),
});

export const GardeningTipsSchema = z.object({
  evergreen: z.array(GardeningTipSchema),
  rhythms: z.array(GardenRhythmSchema),
});

export type GardeningTip = z.infer<typeof GardeningTipSchema>;
export type GardenRhythm = z.infer<typeof GardenRhythmSchema>;
export type GardeningTips = z.infer<typeof GardeningTipsSchema>;

// ─── plants.json ─────────────────────────────────────────────────────────────
export const PlantSchema = z.object({
  name: z.string(),
  scientific: z.string(),
  description: z.string(),
  image: z.string(),
  /** Bloom period (native plants only), e.g. "May – June". */
  bloom: z.string().optional(),
});

export const PlantsSchema = z.object({
  native: z.array(PlantSchema),
  banned: z.array(PlantSchema),
});

export type Plant = z.infer<typeof PlantSchema>;
export type Plants = z.infer<typeof PlantsSchema>;

// ─── visitGardens.json ───────────────────────────────────────────────────────
export const VisitGardenSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  /** Domain only, no protocol (e.g. "longwoodgardens.org"). */
  website: z.string(),
  image: z.string(),
});

export const VisitGardensSchema = z.object({
  local: z.array(VisitGardenSchema),
  regional: z.array(VisitGardenSchema),
});

export type VisitGarden = z.infer<typeof VisitGardenSchema>;
export type VisitGardens = z.infer<typeof VisitGardensSchema>;
