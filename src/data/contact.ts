/**
 * Contact page. The list is terminal-style: label / link / note.
 * When enabled is false the link renders aria-disabled="true" and
 * is non-interactive (the design system says the link is "honestly
 * placeholder" until a real URL is provided).
 */
export type ContactKind = "email" | "github" | "resume" | "linkedin" | "cal" | "twitter";

export interface ContactRow {
  label: string;
  value: string;
  href: string;
  kind: ContactKind;
  note: string;
  enabled: boolean;
}

export const contact: ReadonlyArray<ContactRow> = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    kind: "email",
    note: "best for roles, project briefs, and slow conversations about a problem space",
    enabled: true,
  },
  {
    label: "GitHub",
    value: "github.com/[handle]",
    href: "#",
    kind: "github",
    note: "open source work, side projects, the occasional answer in an issue thread. Add a real handle to enable.",
    enabled: false,
  },
  {
    label: "Resume",
    value: "resume.pdf",
    href: "#",
    kind: "resume",
    note: "PDF, last updated 2026-07. One page for IC roles, two pages for staff+. Add a real path to enable.",
    enabled: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/[handle]",
    href: "#",
    kind: "linkedin",
    note: "if your team uses LinkedIn for sourcing and you want to be findable there. Add a real handle to enable.",
    enabled: false,
  },
  {
    label: "Calendar",
    value: "cal.com/[handle]",
    href: "#",
    kind: "cal",
    note: "for short intro calls. 25 minutes, weekdays only. Add a real handle to enable.",
    enabled: false,
  },
  {
    label: "Twitter",
    value: "twitter.com/[handle]",
    href: "#",
    kind: "twitter",
    note: "occasional notes on UI engineering, design systems, and the small things. Add a real handle to enable.",
    enabled: false,
  },
] as const;

export const contactLede =
  "If you want to talk about a role, a project, or want to swap notes on design systems, here is the right door for each.";

export const contactFolioTag = "05 / Contact";
export const contactFolioMeta = "reply window: 1 to 2 business days";

Object.freeze(contact);
