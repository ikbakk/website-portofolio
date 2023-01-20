import Image from 'next/image'
import React from 'react'
import ContactImg from '../public/assets/contact.png'

const Contact = () => {
  return (
    <section id='contact' className='w-full font-raleway lg:h-screen'>
      <div className='m-auto w-full max-w-[1240px] px-2 py-16 '>
        <p className='text-xl uppercase tracking-widest text-accent'>Contact</p>
        <h2 className='py-4 text-secondary'>Get In Touch</h2>
        <div className='flex flex-col'>
          <div className='col-span-3 h-full w-full  bg-primary p-4 shadow-xl shadow-base-200 lg:col-span-2'>
            <div className='h-full lg:p-4 '>
              <hgroup>
                <h2 className='py-2 text-secondary'>Muhammad Iqbal Firdaus</h2>
                <h3 className=''>Front-End Developer</h3>
              </hgroup>
            </div>
          </div>

          {/* right */}
          <div className='shadow-bg-base-200 col-span-3 h-auto w-full bg-primary pb-4 shadow-xl lg:px-4'>
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
                      className='input-secondary input rounded-none'
                      type='text'
                      name='name'
                      required
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className=' py-2 text-sm uppercase'>
                      Phone Number
                    </label>
                    <input
                      className='input-secondary input rounded-none'
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
                    className='input-secondary input rounded-none'
                    placeholder='email@example.com'
                    type='email'
                    name='email'
                    required
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='py-2 text-sm uppercase'>Subject</label>
                  <input
                    className='input-secondary input rounded-none'
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
                    className='textarea-secondary textarea rounded-none'
                    rows='10'
                    required
                    name='message'></textarea>
                </div>
                <button className='btn-secondary btn mt-4 w-full rounded-none p-4 text-secondary-content'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
