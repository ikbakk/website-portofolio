import React, { useState } from 'react'
import { db } from './config/firebase'
import { doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import Image from 'next/image'

const Skills = () => {
  const [value, loading, error] = useDocument(
    doc(db, 'porto', 'iqbalFirdaus'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )
  return (
    <div id='skills' className='w-full lg:h-screen p-2 font-raleway'>
      <div className=' max-w-7xl mx-auto flex flex-col justify-center h-full'>
        <p className='text-xl tracking-widest uppercase text-secondary'>
          Skills
        </p>
        <h2 className='py-4'>What I can do</h2>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {loading
            ? null
            : value.data().data[1].skill.map((skill) => {
                return (
                  <>
                    <div
                      key={skill.name}
                      className='p-6 rounded-xl space-y-4 flex flex-col items-center hover:scale-105 ease-in duration-100'>
                      <div className='m-auto'>
                        <Image
                          src={`/..${skill.img}`}
                          width={64}
                          height={64}
                          alt='/'
                        />
                      </div>
                      <div>
                        <h3>{skill.name}</h3>
                      </div>
                    </div>
                  </>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default Skills
