'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

interface Props {
  firstName: string;
  lastName: string;
  description?: string | null;
}

const SideIntro: FC<Props> = ({ firstName, lastName, description }) => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}>
        {firstName}
        <span className='text-secondary'> {lastName}</span>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.1
        }}
        className='pt-1 text-secondary '>
        Front-End Developer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3
        }}
        className='prose pt-5'>
        {description}
      </motion.p>
    </div>
  );
};

export default SideIntro;
