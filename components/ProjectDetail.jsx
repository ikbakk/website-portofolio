import Image from 'next/image'

const ProjectDetail = ({ data }) => {
  return (
    <div className='w-full'>
      <div className='w-screen h-[50hv] relative'>
        <div className='absolute top-0 left-0 w-full h-[50vh] bg-black/70 z-[2]' />
        <div className='relative block max-w-full'>
          <Image
            className='w-full object-cover'
            fill
            src={`/assets/projects/${data.bg}`}
            alt='/'
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
