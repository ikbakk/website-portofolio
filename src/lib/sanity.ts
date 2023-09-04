import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'types';

const sanityConfig = {
  projectId: 'ife8w0nb',
  dataset: 'production',
  useCdn: false,
  studioBasePath: '/studio'
};

const builder = imageUrlBuilder(sanityConfig);

export const urlFor = (source: Image) => builder.image(source);
