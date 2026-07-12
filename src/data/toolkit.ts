/**
 * Five toolkit items (the kinds of work the engineer does). Listed
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
    number: "01",
    category: "Frontend applications",
    body: "Production React, Next.js, Astro, SolidJS, and TypeScript work: turning Figma designs, REST APIs, and existing codebases into responsive interfaces that teams can maintain after launch.",
    tag: "React · Next.js · Astro · SolidJS · TypeScript",
  },
  {
    number: "02",
    category: "Mobile development",
    body: "Flutter and React Native applications for Android and iOS, including feature delivery, API integration, localization, CMS-driven content, production fixes, and migration work.",
    tag: "Flutter · Dart · React Native · REST API · Sanity CMS",
  },
  {
    number: "03",
    category: "API integration & BFF workflows",
    body: "Comfortable working with Backend-for-Frontend architectures, REST endpoints, authentication flows, asynchronous data fetching, and the edge cases that appear when frontend screens depend on real services.",
    tag: "REST API · BFF · React Query · Postman · Node.js",
  },
  {
    number: "04",
    category: "Technical SEO & static sites",
    body: "High-performance Astro and Next.js sites with structured data, XML sitemaps, robots.txt, canonical URLs, Open Graph metadata, responsive images, and Search Console setup.",
    tag: "Astro · Schema.org · Core Web Vitals · Open Graph",
  },
  {
    number: "05",
    category: "Dashboards & operational data",
    body: "Real-time interfaces for IoT and analytics use cases, with MQTT streams, Firebase data, cached queries, and charts that help users understand operational metrics quickly.",
    tag: "MQTT · Firebase · React Query · Recharts · Supabase",
  },
] as const;

export const toolkitLede =
  "The practical stack I use most often: frontend applications, cross-platform mobile work, API integration, technical SEO, and data-heavy dashboards.";

export const toolkitFolioTag = "03 / Toolkit";
export const toolkitFolioMeta = "web, mobile, APIs, SEO";

Object.freeze(toolkit);
