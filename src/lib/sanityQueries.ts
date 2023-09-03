export const mainInfoQuery = `*[_type == 'info'][0]{
  firstName,
  lastName,
  description,
  image,
  resume
}`;

export const projectDetailQuery = `*[_type == 'projects' && slug.current == $slug][0]{
  title, overview, tech[]->{name,logo}, image, demo, code
}`;

export const projectOverviewQuery = `
*[_type == 'projects']{
  title,
  image,
  'techs':tech[]->{name,logo},
  overview,
  slug
}`;

export const featuredQuery = `
*[_type == 'featured'][0]{
  'featured': featured[]->{
    title, 
    'techs': tech[]->{name,logo},
    overview,
    slug
  }
}
`
