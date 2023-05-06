'use client';

import { NextStudio } from 'next-sanity/studio';

import defineConfig from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={defineConfig} />;
}
