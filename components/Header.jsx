import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

import NavLogo from '../public/assets/logo/logoFillWhite.png'

const Header = () => {
  const [sideBar, setSideBar] = useState(false)

  const sideBarHandle = () => {
    setSideBar(!sideBar)
  }
  return (
    <header className='navbar'>
      <div className='flex w-full justify-between'>
        <Link className='ml-4 hover:scale-105 duration-200' href='/'>
          <Image src={NavLogo} alt='/' width='32' className='cursor-pointer' />
        </Link>
        <div>
          <ul className='hidden space-x-10 text-sm uppercase md:flex'>
            <li className='hover:border-b hover:text-primary hover:border-primary'>
              <Link href='/'>home</Link>
            </li>
            <li className='hover:border-b hover:text-primary hover:border-primary'>
              <Link href='/#about'>about</Link>
            </li>
            <li className='hover:border-b hover:text-primary hover:border-primary'>
              <Link href='/#skills'>skills</Link>
            </li>
            <li className='hover:border-b hover:text-primary hover:border-primary'>
              <Link href='/#projects'>projects</Link>
            </li>
          </ul>
          <div className='btn btn-square btn-ghost md:hidden'>
            <RxHamburgerMenu onClick={sideBarHandle} size={25} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
