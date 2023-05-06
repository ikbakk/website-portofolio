import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  basePath: '/studio',
  name: 'Portfolio__Sanity_Studio',
  title: 'Portfolio Sanity Studio',

  projectId: 'ife8w0nb',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
});
