import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineChevronDoubleUp } from 'react-icons/hi'
import ContactImg from '../public/assets/contact.png'

const Contact = () => {
  return (
    <div id='contact' className='w-full lg:h-screen font-raleway'>
      <div className='max-w-[1240px] m-auto px-2 py-16 w-full '>
        <p className='text-xl tracking-widest uppercase text-secondary'>
          Contact
        </p>
        <h2 className='py-4 text-accent'>Get In Touch</h2>
        <div className='grid lg:grid-cols-5 gap-8'>
          {/* left */}
          <div className='col-span-3 bg-base-300 lg:col-span-2 w-full h-full shadow-xl shadow-base-200 rounded-xl p-4'>
            <div className='lg:p-4 h-full '>
              <div>
                <Image
                  className='rounded-xl hover:scale-105 ease-in duration-100'
                  src={ContactImg}
                  alt='/'
                />
              </div>
              <div>
                <h2 className='py-2 text-secondary'>Muhammad Iqbal Firdaus</h2>
                <p>Front-End Developer</p>
                <p className='py-4'>
                  I am available for freelance or full-time positions. Contact
                  me and let&apos;s talk.
                </p>
              </div>
              <div>
                <p className='uppercase pt-8'>Connect With Me</p>
                <div className='flex items-center justify-between py-4'>
                  <a
                    href='https://www.linkedin.com/in/ikbak'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='contact-icon'>
                      <FaLinkedinIn />
                    </div>
                  </a>
                  <a
                    href='https://github.com/ikbakk'
                    target='_blank'
                    rel='noreferrer'>
                    <div className='contact-icon'>
                      <FaGithub />
                    </div>
                  </a>
                  <Link href='/resume'>
                    <div className='contact-icon'>
                      <BsFillPersonLinesFill />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className='col-span-3 w-full h-auto shadow-xl shadow-bg-base-200 bg-base-300 rounded-xl lg:p-4'>
            <div className='p-4'>
              <form
                action='https://getform.io/f/fc178a0f-7023-4601-8d55-1a51e158dc15'
                method='POST'
                encType='multipart/form-data'>
                <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
                  <div className='flex flex-col'>
                    <label className='uppercase text-sm py-2'>Name</label>
                    <input
                      placeholder='Your name'
                      className='input input-secondary'
                      type='text'
                      name='name'
                      required
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='uppercase text-sm py-2'>
                      Phone Number
                    </label>
                    <input
                      className='input input-secondary'
                      placeholder='Phone number'
                      type='text'
                      name='phone'
                      required
                    />
                  </div>
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2'>Email</label>
                  <input
                    className='input input-secondary'
                    placeholder='email@example.com'
                    type='email'
                    name='email'
                    required
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2'>Subject</label>
                  <input
                    className='input input-secondary'
                    placeholder='Subject'
                    type='text'
                    name='subject'
                    required
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2'>Message</label>
                  <textarea
                    placeholder='Message'
                    className='textarea textarea-secondary'
                    rows='10'
                    required
                    name='message'></textarea>
                </div>
                <button className='w-full btn-secondary btn text-secondary-content p-4 mt-4'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='flex justify-center py-12'>
          <Link href='/'>
            <div className='rounded-full shadow-lg bg-base-300 shadow-base-200 p-4 cursor-pointer hover:scale-110 ease-in duration-75'>
              <HiOutlineChevronDoubleUp className='text-secondary' size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
