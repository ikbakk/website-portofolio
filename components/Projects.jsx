import React from 'react'
import { db } from './config/firebase'
import { doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import ProjectItem from './ProjectItem'

const Projects = () => {
  const [value, loading, error] = useDocument(
    doc(db, 'porto', 'iqbalFirdaus'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )
  return (
    <div id='projects' className='w-full font-raleway'>
      <div className='max-w-7xl mx-auto px-2 py-16'>
        <p className='text-xl tracking-widest uppercase text-secondary'>
          Projects
        </p>
        <h2 className='py-4 text-accent'>What I&apos;ve Built</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          {loading
            ? null
            : value.data().projects.map((project) => {
                return (
                  <ProjectItem
                    id={project.id}
                    title={project.title}
                    bg={project.bg}
                    tech={project.tech}
                  />
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default Projects
