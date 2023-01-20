import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineChevronDoubleUp } from 'react-icons/hi'
import ContactImg from '../public/assets/contact.png'

const Contact = () => {
  return (
    <section id='contact' className='w-full font-raleway lg:h-screen'>
      <div className='m-auto w-full max-w-[1240px] px-2 py-16 '>
        <p className='sticky top-5 text-xl uppercase tracking-widest text-secondary'>
          Contact
        </p>
        <h2 className='py-4 text-accent'>Get In Touch</h2>
        <div className='flex flex-col'>
          <div className='col-span-3 h-full w-full rounded-xl bg-base-300 p-4 shadow-xl shadow-base-200 lg:col-span-2'>
            <div className='h-full lg:p-4 '>
              <div>
                <Image
                  className='rounded-xl duration-100 ease-in hover:scale-105'
                  src={ContactImg}
                  alt='/'
                />
              </div>
              <div>
                <h2 className='py-2 text-secondary'>Muhammad Iqbal Firdaus</h2>
                <p>Front-End Developer</p>
                <p className='pt-4'>
                  I am available for freelance or full-time positions. Contact
                  me and let&apos;s talk.
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className='shadow-bg-base-200 col-span-3 h-auto w-full rounded-xl bg-base-300 shadow-xl lg:px-4'>
            <div className='px-4'>
              <form
                action='https://getform.io/f/fc178a0f-7023-4601-8d55-1a51e158dc15'
                method='POST'
                encType='multipart/form-data'>
                <div className='grid w-full gap-4 py-2 md:grid-cols-2'>
                  <div className='flex flex-col'>
                    <label className='py-2 text-sm uppercase'>Name</label>
                    <input
                      placeholder='Your name'
                      className='input-secondary input'
                      type='text'
                      name='name'
                      required
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='py-2 text-sm uppercase'>
                      Phone Number
                    </label>
                    <input
                      className='input-secondary input'
                      placeholder='Phone number'
                      type='text'
                      name='phone'
                      required
                    />
                  </div>
                </div>
                <div className='flex flex-col py-2'>
                  <label className='py-2 text-sm uppercase'>Email</label>
                  <input
                    className='input-secondary input'
                    placeholder='email@example.com'
                    type='email'
                    name='email'
                    required
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='py-2 text-sm uppercase'>Subject</label>
                  <input
                    className='input-secondary input'
                    placeholder='Subject'
                    type='text'
                    name='subject'
                    required
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='py-2 text-sm uppercase'>Message</label>
                  <textarea
                    placeholder='Message'
                    className='textarea-secondary textarea'
                    rows='10'
                    required
                    name='message'></textarea>
                </div>
                <button className='btn-secondary btn mt-4 w-full p-4 text-secondary-content'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='flex justify-center py-12'>
          <Link href='/'>
            <div className='cursor-pointer rounded-full bg-base-300 p-4 shadow-lg shadow-base-200 duration-75 ease-in hover:scale-110'>
              <HiOutlineChevronDoubleUp className='text-secondary' size={30} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
