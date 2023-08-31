export type MainInfo = {
  _id: string;
  description: string | null;
  firstName: string;
  lastName: string;
  image: Image;
  projects: ProjectOverview[];
  skills: Skill[];
  socials: Social[];
  resumeLink: string;
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
  tech: string[];
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
