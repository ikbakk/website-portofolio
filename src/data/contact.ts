/**
 * Contact page. The list is terminal-style: label / link / note.
 * When enabled is false the link renders aria-disabled="true" and
 * is non-interactive (the design system says the link is "honestly
 * placeholder" until a real URL is provided).
 */
export type ContactKind = "email" | "github" | "portfolio" | "linkedin" | "phone" | "location";

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
    value: "ikbakfir@gmail.com",
    href: "mailto:ikbakfir@gmail.com",
    kind: "email",
    note: "best for roles, project briefs, freelance work, and longer conversations about product problems",
    enabled: true,
  },
  {
    label: "GitHub",
    value: "github.com/ikbakk",
    href: "https://github.com/ikbakk",
    kind: "github",
    note: "portfolio code, side projects, and public engineering work",
    enabled: true,
  },
  {
    label: "Portfolio",
    value: "ikbakk.vercel.app",
    href: "https://ikbakk.vercel.app",
    kind: "portfolio",
    note: "the live portfolio surface for selected work, skills, and contact details",
    enabled: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ikbakk",
    href: "https://linkedin.com/in/ikbakk",
    kind: "linkedin",
    note: "for recruiting, sourcing, and professional updates",
    enabled: true,
  },
  {
    label: "Phone",
    value: "+62 87815509168",
    href: "tel:+6287815509168",
    kind: "phone",
    note: "available for time-sensitive coordination after an initial message",
    enabled: true,
  },
  {
    label: "Location",
    value: "Mataram, Indonesia",
    href: "#contact",
    kind: "location",
    note: "open to remote collaboration, relocation, and visa sponsorship opportunities",
    enabled: false,
  },
] as const;

export const contactLede =
  "If you want to talk about a frontend role, mobile project, freelance build, or relocation opportunity, these are the best ways to reach me.";

export const contactFolioTag = "05 / Contact";
export const contactFolioMeta = "reply window: 1 to 2 business days";

Object.freeze(contact);
