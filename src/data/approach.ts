/**
 * Approach page. The first paragraph uses the display face; the
 * following paragraphs use the body face. The trailing <ul> uses
 * mono rows: label / value.
 */
export interface ApproachListRow {
  label: string;
  value: string;
}

export interface ApproachData {
  folioTag: string;
  folioMeta: string;
  folioNumber: string;
  side: string;
  paragraphs: string[];
  list: ApproachListRow[];
}

export const approach: ApproachData = {
  folioTag: "04 / Approach",
  folioMeta: "how I work, briefly",
  folioNumber: "04 / approach",
  side: "A short note on shipping real products",
  paragraphs: [
    "I work best when design, frontend, backend, and product stay close enough to clarify the problem before the interface hardens into code.",
    "My default approach is practical: understand the requirement, map the API shape, build the smallest reliable UI, then improve the details that make the product feel polished on desktop and mobile. I care about responsive layouts, clear states, maintainable components, and performance because those are the things users notice when they go wrong.",
    "Most of my work has been freelance and remote, so I keep communication explicit. I document assumptions, surface blockers early, and try to leave the codebase easier to continue than when I arrived.",
  ],
  list: [
    { label: "Collaboration", value: "Remote-friendly, async by default, direct with clients, designers, backend teams, and IoT teams." },
    { label: "Delivery", value: "Production features, bug fixes, refactors, migrations, and maintenance for existing applications." },
    { label: "Quality", value: "Responsive UI, API edge cases, performance checks, SEO details, and clear handoff notes." },
    { label: "Mobility", value: "Open to relocation and visa sponsorship opportunities." },
  ],
} as const;

Object.freeze(approach);
Object.freeze(approach.paragraphs);
Object.freeze(approach.list);
