'use client';
import Link from 'next/link';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface ProjectDetailBreadCrumbsProps {
  title: string;
}

const ProjectDetailBreadCrumbs: FC<ProjectDetailBreadCrumbsProps> = ({
  title
}) => {
  return (
    <div className='breadcrumbs overflow-hidden text-sm text-accent'>
      <ul className=''>
        <motion.li
          initial={{ opacity: 0, x: '-50%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}>
          <Link href='/'>Home</Link>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: '-50%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}>
          <Link href='/#projects'>Project</Link>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: '-30%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}>
          {title}
        </motion.li>
      </ul>
    </div>
  );
};

export default ProjectDetailBreadCrumbs;
