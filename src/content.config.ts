/**
 * Astro content collection: one markdown body per build entry.
 *
 * The summary metadata (number / role / stack / team / outcome)
 * lives in src/data/projects.ts because it drives the meta dl and the
 * folio bar. The markdown body here is the long-form text for the
 * entry's "body" slot, rendered through the ProjectEntry component.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
  }),
});

export const collections = { projects };
