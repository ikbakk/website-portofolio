import Link from 'next/link'
import { RiRadioButtonFill } from 'react-icons/ri'
import { imgUrl } from '../utils/sanity'
import Image from 'next/image'

const ProjectDetail = ({ data }) => {
  const { title, overview, tech, image, demo, code } = data
  return (
    <section className='flex w-full flex-col'>
      <section className='relative z-[-1] w-full'>
        <div className='absolute top-0 left-0 z-[2] h-[30vh] w-full bg-black/70 '></div>
        <figure className='h-[30vh] overflow-hidden'>
          <Image
            className='h-full w-full object-cover'
            src={imgUrl(image).url()}
            alt='background-image'
            width={1366}
            height={768}
          />
        </figure>
        <div className='absolute bottom-0 z-[2] w-full  max-w-7xl p-4'>
          <h1 className='py-2'>{title}</h1>
        </div>
      </section>
      <article className='mx-auto grid max-w-7xl gap-8 p-4 py-8 md:grid-cols-5'>
        <div className='col-span-4 space-y-4'>
          <div className='breadcrumbs overflow-hidden text-sm text-accent'>
            <ul className=''>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/#projects'>Project</Link>
              </li>
              <li>{title}</li>
            </ul>
          </div>
          <h2 className='text-secondary'>Overview</h2>
          <p>{overview}</p>
          <div className='space-x-4 py-2'>
            <a
              target='_blank'
              className='bg-secondary px-5 py-2 font-bold tracking-widest text-base-100 duration-100 hover:bg-secondary-focus/80 active:scale-95 active:bg-secondary-focus'
              href={code}>
              <button>Code</button>
            </a>
            <a
              target='_blank'
              className='bg-secondary px-5 py-2 font-bold tracking-widest text-base-100 duration-100 hover:bg-secondary-focus/80 active:scale-95 active:bg-secondary-focus'
              href={demo}>
              <button>Demo</button>
            </a>
          </div>
        </div>
        <section className='col-span-4 rounded-xl bg-base-300 md:col-span-1'>
          <div className='p-2'>
            <p className='pb-2 text-center font-bold text-accent'>
              Technologies
            </p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              {tech.map((tech) => (
                <p className='flex items-center py-2'>
                  <RiRadioButtonFill className='pr-1' /> {tech}
                </p>
              ))}
            </div>
          </div>
        </section>
        <Link className='group relative w-fit' href='/#projects'>
          <p className='cursor-pointer duration-200 hover:text-secondary'>
            Back
          </p>
          <div className='h-[1px] w-[0%] rounded-full bg-white delay-100 duration-200 group-hover:w-[100%] group-hover:bg-secondary'></div>
        </Link>
      </article>
    </section>
  )
}

export default ProjectDetail
