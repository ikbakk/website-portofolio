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
  year: project.year,
  title: project.title,
  role: project.role,
  stack: project.stack.split(',').map((item) => item.trim()),
  outcome: project.outcome,
  workType: project.workType,
  disclosure: project.disclosure,
  context: project.lede,
  contribution: project.note,
  note: project.noteLabel,
  image: project.image,
  details: [project.disclosure, project.lede, project.note],
}));

export const craftItems = toolkit.map((item) => ({
  number: item.number,
  title: item.category,
  body: item.body,
  tag: item.tag,
}));

export const method = approach.paragraphs;

export const methodRecommendations = approach.list.map((item) => ({
  label: item.label,
  value: item.value,
}));

export const contactRows = existingContact.map((row) => ({
  label: row.label,
  value: row.value,
  href: row.href,
  enabled: row.enabled,
  note: row.note,
}));

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

export const pdfViewer = {
  title: 'Resume preview',
  description:
    'If resume.pdf is available in the public folder, this popup renders it inline. Otherwise it shows a clear fallback instead of a blank frame.',
  src: profile.resume,
  cta: 'Open PDF',
  missing:
    'No PDF is available yet. Add resume.pdf to the public folder, then this viewer will open it in place.',
} as const;

export const siteMeta = {
  title: seo.title,
  description: seo.description,
} as const;
