export const mainInfoQuery = `*[_type == 'info'][0]{
  firstName,
  lastName,
  description,
  image,
  resume
}`;

export const projectDetailQuery = `*[_type == 'projects' && slug.current == $slug][0]{
  title, overview, 'techs':tech[]->{name,logo}, image, demo, code, description,
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
`;

export const skillsQuery = `
*[_type == 'skillsets']{
  title,
  'techs': techs[]->{name, logo}
}
`;

export const techsQuery = `
*[_type == 'techs']{
  name, logo
}
`;
