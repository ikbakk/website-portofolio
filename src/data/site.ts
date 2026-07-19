import { contact as existingContact, contactLede } from './contact';
import { hero as existingHero } from './hero';
import { approach } from './approach';
import { projects as featuredProjects, projectsLede } from './projects';
import { seo } from './seo';
import { toolkit, toolkitLede } from './toolkit';
import { profile as existingProfile } from './profile';

export const profile = {
  name: existingProfile.name,
  initials: 'IF',
  role: existingProfile.role,
  status: existingProfile.status,
  location: existingProfile.buildMeta.location,
  email: 'ikbakfir@gmail.com',
  resume: '/resume.pdf',
  github: 'https://github.com/ikbakk',
  linkedin: 'https://linkedin.com/in/ikbakk',
  build: existingProfile.buildMeta.build,
  updated: existingProfile.buildMeta.updated,
} as const;

export const navItems = [
  { number: '01', id: 'field', href: '#field', label: 'Field note', route: '/' },
  { number: '02', id: 'work', href: '#work', label: 'Selected work', route: '/#work' },
  { number: '03', id: 'craft', href: '#craft', label: 'Craft', route: '/#craft' },
  { number: '04', id: 'method', href: '#method', label: 'Method', route: '/#method' },
  { number: '05', id: 'contact', href: '#contact', label: 'Contact', route: '/#contact' },
] as const;

export const hero = {
  eyebrow: 'Frontend and mobile engineer',
  title: 'I build production-ready web and mobile interfaces that stay maintainable after launch.',
  lede: existingHero.lede,
  primaryCta: 'Review selected work',
  secondaryCta: 'Open resume PDF',
  proofLabel: 'Interface cockpit',
  proof: [
    'Based in Mataram, Indonesia',
    '2+ years professional experience',
    'React / Next.js / Astro / Flutter',
    'Remote, relocation, and visa sponsorship welcome',
    'Available for frontend and mobile work',
  ],
} as const;

export const projects = featuredProjects.map((project) => ({
  number: project.number,
  title: project.title,
  role: project.role,
  team: project.team,
  workType: project.workType,
  stack: project.stack.split(',').map((item) => item.trim()),
  outcome: project.outcome,
  disclosure: project.disclosure,
  link: project.link,
  context: project.lede,
  contribution: project.note,
  note: project.noteLabel,
  image: project.image,
  caseStudy: project.caseStudy,
  details: [project.disclosure, project.lede, project.note],
}));

export const craftItems = toolkit.map((item) => ({
  number: item.number,
  title: item.category,
  body: item.body,
  tag: item.tag,
}));

export const craftPrinciples = [
  {
    label: 'Responsive by default',
    value:
      'Layouts, content density, and interaction states are checked across desktop and mobile.',
  },
  {
    label: 'States are part of the UI',
    value:
      'Loading, empty, error, and API edge cases are considered before the interface is handed over.',
  },
  {
    label: 'Built to continue',
    value:
      'Components, naming, and implementation choices stay legible for the next person in the codebase.',
  },
] as const;

export const method = approach.paragraphs;

export const methodRecommendations = approach.list.map((item) => ({
  label: item.label,
  value: item.value,
}));

export const methodSteps = [
  {
    number: '01',
    label: 'Clarify',
    value:
      'Align on the requirement, user path, constraints, and API shape before UI decisions harden.',
  },
  {
    number: '02',
    label: 'Structure',
    value: 'Build the smallest reliable component and state model for the actual product workflow.',
  },
  {
    number: '03',
    label: 'Refine',
    value:
      'Bring responsive behavior, loading states, edge cases, and interaction details into the implementation.',
  },
  {
    number: '04',
    label: 'Handoff',
    value:
      'Document assumptions, surface blockers early, and leave the codebase ready for the next change.',
  },
] as const;

export const contactRows = existingContact.map((row) => ({
  label: row.label,
  value: row.value,
  href: row.href,
  enabled: row.enabled,
  note: row.note,
}));

export const contactMeta = {
  primaryLabel: 'Start a conversation',
  primaryHref: profile.email,
  primaryNote: 'Email is the fastest route for roles, project briefs, and freelance work.',
  responseWindow: 'Typically replies within 1-2 business days.',
} as const;

export const sectionCopy = {
  workEyebrow: 'Proof should be inspectable',
  workTitle: projectsLede,
  craftEyebrow: 'What the work is made of',
  craftTitle: toolkitLede,
  methodEyebrow: 'Working style',
  methodTitle: approach.side,
  contactEyebrow: 'Next step',
  contactTitle: contactLede,
} as const;

// Remove or reorder entries here to tailor every project dialog consistently.
export const projectDialogSections = [
  { key: 'overview', label: 'Overview' },
  { key: 'problem', label: 'Problem statement' },
  { key: 'responsibilities', label: 'Responsibilities' },
  { key: 'approach', label: 'Approach' },
  { key: 'technical', label: 'Technical decisions' },
  { key: 'constraints', label: 'Constraints' },
  { key: 'comparison', label: 'Before and after' },
  { key: 'results', label: 'Results' },
  { key: 'features', label: 'Key features' },
  { key: 'next', label: 'What I would improve next' },
  { key: 'links', label: 'Links' },
  { key: 'disclosure', label: 'Disclosure' },
] as const;

export const pdfViewer = {
  title: 'Resume preview',
  description: 'Review my resume inline, or open it in a separate browser tab.',
  src: profile.resume,
  cta: 'Open PDF',
  missing: 'The resume file could not be loaded. Open it in a new tab instead.',
} as const;

export const siteMeta = {
  title: seo.title,
  description: seo.description,
} as const;
