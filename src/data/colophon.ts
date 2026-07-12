/**
 * Colophon. The small mono block at the very bottom of the page
 * (after the contact list). The clock slot is filled by the live
 * clock on the client.
 */
export interface ColophonRow {
  label: string;
  value: string;
  /** When true, render a live timezone + clock slot. */
  live?: boolean;
  /** When "clock", render the live clock + tz label. */
  variant?: "clock" | "static";
}

export interface ColophonData {
  rows: ColophonRow[];
}

export const colophon: ColophonData = {
  rows: [
    { label: "Typography", value: "Newsreader / IBM Plex Sans / JetBrains Mono" },
    { label: "Built with", value: "Astro / TypeScript / Tailwind CSS / GSAP" },
    { label: "Local time", value: "offline", variant: "clock" },
    { label: "Build", value: "v0.4.2 / ikbakk / 2026-07" },
    { label: "(c)", value: "Muhammad Iqbal Firdaus, 2026 / frontend and mobile engineering" },
  ],
} as const;

Object.freeze(colophon);
Object.freeze(colophon.rows);
