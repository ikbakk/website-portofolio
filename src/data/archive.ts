import { projects } from './projects';

export interface ArchiveProject {
  id: string;
  title: string;
  summary: string;
  stage: string;
  kind: string;
  stack: string[];
  image?: { src: string; alt: string; caption?: string; width: number; height: number };
  caseHref: string;
  contentId: string;
  featured: boolean;
  source: (typeof projects)[number];
}

const summaries: Record<string, string> = {
  courtside: 'Helping badminton clubs run their sessions.',
  'sungkar-group': 'A clearer way to plan a trip to Lombok.',
  beaconnect: 'Stay connected, without feeling watched.',
  'cv-builder': 'Your resume, your templates, your own device.',
  'ward-monitor': 'Making operational data easier to read.',
};
export const stageLabels: Record<string, string> = {
  production: 'Live project',
  'internal-alpha': 'Internal alpha',
  prototype: 'Prototype',
  'local-tool': 'Local tool',
};

export const archiveProjects: ArchiveProject[] = [...projects]
  .sort((a, b) => Number(b.id === 'courtside') - Number(a.id === 'courtside'))
  .map((source) => ({
    id: source.id,
    title: source.title,
    summary: summaries[source.id],
    stage: source.stage,
    kind: source.workType === 'shareable freelance product' ? 'Client project' : 'Personal project',
    stack: source.stack.split(',').map((s) => s.trim()),
    image: source.image,
    caseHref: `/projects/${source.id}/`,
    contentId: source.slug,
    featured: source.featured,
    source,
  }));
export const featuredProjects = archiveProjects.filter((project) => project.featured);
export const getArchiveProject = (id: string): ArchiveProject | undefined =>
  archiveProjects.find((project) => project.id === id);
