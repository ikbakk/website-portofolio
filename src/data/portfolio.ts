// Working content recovered from the earlier portfolio source in Git.
// Confirm current project states and contact details before publishing.
export const portfolio = {
  name: 'Muhammad Iqbal Firdaus',
  shortName: 'Iqbal',
  role: 'Frontend and mobile engineer',
  location: 'Mataram, Indonesia',
  email: 'ikbakfir@gmail.com',
  github: 'https://github.com/ikbakk',
  linkedin: 'https://linkedin.com/in/ikbakk',
} as const;

export const selectedProjects = [
  {
    id: 'sungkar-group',
    title: 'Sungkar Group',
    type: 'Client website',
    status: 'Public site',
    description: 'A live client website serving tour content across five languages.',
    detail: 'I built the Astro frontend, structured package content, localized routes, search metadata, and responsive image delivery.',
    stack: ['Astro', 'TypeScript', 'Multilingual content'],
    href: 'https://sungkargroup.com',
    linkLabel: 'Visit site',
    image: '/images/sungkargroup-lab.webp',
    glyph: '◈',
    caseHref: '/projects/sungkar-group/',
  },
  {
    id: 'rentalin',
    title: 'Rentalin',
    type: 'Business operations product',
    status: 'In development',
    description: 'Vehicle rental operations software for small businesses in Indonesia.',
    detail: 'I am building tenant-scoped workspaces, membership permissions, public booking and tracking flows, and separate operations and marketing surfaces.',
    stack: ['Next.js', 'Convex', 'Astro', 'TypeScript'],
    href: 'https://github.com/ikbakk/rentalin',
    linkLabel: 'View source',
    screenshot: '/images/rentalin-landing.png',
    glyph: '◉',
    caseHref: '/projects/rentalin/',
  },
  {
    id: 'courtside',
    title: 'Courtside',
    type: 'Product build',
    status: 'Validation ongoing',
    description: 'A mobile-first workflow for running club sessions from attendance through results and costs.',
    detail: 'I built the interface, data model, access rules, transactional actions, and rotation recommendations that the operator can override.',
    stack: ['SvelteKit', 'Supabase', 'TypeScript'],
    href: 'https://github.com/ikbakk/badminton-club-helper',
    linkLabel: 'View source',
    screenshot: '/images/courtside-landing.png',
    glyph: '⌘',
    caseHref: '/projects/courtside/',
  },
  {
    id: 'cv-builder',
    title: 'CV Builder',
    type: 'Local tool',
    status: 'Local build',
    description: 'A browser-based resume editor with local data and a live PDF preview.',
    detail: 'I built the React editor, IndexedDB autosave, template flow, and Typst compilation path while keeping resume data on the device.',
    stack: ['React', 'TypeScript', 'Typst'],
    href: 'https://github.com/ikbakk/cv-builder',
    linkLabel: 'View source',
    screenshot: '/images/cv-builder-landing.png',
    glyph: '▤',
    caseHref: '/projects/cv-builder/',
  },
] as const;

// Capabilities are summarized from the connected GitHub repositories and the
// owner's description of their coding workflow. Client project names stay out.
export const experienceAreas = [
  {
    id: 'web',
    title: 'Web that reaches people.',
    description: 'I build responsive interfaces and content-heavy sites with multilingual routes, structured content, search metadata, and fast static delivery.',
    details: ['Frontend architecture', 'Localization', 'Performance and SEO'],
  },
  {
    id: 'mobile',
    title: 'Apps that feel dependable.',
    description: 'I turn mobile flows into working screens and services: authentication, API integration, notifications, local state, and device features.',
    details: ['Flutter and React Native', 'Firebase integration', 'Android features'],
  },
  {
    id: 'systems',
    title: 'Logic behind the interface.',
    description: 'I shape data models, permissions, dashboards, and transaction-backed actions so people can trust what a system shows and does.',
    details: ['Product workflows', 'Data and access rules', 'Testing and validation'],
  },
  {
    id: 'practice',
    title: 'Hands on, with AI in the loop.',
    description: 'I code by hand and with AI assistance. I use AI to draft and iterate, then inspect the code, run checks, and fix what the tools miss.',
    details: ['Manual coding', 'AI assisted coding', 'Review and testing'],
  },
] as const;

export const projectStories = {
  'sungkar-group': {
    context: 'Travelers need to compare routes, packages, and inclusions before asking an operator about a trip. The same content must work across languages and search entry points.',
    work: 'Built the Astro and TypeScript frontend, structured package content, localized routes, search metadata, and responsive image delivery.',
    decisions: ['Keep core pages statically rendered.', 'Model package information once and reuse it across destination and detail pages.', 'Support five locales, including right-to-left Arabic.'],
    statusNote: 'Public client work. The retained screenshot may differ from the current live site.',
  },
  rentalin: {
    context: 'Small vehicle rental businesses need a connected way to manage their operations and let customers make and track bookings.',
    work: 'Building a TypeScript product with business workspaces, membership permissions, public booking and tracking, and separate operations and marketing surfaces.',
    decisions: ['Scope business data to the active membership.', 'Use opaque public booking and rental tokens.', 'Keep the frontend and backend type system aligned.'],
    statusNote: 'In development. Production storage, messaging, monitoring, and backup checks remain release gates.',
  },
  courtside: {
    context: 'Running a club session means juggling attendance, wait times, substitutions, results, and costs while players are already on court.',
    work: 'Built a mobile-first operator flow, transactional session actions, public-safe views, and rotation and pairing recommendations.',
    decisions: ['Keep public views read-only.', 'Let the operator override recommendations.', 'Record state changes as session events for audit and recovery.'],
    statusNote: 'Real-session validation is ongoing; recommendations are still being calibrated.',
  },
  'cv-builder': {
    context: 'People need a useful resume editor without handing personal career data to a third-party service.',
    work: 'Built a React and TypeScript editor with structured inputs, IndexedDB autosave, template selection, and local Typst PDF compilation.',
    decisions: ['Keep resume data on the user’s device.', 'Separate editing state from template rendering.', 'Make the form and preview work together as one editing loop.'],
    statusNote: 'Local tool. Compilation currently depends on the local Typst workflow.',
  },
} as const;
