export const mainInfoQuery = `*[_type =='info' ][0]{
  _id,
  firstName,
  lastName,
  image,
  description,
  'skills': *[_type == 'skills']{
    name,logo
  },
  'projects': *[_type == 'projects']{
    title,image,tech,overview,slug
  },
  'socials': *[_type == 'socials']{
    name,link
  }
}`;

export const projectDetailQuery = `*[_type == 'projects' && slug.current == $slug][0]{
  title, overview, tech, image, demo, code
}`;
