import React from 'react'
import Link from 'next/link'

const ProjectItem = ({ image, slug, techs, title }) => {
  console.log(slug.current)
  return (
    <div className='group relative flex h-auto w-full items-center justify-center rounded-xl bg-base-300 from-secondary  to-accent p-3 shadow-xl shadow-base-300 hover:bg-gradient-to-r'>
      <img className='rounded-xl group-hover:opacity-10' src={image} alt='/' />
      <div className='absolute top-[50%] left-[50%] hidden translate-x-[-50%] translate-y-[-50%] duration-100 ease-in-out group-hover:block'>
        <h3 className='text-center tracking-wider text-accent-content md:text-2xl'>
          {title}
        </h3>
        <p className='md:text-md text-center text-xs text-accent-content md:pb-4 md:pt-2'>
          {techs.map((tech, index) => {
            return (
              <span key={index}>
                {tech}
                {index < techs.length - 1 ? ', ' : ''}
              </span>
            )
          })}
        </p>
        <Link href={slug.current}>
          <p className='cursor-pointer rounded-lg bg-base-100 py-3 text-center text-sm font-bold text-secondary md:text-lg'>
            More Info
          </p>
        </Link>
      </div>
    </div>
  )
}

export default ProjectItem
