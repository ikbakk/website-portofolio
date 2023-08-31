import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

const { SANITY_PROJECTID, SANITY_DATASET } = loadEnv(
  process.env.NODE_EN,
  process.cwd(),
  ''
);
const sanityConfig = {
  projectId: SANITY_PROJECTID,
  dataset: SANITY_DATASET,
  useCdn: false
};

// https://astro.build/config
export default defineConfig({
  integrations: [sanity(sanityConfig), react()]
});
