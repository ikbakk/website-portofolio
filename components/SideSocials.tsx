'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { RxDownload, RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx';
import SideSocialsIcon from './SideSocialsIcon';

interface Props {
  resumeLink: string;
}

const SideSocials: FC<Props> = ({ resumeLink }) => {
  const socialLinks = [
    {
      id: 1,
      title: 'Github',
      link: 'https://github.com/ikbakk',
      icon: <RxGithubLogo size={32} />,
      position: 'left'
    },
    {
      id: 2,
      title: 'LinkedIn',
      link: 'https://linkedin.com/in/ikbak',
      icon: <RxLinkedinLogo size={32} />,
      position: 'center'
    },
    {
      id: 3,
      title: 'Resume',
      link: resumeLink,
      icon: <RxDownload size={32} />,
      position: 'right'
    }
  ];

  return (
    <>
      <nav className='w-full'>
        <motion.ul
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex w-full flex-col space-y-2 md:flex-row md:justify-around md:space-y-0'>
          {socialLinks.map(link => (
            <SideSocialsIcon
              key={link.id}
              icon={link.icon}
              link={link.link}
              position={link.position}
              title={link.title}
            />
          ))}
        </motion.ul>
      </nav>
    </>
  );
};

export default SideSocials;
