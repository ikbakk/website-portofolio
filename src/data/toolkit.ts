/**
 * Five toolkit items (the kinds of work the engineer does). Listed
 * in the order the engineer would reach for them.
 *
 *  number   -  printed in mono, accent color
 *  category  -  h2 of the item (display face)
 *  body     -  short paragraph
 *  tag      -  mono uppercase "React · TypeScript · ..." row
 */
export interface ToolkitItem {
  number: string;
  category: string;
  body: string;
  tag: string;
}

export const toolkit: ReadonlyArray<ToolkitItem> = [
  {
    number: "01",
    category: "Frontend engineering",
    body: "Production React, TypeScript, performance budgets, accessibility audits, the parts of the app that have to keep working when the team is asleep. I've shipped interfaces that handle real users, real data, and real failure modes.",
    tag: "React · TypeScript · Next.js · testing-library · Lighthouse",
  },
  {
    number: "02",
    category: "Design systems",
    body: "Token taxonomies, primitive libraries, migration plans, the boring connective tissue that lets a small team move fast. I write the system once so product engineers don't have to think about it for the next two years.",
    tag: "Tokens · Storybook · Figma variables · docs",
  },
  {
    number: "03",
    category: "Prototyping & interaction",
    body: "Working prototypes that answer a product question before the design phase ends. I build the version you can click on, hand it to the team, and the right next decision usually surfaces by Friday.",
    tag: "React · vanilla TS · motion · micro-interaction",
  },
  {
    number: "04",
    category: "Accessibility & performance",
    body: "Not a separate phase. Keyboard support, screen-reader testing, motion preferences, and the kind of performance work that makes the app feel respectful on a 4G connection and an old phone.",
    tag: "WCAG · ARIA · Core Web Vitals · reduced motion",
  },
  {
    number: "05",
    category: "Tooling & developer experience",
    body: "Build pipelines, lint rules, codemods, and the small scripts that turn a 40-minute chore into a five-minute chore. I like making the next person's day slightly easier.",
    tag: "Vite · esbuild · pnpm · changesets · CI",
  },
] as const;

export const toolkitLede =
  "A short list of the kinds of work I do, in my own words. Listed in the order I reach for them.";

export const toolkitFolioTag = "03 / Toolkit";
export const toolkitFolioMeta = "not a skills matrix";

Object.freeze(toolkit);
