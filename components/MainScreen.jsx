import React from 'react'
import Link from 'next/link'
import { RxLinkedinLogo, RxGithubLogo, RxDownload } from 'react-icons/rx'
import { RiExternalLinkLine } from 'react-icons/ri'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'

const MainScreen = ({ data }) => {
  const { firstName, lastName, description } = data
  const navList = [
    { name: 'Skills', link: '/#skills' },
    { name: 'Projects', link: '/#projects' },
    { name: 'Contact', link: '/#contact' }
  ]
  return (
    <section id='home' className='flex h-screen flex-col md:flex-row-reverse '>
      <section className='flex items-center md:basis-1/2 '>
        <section className='flex-col justify-between p-8 md:fixed md:p-10 xl:space-y-5'>
          <div>
            <h1>
              {firstName}
              <span className='text-secondary'> {lastName}</span>
            </h1>
            <h3 className='pt-1 text-secondary '>Front-End Web Developer</h3>
            <p className='prose pt-5'>{description}</p>
          </div>
          <nav className='py-5'>
            <ul className='hidden md:flex md:flex-col'>
              {navList.map((list, index) => (
                <li key={index} className='nav-li group'>
                  <div className='nav-li-bar' />
                  <Link
                    className='px-5 duration-300 group-hover:text-secondary'
                    href={list.link}>
                    {list.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <footer>
            <nav>
              <ul className='flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0'>
                <li className='group w-fit active:scale-95'>
                  <a
                    target='_blank'
                    className='flex items-center space-x-3 duration-200 hover:text-secondary'
                    href='https://github.com/ikbakk'>
                    <figure>
                      <RxGithubLogo size={32} />
                    </figure>
                    <p className='pt-1'>Github</p>
                    <figure className='duration-75 group-hover:translate-x-3'>
                      <RiExternalLinkLine size={22} />
                    </figure>
                  </a>
                </li>
                <li className='group w-fit active:scale-95'>
                  <a
                    target='_blank'
                    className='flex items-center space-x-3 duration-200 hover:text-secondary'
                    href='https://linkedin/in/ikbakk'>
                    <figure>
                      <RxLinkedinLogo size={32} />
                    </figure>
                    <p className='pt-1'>LinkedIn</p>
                    <figure className='duration-75 group-hover:translate-x-3'>
                      <RiExternalLinkLine size={22} />
                    </figure>
                  </a>
                </li>
                <li className='group w-fit active:scale-95'>
                  <a
                    download
                    target='_blank'
                    className='flex items-center space-x-3 duration-200 hover:text-secondary'
                    href='/assets/CV_Muhammad_Iqbal_Firdaus.pdf'>
                    <figure>
                      <RxDownload size={32} />
                    </figure>
                    <p className='pt-1'>Resume</p>
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </section>
      </section>
      <section className='left-0 top-0 h-full w-full p-8 md:basis-1/2 md:p-10'>
        <Skills data={data} />
        <Projects data={data} />
        <Contact />
      </section>
    </section>
  )
}

export default MainScreen
