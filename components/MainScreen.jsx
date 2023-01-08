import React from 'react'
import Link from 'next/link'
import { RxLinkedinLogo, RxGithubLogo } from 'react-icons/rx'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'

const MainScreen = ({ data }) => {
  const { firstName, lastName, description } = data
  return (
    <div id='home' className='hero h-screen'>
      <div className='max-w-[80rem] flex items-center justify-center p-2 mx-auto'>
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
      </div>
    </div>
  )
}

export default MainScreen
