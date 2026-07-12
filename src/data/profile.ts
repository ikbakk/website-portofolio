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
  name: "Muhammad Iqbal Firdaus",
  role: "Frontend Engineer · Mobile Engineer",
  status: "Available for frontend and mobile work",
  statusNote: "Open to remote roles, relocation, and visa sponsorship opportunities.",
  monogram: "i",
  buildMeta: {
    build: "v0.4.2",
    hash: "ikbakk",
    updated: "2026-07",
    location: "Mataram, Indonesia",
    copyright: "Muhammad Iqbal Firdaus, 2026",
  },
} as const;

Object.freeze(profile);
Object.freeze(profile.buildMeta);
