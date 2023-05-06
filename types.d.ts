interface Image {
  asset: {
    _ref: string;
  };
}

interface Social {
  link: string;
  name: string;
}

export interface Skill {
  logo: Image;
  name: string;
}

export interface Project {
  image: Image;
  overview: string;
  slug: {
    current: string;
  };
  tech: string[];
  title: string;
}

export interface ProjectDetail {
  image: Image;
  overview: string;
  slug: {
    current: string;
  };
  tech: string[];
  title: string;
  demo: string;
  code: string;
}

export interface MainScreenProps {
  _id: string;
  description: string | null;
  firstName: string;
  lastName: string;
  image: Image;
  projects: Project[];
  skills: Skill[];
  socials: Social[];
}
