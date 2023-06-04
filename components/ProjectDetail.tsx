'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { imgUrl } from '../utils/sanity';
import { ProjectDetail } from '../types';
import { RiRadioButtonFill } from 'react-icons/ri';
import ProjectDetailBreadCrumbs from './ProjectDetailBreadCrumbs';

interface Props {
  data: ProjectDetail;
}

const ProjectDetail: FC<Props> = ({ data }) => {
  const { code, demo, image, overview, slug, tech, title } = data;

  return (
    <section className='flex h-full w-full flex-col'>
      <section className='relative z-[-1] w-full'>
        <div className='absolute top-0 left-0 z-[2] h-[30vh] w-full bg-black/70 '></div>
        <figure className='h-[30vh] overflow-hidden'>
          <Image
            priority
            className='h-full w-full object-cover'
            src={imgUrl(image).url()}
            alt='background-image'
            width={1366}
            height={768}
          />
        </figure>
        <div className='absolute bottom-0 z-[2] w-full  max-w-7xl p-4'>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className='py-2'>
            {title}
          </motion.h1>
        </div>
      </section>
      <article className='mx-auto flex h-full max-w-7xl flex-col-reverse gap-8 p-4 py-8 lg:flex-row'>
        <section className='flex h-full flex-col justify-between gap-y-4 lg:basis-4/5 lg:justify-start'>
          <div className='hidden lg:block'>
            <ProjectDetailBreadCrumbs title={title} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className='lg:justify-self-start'>
            <h2 className='text-secondary'>Overview</h2>
            <p>{overview}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className='flex flex-col gap-4 lg:justify-self-end'>
            <div className='flex gap-x-4 py-2'>
              <a
                target='_blank'
                className='bg-secondary px-5 py-2 font-bold tracking-widest text-base-100 duration-100 hover:bg-secondary-focus/80 active:scale-95 active:bg-secondary-focus'
                href={code}>
                <button>Code</button>
              </a>
              <a
                target='_blank'
                className='bg-secondary px-5 py-2 font-bold tracking-widest text-base-100 duration-100 hover:bg-secondary-focus/80 active:scale-95 active:bg-secondary-focus'
                href={demo}>
                <button>Demo</button>
              </a>
            </div>
            <Link className='group relative w-fit' href='/#projects'>
              <p className='cursor-pointer duration-200 hover:text-secondary'>
                Back
              </p>
              <div className='h-[1px] w-[0%] rounded-full bg-white delay-100 duration-200 group-hover:w-[100%] group-hover:bg-secondary'></div>
            </Link>
          </motion.div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className='flex h-fit w-full flex-col rounded-xl bg-base-300 p-2 lg:basis-1/5'>
          <p className='pb-2 text-center font-bold text-accent'>Technologies</p>
          <div className='flex flex-wrap justify-between lg:flex-col'>
            {tech.map((tech, index) => (
              <p key={index} className='flex items-center py-2'>
                <RiRadioButtonFill className='pr-1' /> {tech}
              </p>
            ))}
          </div>
        </motion.section>
        <div className='block lg:hidden'>
          <ProjectDetailBreadCrumbs title={title} />
        </div>
      </article>
    </section>
  );
};

export default ProjectDetail;
