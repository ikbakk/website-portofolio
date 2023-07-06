'use client';
import Link from 'next/link';
import { FC } from 'react';

import { motion } from 'framer-motion';
import { BiListUl, BiHomeAlt } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { RxDownload } from 'react-icons/rx';

interface MobileNavbarProps {
  resumeLink: string;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ resumeLink }) => {
  const NavItem = [
    {
      title: 'Home',
      href: '#home',
      icon: <BiHomeAlt />
    },
    {
      title: 'Skills',
      href: '#skills',
      icon: <BsFillGearFill />
    },
    {
      title: 'Projects',
      href: '#projects',
      icon: <BiListUl />
    }
  ];

  const motionInitial = { opacity: 0, y: 50, translateX: '-50%' };
  const motionFinal = { opacity: 1, y: 0, translateX: '-50%' };

  return (
    <motion.div
      initial={motionInitial}
      animate={motionFinal}
      transition={{ delay: 1 }}
      className='fixed bottom-[2%] left-1/2 z-30 w-10/12 -translate-x-1/2 bg-base-300/50 px-1 backdrop-blur-sm md:hidden '>
      <ul className='flex w-full items-center justify-around'>
        {NavItem.map((item, index) => (
          <Link
            className='group tooltip tooltip-secondary flex flex-col items-center gap-1 bg-transparent p-2 text-secondary'
            data-tip={item.title}
            href={item.title === 'Resume' ? `${resumeLink}?dl=` : item.href}
            key={index}>
            <div className='text-2xl duration-100 group-hover:scale-125 group-focus:scale-125 group-active:scale-125 '>
              {item.icon}
            </div>
          </Link>
        ))}
      </ul>
    </motion.div>
  );
};

export default MobileNavbar;
