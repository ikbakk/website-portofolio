// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      // Allow the Vercel preview hostname used by the v0 iframe while keeping
      // Vite's host validation enabled for arbitrary external hosts.
      allowedHosts: ['terminal.local', '.v0.build'],
    },
    plugins: [tailwindcss()],
  },
  // Bound the site to a single domain for the build's absolute URLs.
  // Update before deploy.
  site: 'https://ikbak.vercel.app',
  trailingSlash: 'ignore',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
