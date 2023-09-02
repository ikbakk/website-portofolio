import { motion } from 'framer-motion';

type Props = {
  firstName: string;
  lastName: string;
  description?: string | null;
};

const SideIntro = ({ firstName, lastName, description }: Props) => {
  const motionInitial = {
    opacity: 0,
    y: -30
  };

  const motionFinal = {
    opacity: 1,
    y: 0
  };

  return (
    <div>
      <motion.h1 initial={motionInitial} animate={motionFinal}>
        {firstName}
        <span className='text-secondary'> {lastName}</span>
      </motion.h1>
      <motion.h2
        initial={motionInitial}
        animate={motionFinal}
        transition={{
          delay: 0.1
        }}
        className='pt-1 text-secondary '>
        Front-End Developer
      </motion.h2>
      <motion.p
        initial={motionInitial}
        animate={motionFinal}
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
