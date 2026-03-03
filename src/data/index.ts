/**
 * src/data/index.ts
 *
 * Single source of truth for all site data.
 * Every JSON file is parsed against its Zod schema at build time —
 * a malformed JSON file will cause the build to fail with a clear error.
 *
 * All components and pages must import data from THIS file only.
 */

import {
  ClubInfoSchema,
  ContactSchema,
  MeetingsSchema,
  AffiliationsSchema,
  OfficersSchema,
  AwardsSchema,
  JudgesSchema,
  ProjectsSchema,
  type ClubInfo,
  type Contact,
  type Meetings,
  type Affiliations,
  type Officer,
  type Award,
  type Judge,
  type Project,
} from './schema';

import clubInfoRaw from './clubInfo.json';
import contactRaw from './contact.json';
import meetingsRaw from './meetings.json';
import affiliationsRaw from './affiliations.json';
import officersRaw from './officers.json';
import awardsRaw from './awards.json';
import judgesRaw from './judges.json';
import projectsRaw from './projects.json';

// Parse and validate each data file. If any file fails validation,
// the build will throw a ZodError with details about what is wrong.
export const clubInfo: ClubInfo = ClubInfoSchema.parse(clubInfoRaw);
export const contact: Contact = ContactSchema.parse(contactRaw);
export const meetings: Meetings = MeetingsSchema.parse(meetingsRaw);
export const affiliations: Affiliations = AffiliationsSchema.parse(affiliationsRaw);
export const officers: Officer[] = OfficersSchema.parse(officersRaw);
export const awards: Award[] = AwardsSchema.parse(awardsRaw);
export const judges: Judge[] = JudgesSchema.parse(judgesRaw);
export const projects: Project[] = ProjectsSchema.parse(projectsRaw);

// Re-export types for convenience so components only need one import path.
export type { ClubInfo, Contact, Meetings, Affiliations, Officer, Award, Judge, Project };
