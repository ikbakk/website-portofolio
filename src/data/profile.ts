/**
 * Profile.
 *
 * The single source of truth for the brand line that appears in the
 * topbar and the contact page. Keep it small and honest. The monogram
 * letter used by the Seal/Field/Dialogue marks is a single character
 * that the brand owner should set once and stop changing.
 */
export interface BuildMeta {
  build: string;
  hash: string;
  updated: string;
  location: string;
  copyright: string;
}

export interface Profile {
  name: string;
  role: string;
  status: string;
  statusNote: string;
  monogram: string;
  buildMeta: BuildMeta;
}

export const profile: Profile = {
  name: "[Your name]",
  role: "Frontend engineer",
  status: "Available for new work",
  statusNote: "Open to senior IC / staff frontend roles; design-eng adjacent.",
  monogram: "f",
  buildMeta: {
    build: "v0.4.2",
    hash: "a3f1c9e",
    updated: "2026-07",
    location: "Your timezone",
    copyright: "[Your name], 2026",
  },
} as const;

Object.freeze(profile);
Object.freeze(profile.buildMeta);
