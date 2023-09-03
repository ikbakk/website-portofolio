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

export type Skill = {
  name: string;
  logo: Image;
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

export type Tech = {
  name: string;
  logo: Image;
};
