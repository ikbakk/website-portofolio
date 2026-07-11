/**
 * Three featured build entries. The long-form text lives in
 * src/content/projects/0X.md (Astro content collection) and is rendered
 * through the ProjectEntry component. This file is the *summary* that
 * drives the folio bar, the meta dl, and the lede.
 *
 *  number     — printed as "01 / 2025" on the entry head
 *  year       — used to derive the right column of the entry-no
 *  title      — h2 of the entry
 *  role       — short role line
 *  stack      — comma-separated tools, used in the dl and the tag row
 *  team       — short team line
 *  outcome    — short outcome line
 *  note       — the marginal "what I'd do differently" block
 *  noteLabel  — label for the marginal note (e.g. "What I'd do differently")
 *  slug       — file name in src/content/projects
 */
export interface ProjectSummary {
  number: string;
  year: string;
  title: string;
  role: string;
  stack: string;
  team: string;
  outcome: string;
  note: string;
  noteLabel: string;
  slug: "01" | "02" | "03";
}

export const projects: ReadonlyArray<ProjectSummary> = [
  {
    slug: "01",
    number: "01",
    year: "2025",
    title: "Design system rollout across six product surfaces",
    role: "Lead frontend",
    stack: "TypeScript, React, Storybook, Figma tokens",
    team: "2 frontend, 1 designer, 1 PM",
    outcome:
      "Replaced 6 fragmented libraries with one tokenized system. Release cycle from weeks to days.",
    note:
      "Start with a thin vertical slice in one product first, instead of building the full primitive library up front. The full library came together faster once two teams had already adopted the tokens.",
    noteLabel: "What I'd do differently",
  },
  {
    slug: "02",
    number: "02",
    year: "2024",
    title: "Dense internal workflow tool for ops teams",
    role: "Sole frontend",
    stack: "Next.js, TanStack Table, react-aria",
    team: "Embedded with ops + design",
    outcome:
      "Replaced three spreadsheets and two internal scripts. One workspace, keyboard-first, accessible to the ops QA process.",
    note:
      "Tables with 50+ columns, 100ms column resize, and a save model that couldn't lose work to a network blip. Wrote a draft + commit layer that turned the page into a stable editing surface.",
    noteLabel: "Constraint that shaped it",
  },
  {
    slug: "03",
    number: "03",
    year: "2023",
    title: "Public launch surface for a developer tool",
    role: "Frontend + design eng",
    stack: "Astro, vanilla TS, vanilla CSS",
    team: "Solo, working with the founder",
    outcome:
      "Marketing site + docs + first-touch onboarding. Core Web Vitals green, 100 on accessibility, on a small hosting budget.",
    note:
      "No design system. Three surfaces, three scopes, the system came after the launch when the team grew. Doing it again I'd plant a token file from day one even if it's just CSS custom properties.",
    noteLabel: "Tradeoff",
  },
] as const;

export const projectsLede =
  "Three projects that show range, not a highlights reel. Each one is a real engineering decision with a real constraint behind it.";

export const projectsFolioTag = "02 / Selected work";
export const projectsFolioMeta = "three projects, 2023 to 2026";

Object.freeze(projects);
