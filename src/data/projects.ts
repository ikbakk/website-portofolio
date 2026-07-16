/**
 * Four featured build entries. The long-form text lives in
 * src/content/projects/0X.md (Astro content collection) and is rendered
 * through the ProjectEntry component. This file is the *summary* that
 * drives the folio bar, the meta dl, and the lede.
 *
 *  number      -  printed as "01 / 2025" on the entry head
 *  year        -  used to derive the right column of the entry-no
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
  number: string;
  year: string;
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
  slug: '01' | '02' | '03' | '04';
  /** Optional screenshot. When provided, the entry renders the
   *  image-first layout; when omitted, the entry renders the
   *  text-only layout with an empty screenshot slot. */
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export const projects: ReadonlyArray<ProjectSummary> = [
  {
    slug: '01',
    number: '01',
    year: '2025',
    title: 'Sungkar Group Indonesia — tourism marketing site for Lombok, Sumbawa, and Labuan Bajo',
    role: 'Freelance frontend engineer',
    stack: 'Astro, TypeScript, multilingual routing, Schema.org, WebP',
    team: 'Solo, working with the Sungkar Group team and local operators',
    workType: 'shareable freelance product',
    disclosure: 'Public client work. Screenshots and product context can be shared.',
    outcome:
      'Shipped a fast, SEO-first tourism marketing site covering Lombok, Sumbawa, and Labuan Bajo with structured data, multilingual content (ID/AR), and Core Web Vitals in the green.',
    image: {
      src: '/projects/sungkargroup.svg',
      alt: 'Sungkar Group Indonesia landing page: hero with private tour Lombok, popular packages, and Lombok, Sumbawa, Labuan Bajo destinations',
      caption: 'Landing page with hero, four popular packages, and multi-destination strip.',
    },
    lede: 'Sungkar Group Indonesia is a Lombok-based tour operator running private tours, open trips, and phinisi charters across Lombok, Sumbawa, and Labuan Bajo. I built the marketing and content surface with Astro, focusing on technical SEO, multilingual routing, WebP image delivery, and a content model that the operations team can extend as new packages are added.',
    note: 'Tourism sites live or die on discoverability and perceived speed. Structured data per package, Open Graph for share previews, and lightweight static rendering mattered more than heavy interactivity.',
    noteLabel: 'What I focused on',
  },
  {
    slug: '02',
    number: '02',
    year: '2024–2025',
    title: 'Real-time IoT monitoring dashboards',
    role: 'IoT dashboard developer',
    stack: 'React, MQTT, Firebase, React Query, Recharts',
    team: 'Freelance, collaborating with backend and IoT teams',
    workType: 'contract product',
    disclosure:
      'Contract work. Architecture and UI patterns can be discussed; client-specific data stays private.',
    outcome:
      'Built responsive dashboards that transform device telemetry and operational metrics into real-time charts and monitoring views.',
    lede: 'Operational teams needed a browser-based way to monitor connected devices and understand telemetry without digging through raw streams. I built React dashboards that subscribe to MQTT-based data flows, persist and read data through Firebase, cache asynchronous requests with React Query, and present key metrics through Recharts visualizations.',
    note: 'Real-time dashboards are only useful when the interface feels stable. Caching, loading states, and chart structure mattered as much as the MQTT integration itself.',
    noteLabel: 'What mattered most',
  },
  {
    slug: '03',
    number: '03',
    year: '2025–present',
    title: 'Cross-platform mobile apps for media and content products',
    role: 'Mobile developer',
    stack: 'Flutter, React Native, REST API, Sanity CMS',
    team: 'Freelance, collaborating with designers and product stakeholders',
    workType: 'contract product',
    disclosure:
      'Contract product work. Shared as generalized product and engineering experience, not client IP.',
    outcome:
      'Maintained a Flutter short-form drama streaming app, migrated an ebook app from React Native to Flutter, and connected mobile UIs to dynamic content systems.',
    lede: 'Media products need fast iteration without breaking the viewing or reading experience. I maintained and enhanced a Flutter streaming platform with new features, REST API integration, localization support, and production bug fixes, then helped migrate a subscription ebook application from React Native to Flutter while preserving existing functionality.',
    note: 'The migration work was a maintainability exercise: keep the product familiar for users while giving the codebase a cleaner path for future Android and iOS development.',
    noteLabel: 'Tradeoff',
  },
  {
    slug: '04',
    number: '04',
    year: '2026',
    title: 'Ward Monitor — ESP32 patient telemetry dashboard',
    role: 'Full-stack frontend and IoT prototyping',
    stack: 'Angular, TypeScript, ESP32, MAX30100, MLX90614, Lucide icons',
    team: 'Solo product build',
    workType: 'personal product',
    disclosure:
      'Self-initiated product prototype. Screenshots, interaction details, and implementation choices can be shared.',
    outcome:
      'Built a backend-ready clinical operations dashboard with real login flow, ward navigation, patient detail pages, and state-aware telemetry cards for ESP32 sensor readings.',
    image: {
      src: '/projects/ward-monitor-dashboard.png',
      alt: 'Ward Monitor dashboard showing clinical operations, priority patient cards, ward boards, vitals, and ESP32 device state',
      caption:
        'Dashboard view with priority review queue, ward boards, state-tinted patient cards, and sensor readings.',
    },
    lede: 'Ward Monitor turns ESP32 sensor data into a nurse-station interface for rooms, beds, monitored patients, and device state. I designed the Angular UI around quick triage: priority patients first, compact icon-led status summaries, state-tinted cards, privacy mode, and route-level detail pages ready to connect to a production backend.',
    note: 'The interface was designed for scan speed. Status is carried by color, icon, and spacing rather than long labels, while the auth and routing seams are prepared for the backend API.',
    noteLabel: 'Product constraint',
  },
] as const;

export const projectsLede =
  'Selected work across tourism sites, IoT dashboards, clinical monitoring, and mobile media products. Each entry focuses on the product constraint, the stack, and the outcome.';

export const projectsFolioTag = '02 / Selected work';
export const projectsFolioMeta = 'four projects, 2024 to present';

Object.freeze(projects);
