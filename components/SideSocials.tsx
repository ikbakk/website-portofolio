'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiExternalLinkLine } from 'react-icons/ri';
import { RxDownload, RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx';

interface Props {
  resumeLink: string;
}

const SideSocials: FC<Props> = ({ resumeLink }) => {
  return (
    <>
      <nav className='w-full'>
        <motion.ul
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex w-full flex-col space-y-2 md:flex-row md:justify-around md:space-y-0'>
          <motion.li
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3
            }}
            className='group w-fit active:scale-95'>
            <a
              target='_blank'
              className='flex items-center space-x-3 duration-200 hover:text-secondary'
              href='https://github.com/ikbakk'>
              <figure>
                <RxGithubLogo size={32} />
              </figure>
              <p className='pt-1'>Github</p>
              <figure className='hidden duration-75 group-hover:translate-x-3 md:block'>
                <RiExternalLinkLine size={22} />
              </figure>
            </a>
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.1
            }}
            className='group w-fit active:scale-95'>
            <a
              target='_blank'
              className='flex items-center space-x-3 duration-200 hover:text-secondary'
              href='https://linkedin.com/in/ikbak'>
              <figure>
                <RxLinkedinLogo size={32} />
              </figure>
              <p className='pt-1'>LinkedIn</p>
              <figure className='hidden duration-75 group-hover:translate-x-3 md:block'>
                <RiExternalLinkLine size={22} />
              </figure>
            </a>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3
            }}
            className='group w-fit active:scale-95'>
            <a
              download
              target='_blank'
              className='flex items-center space-x-3 duration-200 hover:text-secondary'
              href={`${resumeLink}?dl=`}>
              <figure>
                <RxDownload size={32} />
              </figure>
              <p className='pt-1'>Resume</p>
            </a>
          </motion.li>
        </motion.ul>
      </nav>
    </>
  );
};

export default SideSocials;
