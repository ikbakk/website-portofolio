import Link from 'next/link'

const ProjectItem = ({ image, slug, techs, title, dim }) => {
  return (
    <div className='group'>
      <section
        className={`scale-90 bg-primary group-hover:z-10 group-hover:scale-110 md:scale-100 ${dim} card relative flex w-full flex-col rounded-none duration-300`}>
        <figure className='object-cover'>
          <img
            className='duration-300 group-hover:scale-105'
            src={image}
            alt='background-card'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-secondary'>{title}</h2>
          <p>
            Tech: <br />
            {techs.map((tech, index) => {
              return (
                <span key={index}>
                  {tech}
                  {index < techs.length - 1 ? ' | ' : ''}
                </span>
              )
            })}
          </p>
          <div className='card-actions justify-start'>
            <Link href={`/projects/${slug.current}`}>
              <button className='bg-secondary px-5 py-2 font-bold tracking-widest text-base-100 duration-100 hover:bg-secondary-focus/80 active:scale-95 active:bg-secondary-focus'>
                More Info
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* <img className='rounded-xl group-hover:opacity-10' src={image} alt='/' />
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
        <Link href={`/projects/${slug.current}`}>
          <p className='cursor-pointer rounded-lg bg-base-100 py-3 text-center text-sm font-bold text-secondary md:text-lg'>
            More Info
          </p>
        </Link>
      </div> */}
    </div>
  )
}

export default ProjectItem
