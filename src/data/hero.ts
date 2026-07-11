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
  folioMeta: "2026 / present",
  /** The h1 is split so the <em> runs can be rendered with the right
   *  tags without HTML in the data file. Each entry is one
   *  segment: either a plain string or { em: "..." }. */
  title: [
    "I build the ",
    { em: "parts of the product" },
    " you can see, and the parts that keep ",
    { em: "working when no one is watching" },
    ".",
  ] satisfies TitleSegment[],
  lede:
    "A working engineer's portfolio. Three projects, a real toolkit, and a short note on how I work. Bound to the WeChat token system so the page reads like a quiet working canvas instead of a marketing template.",
  marginalia: [
    { label: "Tenure",        value: "10+ years on the web, mostly inside product teams." },
    { label: "Stack",         value: "TypeScript, React, Next.js, design systems, a11y." },
    { label: "Looking for",   value: "senior IC or staff frontend roles; design-eng adjacent." },
    { label: "Based in",      value: "your timezone", live: true },
  ] satisfies MarginaliaRow[],
  statusLine: "Available for new work",
};

Object.freeze(hero);
Object.freeze(hero.marginalia);
