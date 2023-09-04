import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from "@astrojs/mdx";
const sanityConfig = {
  projectId: 'ife8w0nb',
  dataset: 'production',
  useCdn: false,
  studioBasePath: '/studio'
};


// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['cdn.sanity.io']
  },
  output: 'hybrid',
  integrations: [sanity(sanityConfig), react(), tailwind(), mdx()]
});