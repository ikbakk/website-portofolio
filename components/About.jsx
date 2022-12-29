import React from 'react'
import Link from 'next/link'
import AboutMe from '../public/assets/aboutMe.png'
import Image from 'next/image'

const About = () => {
  return (
    <div
      id='about'
      className='w-full font-raleway md:h-screen p-2 flex items-center py-16'>
      <div className=' max-w-7xl m-auto md:grid md:grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl text-justify tracking-widest text-secondary'>
            About
          </p>
          <p className='py-2'>
            I currently a newcomer in buiding responsive Front-End UI
            applications that connect with firebase so far. I'm passionate about
            learning new stuff and understand there is more than one way to
            accomplish a task. Though I am not so proficient yet in building
            front-end application using HTML, CSS, Javascript, and React. I am
            able to learn new tech quickly as i try to build something with it,
            just like i try to learn NextJS to make this website portfolio for
            starter.
          </p>
          <p className='py-2'>
            I started web development back in 2021 when i try to make my final
            year project for my Electrical Engineering degree, a hospital
            monitoring app which read patient's heartrate, oxygen saturation and
            body temperature using corresponding sensors then show the readings
            via web application. The more i learn web development as i develop
            my project, the more i got into it, i keep learning things
            especially in the Front-End side so far.
          </p>
          <Link href='/#projects'>
            <p className='py-2 text-secondary hover:text-secondary-focus underline underline-offset-8 cursor-pointer'>
              Check out some of my simple projects.
            </p>
          </Link>
        </div>
        <div className='w-full h-auto m-auto items-center justify-center p-4 hover:scale-105 ease-in duration-100'>
          <Image
            className='hidden md:flex'
            src={AboutMe}
            width='auto'
            alt='/'
          />
        </div>
      </div>
    </div>
  )
}

export default About
