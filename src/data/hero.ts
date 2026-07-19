/**
 * Hero copy for field-note (Field note).
 *
 * The page is built around a single h1 (the manifesto) and a small
 * marginalia block. Marginalia rows use the same .mk / value pattern
 * as the original artifact; the slot labels are mono uppercase and
 * the values are body face.
 */
export interface MarginaliaRow {
  label: string;
  value: string;
  /** When true, render as a live timezone slot that gets filled by
   *  the clock on the client. Otherwise the value is static text. */
  live?: boolean;
}

/** A single segment of the h1. Either plain text or an italicized
 *  segment, depending on the original artifact's <em> usage. */
export type TitleSegment = string | { em: string };

export interface HeroData {
  eyebrow: string;
  title: TitleSegment[];
  lede: string;
  marginalia: MarginaliaRow[];
  statusLine: string;
  folioTag: string;
  folioMeta: string;
}

export const hero: HeroData = {
  eyebrow: "01 / Field note",
  folioTag: "01 / Field note",
  folioMeta: "Mataram / Indonesia",
  /** The h1 is split so the <em> runs can be rendered with the right
   *  tags without HTML in the data file. Each entry is one
   *  segment: either a plain string or { em: "..." }. */
  title: [
    "I build ",
    { em: "production-ready web and mobile interfaces" },
    " for teams that need clear UX, reliable integrations, and ",
    { em: "maintainable frontend systems" },
    ".",
  ] satisfies TitleSegment[],
  lede:
    "I'm Muhammad Iqbal Firdaus, a Frontend Engineer and Mobile Engineer with 2+ years of professional experience and hands-on web development experience since 2022. I've worked across tourism, government, analytics, automotive, restaurant, IoT, and digital media products, using React, Next.js, Astro, and Flutter to turn designs and APIs into performant applications that are easy to ship and maintain.",
  marginalia: [
    { label: "Tenure", value: "2+ years professional; hands-on web development since 2022; 1+ year Flutter." },
    { label: "Stack", value: "React, Next.js, Astro, SolidJS, Flutter, TypeScript, Tailwind CSS." },
    { label: "Looking for", value: "frontend or mobile roles; remote, relocation, and visa sponsorship welcome." },
    { label: "Based in", value: "your timezone", live: true },
  ] satisfies MarginaliaRow[],
  statusLine: "Available for new work",
};

Object.freeze(hero);
Object.freeze(hero.marginalia);
