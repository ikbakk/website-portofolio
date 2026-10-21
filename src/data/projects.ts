/**
 * Four featured build entries. The long-form text lives in
 * src/content/projects/0X.md (Astro content collection) and is rendered
 * through the ProjectEntry component. This file is the *summary* that
 * drives the folio bar, the meta dl, and the lede.
 *
 *  number      - printed at the start of the project row
 *  title       -  h2 of the entry
 *  role        -  short role line
 *  stack       -  comma-separated tools, used in the dl and the tag row
 *  team        -  short team line
 *  outcome     -  short outcome line
 *  note        -  marginal project note
 *  noteLabel   -  label for the marginal note
 *  workType    -  public/private nature of the work
 *  disclosure  -  what can be shared in the portfolio
 *  slug        -  file name in src/content/projects
 */
export interface ProjectSummary {
  id: string;
  featured: boolean;
  stage: 'production' | 'internal-alpha' | 'prototype' | 'local-tool';
  number: string;
  title: string;
  role: string;
  stack: string;
  team: string;
  outcome: string;
  lede: string;
  note: string;
  noteLabel: string;
  workType: 'shareable freelance product' | 'contract product' | 'personal product';
  disclosure: string;
  link: {
    label: string;
    href: string;
  };
  caseStudy: {
    overview: string;
    problem: string;
    responsibilities: string;
    approach: string;
    technical: string;
    constraints: string;
    comparison: string;
    features: string;
    next: string;
    links: string;
  };
  slug: '01' | '02' | '03' | '04' | '05';
  /** Optional screenshot. When provided, the entry renders the
   *  image-first layout; when omitted, the entry renders the
   *  text-only layout with an empty screenshot slot. */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
  };
}

export const projects: ReadonlyArray<ProjectSummary> = [
  {
    slug: '01',
    id: 'sungkar-group',
    featured: true,
    stage: 'production',
    number: '01',
    title: 'Sungkar Group',
    role: 'Freelance frontend engineer',
    stack: 'Astro, TypeScript, multilingual routing, Schema.org, WebP',
    team: 'Solo, working with the Sungkar Group team and local operators',
    workType: 'shareable freelance product',
    disclosure: 'Public client work. Screenshots and product context can be shared.',
    link: {
      label: 'Visit sungkargroup.com',
      href: 'https://sungkargroup.com',
    },
    outcome:
      'Built a multilingual tourism website covering Lombok, Sumbawa, and Labuan Bajo, with structured package content, technical SEO, and responsive image delivery.',
    image: {
      src: '/projects/sungkargroup.webp',
      width: 1828,
      height: 967,
      alt: 'Sungkar Group Indonesia landing page: hero with private tour Lombok, popular packages, and Lombok, Sumbawa, Labuan Bajo destinations',
      caption: 'Tourism homepage capture retained from the earlier portfolio.',
    },
    lede: 'Sungkar Group Indonesia is a Lombok-based tour operator running private tours, open trips, and phinisi charters across Lombok, Sumbawa, and Labuan Bajo. I built the marketing and content surface with Astro, focusing on technical SEO, multilingual routing, WebP image delivery, and a content model that the operations team can extend as new packages are added.',
    note: 'Tourism sites live or die on discoverability and perceived speed. Structured data per package, Open Graph for share previews, and lightweight static rendering mattered more than heavy interactivity.',
    noteLabel: 'What I focused on',
    caseStudy: {
      overview: '',
      problem: '',
      responsibilities: '',
      approach: '',
      technical: '',
      constraints: '',
      comparison: '',
      features: '',
      next: '',
      links: '',
    },
  },
  {
    slug: '02',
    id: 'beaconnect',
    featured: true,
    stage: 'internal-alpha',
    number: '02',
    title: 'Beaconnect',
    role: 'Mobile product engineer',
    stack: 'Flutter, Firebase Auth, Cloud Firestore, Firebase Cloud Messaging, Android widgets',
    team: 'Independent product build',
    workType: 'personal product',
    disclosure:
      'Public personal product. Product decisions, implementation details, and source code can be shared.',
    link: {
      label: 'View Beaconnect on GitHub',
      href: 'https://github.com/ikbakk/beaconnect',
    },
    outcome:
      'Implemented a functional internal-alpha companion app with pairing, check-ins, place snapshots, live sharing, notifications, and Android widget support.',
    lede: 'Beaconnect is a companion app for two people who want reassurance without turning the relationship into surveillance. I shaped the product around mutual consent, deliberate sharing, and quiet status updates rather than persistent tracking.',
    note: 'The core constraint was trust: every permission, state label, and notification needed to describe what the product could actually do without manufacturing anxiety.',
    noteLabel: 'Product principle',
    caseStudy: {
      overview:
        'A Flutter companion app designed around mutual reassurance rather than passive surveillance.',
      problem:
        'Location and status products can create anxiety when their controls, permissions, or claims are unclear.',
      responsibilities:
        'Defined the product constraints, implemented the Flutter app, integrated Firebase services, and documented quality and release work.',
      approach:
        'Built the product as focused vertical slices, starting with authentication, pairing, a cached home shell, and a check-in flow.',
      technical:
        'Feature-oriented Flutter code with local and Firebase-backed repositories, Firebase Auth, Firestore, Firebase Cloud Messaging, Android widget plumbing, and automated tests.',
      constraints:
        'The app must be useful without implying unavailable state, normalizing surveillance, or misrepresenting permission status.',
      comparison: '',
      features:
        'Mutual pairing, check-ins, place snapshots, live sharing, trust-center controls, notifications, battery-saver behavior, and widget previews.',
      next: 'Complete internal-alpha distribution and continue real-device validation of the two-person experience.',
      links: 'Public repository available on GitHub.',
    },
  },
  {
    slug: '03',
    id: 'cv-builder',
    featured: true,
    stage: 'local-tool',
    number: '03',
    title: 'CV Builder',
    role: 'Frontend product engineer',
    stack: 'React, TypeScript, Tailwind CSS, Zustand, IndexedDB, Typst',
    team: 'Independent product build',
    workType: 'personal product',
    disclosure:
      'Public personal product. Architecture, source code, and implementation decisions can be shared.',
    link: {
      label: 'View CV Builder on GitHub',
      href: 'https://github.com/ikbakk/cv-builder',
    },
    outcome:
      'Built a browser-based editor that turns structured resume data into a live PDF preview through Typst compilation while keeping user data on the local machine.',
    lede: 'CV Builder gives users a structured way to edit resume content, choose or upload a Typst template, and generate a typeset PDF without sending resume data to a third-party service.',
    note: 'The useful product problem was not just PDF export. It was preserving a simple editing flow while keeping templates, data, and compilation concerns separate.',
    noteLabel: 'Engineering focus',
    caseStudy: {
      overview:
        'A local-first resume editor that compiles structured CV data into a PDF using Typst.',
      problem:
        'Resume tools often trade away template control or require users to upload personal career data to a hosted service.',
      responsibilities:
        'Designed and built the React application, domain model, template engine, local persistence, and PDF compilation workflow.',
      approach:
        'Separated the UI, application services, domain types, and IndexedDB persistence so templates and compiler behavior remain independently understandable.',
      technical:
        'React, TypeScript, Tailwind CSS, Zustand, localforage-backed IndexedDB persistence, Typst templates, and a local compile endpoint.',
      constraints:
        'Resume data remains on the user device, while the interface still needs responsive editing, accessible form controls, and a useful preview.',
      comparison: '',
      features:
        'Structured editor, live preview, ATS-friendly and professional templates, custom Typst template upload, local autosave, and named PDF output.',
      next: 'Explore a production-safe compile service or client-side WebAssembly compilation for deployment beyond the local environment.',
      links: 'Public repository available on GitHub.',
    },
  },
  {
    slug: '04',
    id: 'ward-monitor',
    featured: false,
    stage: 'prototype',
    number: '04',
    title: 'Ward Monitor',
    role: 'Full-stack frontend and IoT prototyping',
    stack: 'Angular, TypeScript, ESP32, MAX30100, MLX90614, Lucide icons',
    team: 'Solo product build',
    workType: 'personal product',
    disclosure:
      'Self-initiated product prototype. Screenshots, interaction details, and implementation choices can be shared.',
    link: {
      label: 'Visit Ward Monitor',
      href: 'https://esp32-ward-monitor.vercel.app/',
    },
    outcome:
      'Built a backend-ready clinical operations dashboard with real login flow, ward navigation, patient detail pages, and state-aware telemetry cards for ESP32 sensor readings.',
    image: {
      src: '/projects/ward-monitor-dashboard.webp',
      width: 1440,
      height: 3047,
      alt: 'Ward Monitor dashboard showing clinical operations, priority patient cards, ward boards, vitals, and ESP32 device state',
      caption:
        'Dashboard view with priority review queue, ward boards, state-tinted patient cards, and sensor readings.',
    },
    lede: 'Ward Monitor turns ESP32 sensor data into a nurse-station interface for rooms, beds, monitored patients, and device state. I designed the Angular UI around quick triage: priority patients first, compact icon-led status summaries, state-tinted cards, privacy mode, and route-level detail pages ready to connect to a production backend.',
    note: 'The interface was designed for scan speed. Status is carried by color, icon, and spacing rather than long labels, while the auth and routing seams are prepared for the backend API.',
    noteLabel: 'Product constraint',
    caseStudy: {
      overview: '',
      problem: '',
      responsibilities: '',
      approach: '',
      technical: '',
      constraints: '',
      comparison: '',
      features: '',
      next: '',
      links: '',
    },
  },
  {
    slug: '05',
    id: 'courtside',
    featured: true,
    stage: 'production',
    number: '05',
    title: 'Courtside',
    role: 'Independent product engineer',
    stack: 'SvelteKit, TypeScript, Supabase, TanStack Query, Vitest, Playwright',
    team: 'Independent build for a casual badminton club',
    workType: 'personal product',
    disclosure:
      'Public personal project. Session operations and rotation recommendations are implemented; real-session validation is ongoing.',
    link: {
      label: 'View Courtside source',
      href: 'https://github.com/ikbakk/badminton-club-helper',
    },
    outcome:
      'A club helper bringing attendance, player rotation, team recommendations, results and session finance into one operator workflow.',
    lede: 'A badminton session has a practical fairness problem: arrivals change, players need breaks, and someone has to remember who is waiting. Courtside gives the operator a clear view of the session and suggestions they can override.',
    note: 'The operator stays in control. Recommendations use recorded session state; public visitors only see safe read-only club information.',
    noteLabel: 'Product decision',
    caseStudy: {
      overview: 'A mobile-first helper for casual badminton clubs.',
      problem:
        'Remembering attendance, fair playing time and session costs becomes difficult while also running a club night.',
      responsibilities:
        'Product flow, courtside interface, rotation and pairing recommendations, Supabase persistence, and verification.',
      approach:
        'Keep the operator workflow explicit: record attendance, recommend players, confirm teams, record sets, then settle the session.',
      technical:
        'SvelteKit and TypeScript with Supabase/Postgres, TanStack Query, transactional commands and append-only session history.',
      constraints:
        'Late arrivals, rest, substitutions and admin overrides must be reflected honestly in the session state.',
      comparison: '',
      features:
        'Roster and attendance, rotation suggestions, team balance, set results, fees, payments and expenses.',
      next: 'Continue validation during real club sessions and refine the courtside experience.',
      links: 'Public source and implementation documentation on GitHub.',
    },
  },
] as const;

export const projectsLede =
  'Selected work across production web delivery, mobile product engineering, local-first tooling, and operational interfaces.';

export const projectsFolioTag = '02 / Selected work';
export const projectsFolioMeta = 'four selected projects';

Object.freeze(projects);
