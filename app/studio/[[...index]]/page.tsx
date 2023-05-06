'use client';

import { NextStudio } from 'next-sanity/studio';

import { config } from '../../../utils/sanity';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
