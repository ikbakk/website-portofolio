import { type ReactNode } from 'react';

import { motion } from 'framer-motion';
import { RiExternalLinkLine } from 'react-icons/ri';

type Props = {
  icon: ReactNode;
  title: string;
  link: string;
  position: string;
};

const SideSocialsIcon = ({ icon, link, title, position }: Props) => {
  let x;
  if (position === 'left') {
    x = '100%';
  } else if (position === 'right') {
    x = '-100%';
  } else {
    x = 0;
  }
  const motionInitialAttribute = {
    opacity: 0,
    x
  };

  return (
    <motion.li
      initial={motionInitialAttribute}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: position !== 'center' ? 0.3 : 0.1
      }}
      className='group w-fit active:scale-95'>
      <a
        target='_blank'
        className='flex items-center space-x-3 duration-200 hover:text-secondary'
        href={link}>
        <figure>{icon}</figure>
        <p className='pt-1'>{title}</p>
        <figure className='hidden duration-75 group-hover:translate-x-3 lg:block'>
          <RiExternalLinkLine size={22} />
        </figure>
      </a>
    </motion.li>
  );
};

export default SideSocialsIcon;
