import ProjectItem from './ProjectItem'
import { imgUrl } from '../utils/sanity'
import { useState } from 'react'

const Projects = ({ data }) => {
  const { projects } = data
  const [isDim, setIsDim] = useState(false)
  const dim = isDim ? 'group-hover:opacity-100 opacity-30' : 'opacity-100'

  return (
    <div id='projects' className='w-full font-raleway '>
      <div className='mx-auto max-w-7xl px-2 py-16'>
        <p className='sticky top-5 z-10 text-xl uppercase tracking-widest text-accent'>
          Projects
        </p>
        <h2 className='py-4 text-secondary'>What I&apos;ve Built</h2>
        <div className='grid grid-cols-1 gap-2'>
          {projects.flatMap((project, i) => {
            return (
              <div
                onMouseOver={() => setIsDim(true)}
                onMouseLeave={() => setIsDim(false)}>
                <ProjectItem
                  key={i}
                  dim={dim}
                  slug={project.slug}
                  image={imgUrl(project.image).url()}
                  title={project.title}
                  techs={project.tech}
                  overview={project.overview}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects
