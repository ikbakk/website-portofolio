export const mainInfoQuery = `*[_type =='info' ][0]{
  _id,
  firstName,
  lastName,
  "resumeLink": resume,
  image,
  description,
  'skills': *[_type == 'skills']{
    name,logo
  } | order(name asc),
  'projects': *[_type == 'projects']{
    title,image,tech,overview,slug
  },
  'socials': *[_type == 'socials']{
    name,link, _createdAt
  } | order(_createdAt desc)
}`;

export const projectDetailQuery = `*[_type == 'projects' && slug.current == $slug][0]{
  title, overview, tech, image, demo, code
}`;
