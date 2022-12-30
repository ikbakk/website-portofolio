import Image from 'next/image'
import Link from 'next/link'
import { RiRadioButtonFill } from 'react-icons/ri'

const ProjectDetail = ({ data }) => {
  return (
    <div className='w-full'>
      <div className='w-screen h-[30hv] z-[-1] relative'>
        <div className='absolute top-0 left-0 w-full h-[40vh] bg-black/70 z-[2]'></div>
        <div className='relative object-cover h-[40vh] block overflow-hidden'>
          <Image
            className='object-cover'
            width={1366}
            height={768}
            src={`/assets/projects/${data.bg}`}
            alt='/'
          />
        </div>
        <div className='absolute top-[35%]  max-w-7xl w-full z-[2] translate-y-[-50] p-4'>
          <h2 className='py-2 text-base-content'>{data.title}</h2>
          <h3>
            {data.tech.map((t, i) => {
              return (
                <span key={t}>
                  {t}
                  {i < data.tech.length - 1 ? ' / ' : ''}
                </span>
              )
            })}
          </h3>
        </div>
      </div>
      <div className='max-w-7xl mx-auto p-2 grid md:grid-cols-5 gap-8 py-8'>
        <div className='col-span-4 space-y-4'>
          <div className='text-sm breadcrumbs text-secondary'>
            <ul>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/#projects'>Project</Link>
              </li>
              <li>{data.title}</li>
            </ul>
          </div>
          <h2 className='text-accent'>Overview</h2>
          <p>{data.overview}</p>
          <div className='space-x-4'>
            <a className='btn btn-secondary' href={data.code}>
              <button>Code</button>
            </a>
            <a className='btn btn-secondary' href={data.demo}>
              <button>Demo</button>
            </a>
          </div>
        </div>
        <div className='col-span-4 md:col-span-1 rounded-xl bg-base-300'>
          <div className='p-2'>
            <p className='text-center font-bold text-accent pb-2'>
              Technologies
            </p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              {data.tech.map((t) => (
                <p className='py-2 flex items-center'>
                  <RiRadioButtonFill className='pr-1' /> {t}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Link href='/#projects'>
          <p className='underline hover:text-secondary underline-offset-4 cursor-pointer'>
            Back
          </p>
        </Link>
      </div>
    </div>
  )
}

export default ProjectDetail
