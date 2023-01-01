import React from 'react'
import Head from 'next/head'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const resume = () => {
  const skills = [
    'Arduino',
    'HTML',
    'CSS',
    'Javascript',
    'React',
    'Tailwind CSS',
    'Next JS'
  ]
  return (
    <>
      <Head>
        <title>Iqbal | Resume</title>
        <meta name='description' content="I'm a front-end web developer" />
        <link rel='icon' href='/fav.png' />
      </Head>
      <div className='max-w-[940px] mx-auto p-2 pt-[120px]'>
        <h2 className='text-center'>Resume</h2>
        <div className='bg-secondary text-secondary-content my-4 p-4 w-full flex justify-between items-center'>
          <h2 className='text-center'>Muhammad Iqbal Firdaus</h2>
          <div className='flex'>
            <a
              href='https://www.linkedin.com/in/ikbak'
              target='_blank'
              rel='noreferrer'>
              <FaLinkedinIn size={20} style={{ marginRight: '1rem' }} />
            </a>
            <a
              href='https://github.com/ikbakk'
              target='_blank'
              rel='noreferrer'>
              <FaGithub size={20} style={{ marginRight: '1rem' }} />
            </a>
          </div>
        </div>
        <div className='text-center py-4 text-xl font-bold uppercase tracking-wider'>
          <div className='hidden sm:block'>
            <p>
              Arduino <span className='px-1'>|</span> Web Development{' '}
            </p>
          </div>
          <div className='block sm:hidden'>
            <p>Arduino</p>
            <p className='py-2'>Web Development</p>
          </div>
        </div>
        <p>
          Analytical and motivated web development newbie with experience
          hands-on with some small project. With the ability to learn, adapt and
          grow. Eager to be challenged to improve web development skills. Able
          to effectively self-manage during independent projects as well as
          collaborate in a team setting
        </p>

        {/* Skills */}
        <div className='text-center py-4'>
          <h5 className='text-center underline text-[18px] py-2'>Skills</h5>
          <div className='py-2 flex flex-col md:flex-row justify-center space-x-6'>
            <div className='flex-col md:space-x-5 justify-center items-center md:flex-row flex'>
              {skills.map((skill, i) => (
                <ul key={skill}>
                  <li> {skill} </li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <h5 className='text-center underline text-[18px] py-4'>Experience</h5>
        {/* Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold italic'>Mitra Karsa Utama</span>
            <span className='px-2'>|</span>Lombok, Indonesia
          </p>
          <p className='py-1 italic'>Professional Placement (2020)</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>
              Learn how engineer do preventing maintenance at the Base
              Transceiver Station site.
            </li>
            <li>
              Learn how troubleshooting is done when something happen at the
              Base Transceiver Station site.
            </li>
            <li>
              Experience how it is to work at heigh with proper safety measure
              and equipment.
            </li>
          </ul>
        </div>
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold italic'>University Robotics Team</span>
            <span className='px-2'>|</span>Mataram, Indonesia
          </p>
          <p className='py-1 italic'>
            Programmer | Mechanics helper (2019 - 2020)
          </p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>
              Learn code from previous generation of the team and try to migrate
              it to Raspberry Pi to be able operate without having a laptop
              inside the machine to reduce weight.
            </li>
            <li>
              Troubleshoot issues and concerns while migrating to other
              platform.
            </li>
            <li>
              Helped some small things for team's mechanics such as cutting
              materials for the machine's framework.
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default resume
