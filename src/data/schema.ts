import { z } from 'zod';

// ─── clubInfo.json ─────────────────────────────────────────────────────────────
export const ClubInfoSchema = z.object({
  name: z.string(),
  foundingDates: z.object({
    club: z.string(),
    federation: z.string(),
  }),
  missionStatement: z.string(),
  nonprofitStatus: z.string(),
  theme: z.string(),
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
  timeBlocks: z.array(TimeBlockSchema),
  dues: z.string(),
  orderOfBusiness: z.array(z.string()),
});

export type Meetings = z.infer<typeof MeetingsSchema>;
export type TimeBlock = z.infer<typeof TimeBlockSchema>;

// ─── affiliations.json ─────────────────────────────────────────────────────────
export const AffiliationsSchema = z.object({
  ngc: z.object({
    name: z.string(),
    theme: z.string(),
    president: z.string(),
  }),
  region: z.object({
    name: z.string(),
    director: z.string(),
  }),
  state: z.object({
    name: z.string(),
    president: z.string(),
    theme: z.string(),
  }),
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
  description: z.string(),
  location: z.string(),
  imageReference: z.string(),
});

export const ProjectsSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
