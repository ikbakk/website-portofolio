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
  side: "A short note, not a manifesto",
  paragraphs: [
    "I work best on small teams where the engineer and the designer are close enough to disagree over lunch and ship the right answer by Friday.",
    "I lean toward the boring solution. Most of the time the right tool is a CSS Grid, a useEffect with a real cleanup, a token file, and a one-line commit message that explains why. When the boring solution is wrong, I can usually tell you why in two sentences.",
    "I keep a written log of what I shipped, what I tried that didn't work, and what I'd do next time. It's how I stay honest with myself, and it's how I make a useful handoff to whoever picks the work up after me.",
  ],
  list: [
    { label: "Cadence",        value: "Async by default, sync when it matters. Two short syncs a week, written updates between them." },
    { label: "Review",         value: "Read every PR I send and every PR I receive. Leave one thing to learn each time." },
    { label: "Documentation",  value: "Decisions live in a doc, not in someone's head. Six months from me, future-me still gets the context." },
    { label: "Disagreement",   value: "Push back with the data I have. If I lose the argument, I commit or I leave, I don't drift." },
  ],
} as const;

Object.freeze(approach);
Object.freeze(approach.paragraphs);
Object.freeze(approach.list);
