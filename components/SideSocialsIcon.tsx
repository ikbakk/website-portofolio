import { FC, ReactNode } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiExternalLinkLine } from 'react-icons/ri';

interface SideSocialsIconProps {
  icon: ReactNode;
  title: string;
  link: string;
  position: string;
}

const SideSocialsIcon: FC<SideSocialsIconProps> = ({
  icon,
  link,
  title,
  position
}) => {
  const motionInitialAttribute = {
    opacity: 0,
    x: position === 'left' ? '100%' : position === 'right' ? '-100%' : 0
  };

  return (
    <motion.li
      initial={motionInitialAttribute}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: position !== 'center' ? 0.3 : 0.1
      }}
      className='group w-fit active:scale-95'>
      <Link
        target='_blank'
        className='flex items-center space-x-3 duration-200 hover:text-secondary'
        href={link}>
        <figure>{icon}</figure>
        <p className='pt-1'>{title}</p>
        <figure className='hidden duration-75 group-hover:translate-x-3 lg:block'>
          <RiExternalLinkLine size={22} />
        </figure>
      </Link>
    </motion.li>
  );
};

export default SideSocialsIcon;
