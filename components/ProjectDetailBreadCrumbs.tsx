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
  const motionInitial = { opacity: 0, x: '-50%' };
  const motionFinal = { opacity: 1, x: 0 };
  const motionDuration = (index: number) => {
    return { duration: 0.2, delay: index * 0.15 };
  };

  const breadcrumbItem = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Project',
      href: '/#projects'
    },
    {
      title: title,
      href: null
    }
  ];

  return (
    <div className='breadcrumbs overflow-hidden text-sm text-accent'>
      <ul className=''>
        {breadcrumbItem.map((item, index) => (
          <motion.li
            key={index}
            initial={motionInitial}
            animate={motionFinal}
            transition={motionDuration(index)}>
            {item.href === null ? (
              title
            ) : (
              <Link href={item.href}>{item.title}</Link>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailBreadCrumbs;
