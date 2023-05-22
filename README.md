This [Website portfolio](https://ikbak.vercel.app/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Sanity](https://sanity.io). The primary purpose of this portfolio is to provide an interactive and visually appealing showcase of my projects, skills, experience also as my personal playground to try something new

## Getting Started

Clone the repo:

```
git clone https://github.com/ikbakk/NextJS-portofolio.git
```

then run:

```
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn deva
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- **app:**
  This directory contains the routes of this app

- **components:**
  In the components directory, you'll find reusable UI components that are used throughout your website portfolio. These components can include headers, footers, navigation menus, project cards, and any other UI elements that appear on multiple pages.

- **app/studio:**
  This directory is for host sanity studio inside your app instead of separate Sanity studio. Inside this directory another route must be created `app/studio/[[...index]]/page.tsx` for the sanity studio to be hosted in your app. This is basic example from [Documentation](https://www.npmjs.com/package/next-sanity#next-sanitystudio)

```ts
'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '../../../sanity.config';

export function Studio() {
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return <NextStudio config={config} />;
}
```

- **schemas:**
  This folder contain contains the schema definitions for your content models. [Learn how to create schemas](https://www.sanity.io/docs/schema-types)

- **utils:**
  This folder include GROQ queries to fetch needed data also config for [`next-sanity`](https://www.npmjs.com/package/next-sanity)

## Environment Variables

NEXT*PUBLIC_SANITY_DATASET=\_sanity project dataset*
NEXT*PUBLIC_SANITY_PROJECTID=\_sanity project id*

## Sanity Config

- `sanity.config.ts`
  Config for sanity studio

```ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  basePath: '/studio', //This is config basepath for sanity studio, must be same as route in app folder
  name: 'Portfolio_Sanity_Studio',
  title: 'Portfolio Sanity Studio',

  projectId: 'projectid',
  dataset: 'dataset',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
});
```
