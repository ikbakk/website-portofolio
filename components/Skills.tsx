'use client';

import { useState, FC } from 'react';
import { imgUrl } from '../utils/sanity';
import { Skill } from '../types';

interface Props {
  data: Skill[];
}

const Skills: FC<Props> = ({ data }) => {
  const [isDim, setIsDim] = useState(false);
  const dim = isDim ? 'group-hover:opacity-100 opacity-30' : 'opacity-100';

  return (
    <div id='skills' className='w-full md:py-16'>
      <div className=' mx-auto flex h-full max-w-7xl flex-col justify-center space-y-4 px-2'>
        <div className='bg-base-100'>
          <p className=' py-5 text-xl uppercase tracking-widest text-accent'>
            Skills
          </p>
        </div>
        <h2 className='py-4 text-secondary'>What I can do</h2>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
          {data.map((data) => {
            return (
              <div
                onMouseOver={() => setIsDim(true)}
                onMouseLeave={() => setIsDim(false)}
                className='group relative'
                key={data.name}>
                <div
                  className={`flex ${dim} scale-90 flex-col items-center space-y-4 bg-primary p-6 text-secondary duration-200 ease-in hover:scale-110 md:scale-100`}>
                  <div className='m-auto '>
                    <img
                      src={imgUrl(data.logo).url()}
                      width={64}
                      height={64}
                      alt='/'
                    />
                  </div>
                  <div>
                    <h3 className='text-center'>{data.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;