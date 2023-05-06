import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  apiVersion: '2021-10-21',
  useCdn: false
};

const builder = imageUrlBuilder(config);

export const sanityClient = createClient(config);
// export const imgUrl = (src: string) => createImageUrlBuilder(config).image(src)
export const imgUrl = (src) => builder.image(src);
