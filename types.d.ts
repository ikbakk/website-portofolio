export type MainInfo = {
  description: string;
  firstName: string;
  lastName: string;
  image: Image;
  resume: string;
};

export type ProjectDetails = ProjectOverview & {
  demo: string;
  code: string;
  description: Description[];
};

export type ProjectOverview = {
  image: Image;
  overview: string;
  slug: {
    current: string;
  };
  techs: Tech[];
  title: string;
};

export type Skillset = {
  title: string;
  techs: Tech[];
};

type Image = {
  asset: {
    _ref: string;
  };
};

type Social = {
  name: string;
  link: string;
};

type Description = {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }[];
  markDefs: {
    _key: string;
    _type: string;
  }[];
};

export type Tech = {
  name: string;
  logo: Image;
};
