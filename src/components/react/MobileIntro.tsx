import { motion } from 'framer-motion';
import type { MainInfo } from 'types';

import SideSocials from './SideSocials';

type Props = {
  data: MainInfo;
};

const MobileIntro = ({ data }: Props) => {
  const { firstName, lastName, description, resumeLink } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      className='flex h-screen w-full flex-col items-center justify-center gap-10 md:hidden'>
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='-mt-20'>
        <h3>Hello, I'm</h3>
        <h1>
          <span>{firstName}</span>{' '}
          <span className='text-secondary'>{lastName}</span>
        </h1>
      </motion.div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center'>
          {description}
        </motion.p>
      )}
      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='text-secondary'>Here's my profile: </p>
        <SideSocials resumeLink={resumeLink} />
      </div>
    </motion.div>
  );
};

export default MobileIntro;
