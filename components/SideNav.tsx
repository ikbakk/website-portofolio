'use client';

import Link from 'next/link';
import { FC } from 'react';
import { motion } from 'framer-motion';

const navList = [
  // { name: 'Home', link: '/' },
  { name: 'Skills', link: '/#skills' },
  { name: 'Projects', link: '/#projects' }
  // { name: 'Contact', link: '/#contact' }
];

const SideNav: FC = () => {
  return (
    <nav className='py-5'>
      <ul className='hidden md:flex md:flex-col'>
        {navList.map((list, index) => (
          <motion.li
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            key={index}>
            <Link href={list.link} className='nav-li group'>
              <div className='nav-li-bar' />
              <p className='px-5 duration-300 group-hover:text-secondary'>
                {list.name}
              </p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
