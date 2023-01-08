import Image from 'next/image'
import Link from 'next/link'
import { RiRadioButtonFill } from 'react-icons/ri'
import { imgUrl } from '../utils/sanity'

const ProjectDetail = ({ data }) => {
  const { title, overview, tech, image, demo, code } = data
  return (
    <div className='flex w-full flex-col'>
      <div className='z-[-1] w-full'>
        <div className='absolute top-0 left-0 z-[2] h-[30vh] w-full bg-black/70 '></div>
        <div className='h-[30vh] overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={imgUrl(image).url()}
            alt='/'
          />
        </div>
        <div className='absolute top-[10%] z-[2] w-full  max-w-7xl translate-y-[-50] p-4 md:top-[15%] '>
          <h2 className='py-2 text-base-content'>{title}</h2>
          <h3>
            {tech.map((item, index) => {
              return (
                <span key={item.name}>
                  {item}
                  {index < tech.length - 1 ? ' / ' : ''}
                </span>
              )
            })}
          </h3>
        </div>
      </div>
      <div className='mx-auto grid max-w-7xl gap-8 p-2 py-8 md:grid-cols-5'>
        <div className='col-span-4 space-y-4'>
          <div className='breadcrumbs overflow-hidden text-sm text-secondary'>
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
          <h2 className='text-accent'>Overview</h2>
          <p>{overview}</p>
          <div className='space-x-4'>
            <a className='btn-secondary btn' href={code}>
              <button>Code</button>
            </a>
            <a className='btn-secondary btn' href={demo}>
              <button>Demo</button>
            </a>
          </div>
        </div>
        <div className='col-span-4 rounded-xl bg-base-300 md:col-span-1'>
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
        </div>
        <Link href='/#projects'>
          <p className='cursor-pointer underline underline-offset-4 hover:text-secondary'>
            Back
          </p>
        </Link>
      </div>
    </div>
  )
}

export default ProjectDetail
