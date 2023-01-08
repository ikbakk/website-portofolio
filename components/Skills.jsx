import React from 'react'
import { imgUrl } from '../utils/sanity'

const Skills = ({ data }) => {
  const { skills } = data
  return (
    <div id='skills' className='w-full lg:h-screen p-2 font-raleway'>
      <div className=' max-w-7xl mx-auto flex space-y-4 flex-col justify-center h-full'>
        <p className='text-xl tracking-widest uppercase text-secondary'>
          Skills
        </p>
        <h2 className='py-4 text-accent'>What I can do</h2>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {skills.map((skill) => {
            return (
              <div key={skill.name}>
                <div className='skill-card'>
                  <div className='m-auto '>
                    <img
                      src={imgUrl(skill.logo).url()}
                      width={64}
                      height={64}
                      alt='/'
                    />
                  </div>
                  <div>
                    <h3>{skill.name}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Skills
