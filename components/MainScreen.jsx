import React from 'react'
import Link from 'next/link'
import { RxLinkedinLogo, RxGithubLogo, RxDownload } from 'react-icons/rx'
import { RiExternalLinkLine } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'

const MainScreen = ({ data }) => {
  const { firstName, lastName, description } = data
  const navList = [
    { name: 'Skills', link: '/#skills' },
    { name: 'Projects', link: '/#projects' },
    { name: 'Resume', link: '/#resume' },
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
                    target='_blank'
                    className='flex items-center space-x-3 duration-200 hover:text-secondary'
                    href='#'>
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

      {/* <div className='max-w-[80rem] flex items-center justify-center p-2 mx-auto'>
        <div className='space-y-8 text-center mx-4 p-4'>
          <p className='uppercase text-sm tracking-widest'>
            build anything you want
          </p>
          <h1>
            Hi, I&#39;m {firstName}
            <span className='text-secondary'> {lastName}</span>
          </h1>
          <p className='sm:max-[70%] m-auto text-center'>{description}</p>
          <div className='flex item-center justify-between max-w-xs m-auto py-4'>
            <a
              href='https://www.linkedin.com/in/ikbak'
              target='_blank'
              rel='norefferer'>
              <div
                className='home-icon tooltip tooltip-secondary'
                data-tip='LinkedIn Account'>
                <RxLinkedinLogo />
              </div>
            </a>
            <a
              href='https://www.github.com/ikbakk'
              target='_blank'
              rel='norefferer'>
              <div
                className='home-icon tooltip tooltip-secondary'
                data-tip='Github Page'>
                <RxGithubLogo />
              </div>
            </a>
            <Link href='/#contact'>
              <div
                className='home-icon tooltip tooltip-secondary'
                data-tip='Contact'>
                <AiOutlineMail />
              </div>
            </Link>
            <Link href='/resume'>
              <div
                className='home-icon tooltip tooltip-secondary'
                data-tip='Resume'>
                <BsFillPersonLinesFill />
              </div>
            </Link>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default MainScreen
