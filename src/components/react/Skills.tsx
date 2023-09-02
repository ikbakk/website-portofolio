import { useState } from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../../lib/sanity';
import type { Skill } from 'types';

type Props = {
  data: Skill[];
};

const Skills = ({ data }: Props) => {
  const [isDim, setIsDim] = useState(false);
  const dim = isDim ? 'group-hover:opacity-100 opacity-30' : 'opacity-100';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      id='skills'
      className='w-full md:h-screen md:py-16'>
      <div className=' mx-auto flex h-full max-w-7xl flex-col justify-center px-2'>
        <p className=' text-xl uppercase tracking-widest text-accent md:py-5'>
          Skills
        </p>
        <motion.h2
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='py-4 text-secondary'>
          What I can do
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='grid grid-cols-2 gap-2 md:grid-cols-3'>
          {data.map((data, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: '50%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (index + 1) * 0.1,
                  duration: 0.2
                }}
                onMouseOver={() => setIsDim(true)}
                onMouseLeave={() => setIsDim(false)}
                className='group relative'
                key={data.name}>
                <div
                  className={`flex ${dim} scale-90 flex-col items-center gap-y-4 bg-primary p-6 text-secondary duration-200 ease-in hover:scale-105 md:scale-100`}>
                  <div className='m-auto '>
                    <img
                      src={urlFor(data.logo).url()}
                      width={64}
                      height={64}
                      alt={data.name}
                    />
                  </div>
                  <div>
                    <h3 className='text-center'>{data.name}</h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;
