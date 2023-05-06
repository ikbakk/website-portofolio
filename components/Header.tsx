import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { RxHamburgerMenu, RxLinkedinLogo, RxGithubLogo } from 'react-icons/rx'
import { AiOutlineClose, AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { useRouter } from 'next/router'

import NavLogoWhite from '../public/assets/logo/logoFillWhite.png'

const Header = () => {
  const [sideBar, setSideBar] = useState(false)

  const router = useRouter()
  const sideBarHandle = () => {
    setSideBar(!sideBar)
  }
  return (
    <header
      className={
        router.pathname === '/projects/[slug]'
          ? 'navbar fixed z-10 font-raleway'
          : 'navbar fixed z-10 bg-base-100 font-raleway'
      }>
      <div className='flex w-full justify-between'>
        <Link className='ml-4 duration-200 hover:scale-105' href='/'>
          <Image
            src={NavLogoWhite}
            alt='/'
            width='32'
            className='cursor-pointer'
          />
        </Link>
        <div>
          <ul className='hidden space-x-10 text-sm uppercase md:flex'>
            <li className='header-link'>
              <Link href='/'>home</Link>
            </li>
            <li className='header-link'>
              <Link href='/#about'>about</Link>
            </li>
            <li className='header-link'>
              <Link href='/#skills'>skills</Link>
            </li>
            <li className='header-link'>
              <Link href='/#projects'>projects</Link>
            </li>
            <li className='header-link'>
              <Link href='/#contact'>contact</Link>
            </li>
          </ul>
          <div className='btn-ghost btn-square btn md:hidden'>
            <RxHamburgerMenu onClick={sideBarHandle} size={25} />
          </div>
        </div>
      </div>
      <div className={sideBar ? 'sidebar-overlay' : ''}>
        <div className={sideBar ? 'sidebar-open' : 'sidebar-close'}>
          <div>
            <div className='flex w-full items-center justify-between'>
              <Link href='/'>
                <Image src={NavLogoWhite} alt='/' width='32' />
              </Link>
              <div className='btn-ghost btn-square btn' onClick={sideBarHandle}>
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className='flex flex-col py-4'>
              <ul className='text-sm uppercase'>
                <Link href='/'>
                  <li className='py-4' onClick={() => setSideBar(false)}>
                    Home
                  </li>
                </Link>
                <Link href='#about'>
                  <li className='py-4' onClick={() => setSideBar(false)}>
                    About
                  </li>
                </Link>
                <Link href='/#skills'>
                  <li className='py-4' onClick={() => setSideBar(false)}>
                    Skills
                  </li>
                </Link>
                <Link href='/#projects'>
                  <li className='py-4' onClick={() => setSideBar(false)}>
                    Projects
                  </li>
                </Link>
              </ul>
              <div className='pt-40'>
                <p className='uppercase tracking-widest text-secondary'>
                  Let&#39;s Connect
                </p>
                <div className='my-4 flex w-full items-center justify-between sm:w-[80%]'>
                  <a
                    href='https://www.linkediin.com/in/ikbak'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='sidebar-btn'>
                      <RxLinkedinLogo />
                    </div>
                  </a>
                  <a
                    href='https://www.github.com/ikbakk'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='sidebar-btn'>
                      <RxGithubLogo />
                    </div>
                  </a>
                  <Link href='/#contact'>
                    <div
                      className='sidebar-btn'
                      onClick={() => setSideBar(!sideBar)}>
                      <AiOutlineMail />
                    </div>
                  </Link>
                  <Link href='/resume'>
                    <div
                      className='sidebar-btn'
                      onClick={() => setSideBar(!sideBar)}>
                      <BsFillPersonLinesFill />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
