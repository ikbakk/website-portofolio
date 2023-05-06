'use client';

import ProjectItem from './ProjectItem';
import { imgUrl } from '../utils/sanity';
import { useState, FC } from 'react';
import { Project } from '../types';

interface Props {
  data: Project[];
}

const Projects: FC<Props> = ({ data }) => {
  const [isDim, setIsDim] = useState(false);
  const dim = isDim ? 'group-hover:opacity-100 opacity-30' : 'opacity-100';

  return (
    <div id='projects' className='w-full'>
      <div className='max-w-7xl px-2 py-16'>
        <div className='w-full bg-base-100'>
          <p className='py-5 text-xl uppercase tracking-widest text-accent'>
            Projects
          </p>
        </div>
        <h2 className='py-4 text-secondary'>What I&apos;ve Built</h2>
        <div className='grid grid-cols-1 gap-2'>
          {data.flatMap((data, i) => {
            return (
              <div
                key={i}
                onMouseOver={() => setIsDim(true)}
                onMouseLeave={() => setIsDim(false)}>
                <ProjectItem
                  dim={dim}
                  slug={data.slug}
                  image={imgUrl(data.image).url()}
                  title={data.title}
                  techs={data.tech}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
