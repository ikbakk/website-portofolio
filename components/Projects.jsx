import React from 'react'
import ProjectItem from './ProjectItem'
import { imgUrl } from '../utils/sanity'

const Projects = ({ data }) => {
  const { projects } = data
  return (
    <div id='projects' className='w-full font-raleway'>
      <div className='mx-auto max-w-7xl px-2 py-16'>
        <p className='text-xl uppercase tracking-widest text-secondary'>
          Projects
        </p>
        <h2 className='py-4 text-accent'>What I&apos;ve Built</h2>
        <div className='grid gap-8 md:grid-cols-2'>
          {projects.flatMap((project, i) => {
            return (
              <ProjectItem
                key={i}
                slug={project.slug}
                image={imgUrl(project.image).url()}
                title={project.title}
                techs={project.tech}
                overview={project.overview}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects
