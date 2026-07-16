/**
 * Toolkit items (the kinds of work the engineer does). Listed
 * in the order the engineer would reach for them.
 *
 *  number   -  printed in mono, accent color
 *  category  -  h2 of the item (display face)
 *  body     -  short paragraph
 *  tag      -  mono uppercase "React · TypeScript · ..." row
 */
export interface ToolkitItem {
  number: string;
  category: string;
  body: string;
  tag: string;
}

export const toolkit: ReadonlyArray<ToolkitItem> = [
  {
    number: '01',
    category: 'Frontend applications',
    body: 'Production React, Next.js, Astro, SolidJS, and TypeScript work: turning Figma designs, REST APIs, and existing codebases into responsive interfaces that teams can maintain after launch.',
    tag: 'React · Next.js · Astro · SolidJS · TypeScript',
  },
  {
    number: '02',
    category: 'Mobile development',
    body: 'Flutter and React Native applications for Android and iOS, including feature delivery, API integration, localization, CMS-driven content, production fixes, and migration work.',
    tag: 'Flutter · Dart · React Native · REST API · Sanity CMS',
  },
  {
    number: '03',
    category: 'Backend & API workflows',
    body: 'Open to backend work around product APIs, BFF layers, authentication flows, and service boundaries. Most comfortable with NestJS and Express, with exposure to Go Gin when a lean Go service fits the problem.',
    tag: 'NestJS · Express · Go Gin · REST API · BFF',
  },
  {
    number: '04',
    category: 'Agentic coding',
    body: 'Comfortable using Pi Coding Agent as part of the engineering loop: exploring codebases, planning changes, editing with verification, and keeping AI-assisted work grounded in the actual repository.',
    tag: 'Pi Coding Agent · Code review · Verification · Automation',
  },
  {
    number: '05',
    category: 'CLI-heavy tooling',
    body: 'Daily workflow is terminal-first on Linux, with Neovim, shell tools, package managers, git, and local dev servers. I am comfortable debugging and shipping without depending on heavy IDE workflows.',
    tag: 'Linux · Neovim · CLI · Git · Shell',
  },
  {
    number: '06',
    category: 'Dashboards & operational data',
    body: 'Real-time interfaces for IoT and analytics use cases, with MQTT streams, Firebase data, cached queries, and charts that help users understand operational metrics quickly.',
    tag: 'MQTT · Firebase · React Query · Recharts · Supabase',
  },
] as const;

export const toolkitLede =
  'The practical stack I use most often: frontend and mobile applications, backend APIs, agentic coding, CLI-heavy Linux tooling, and operational dashboards.';

export const toolkitFolioTag = '03 / Toolkit';
export const toolkitFolioMeta = 'web, mobile, backend, AI-assisted workflow';

Object.freeze(toolkit);
