// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: { allowedHosts: ['terminal.local', 'sb-10j7zephugr0.vercel.run'] },
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
