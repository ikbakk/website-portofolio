import { FC } from 'react';
import { MainScreenProps } from '../types';

import Skills from './Skills';
import Contact from './Contact';
import Projects from './Projects';
import SidePanel from './Side';

interface Props {
  data: MainScreenProps;
}

const MainScreen: FC<Props> = ({ data }) => {
  const { firstName, lastName, description } = data;

  return (
    <section id='home' className='flex h-screen flex-col md:flex-row'>
      <section className='h-full w-full justify-start p-8 md:w-[50%] md:p-10'>
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <Contact />
      </section>
      <section className='right-0 hidden h-full w-[50%] items-center md:fixed md:block md:basis-1/2'>
        <SidePanel
          firstName={firstName}
          lastName={lastName}
          description={description}
        />
      </section>
    </section>
  );
};

export default MainScreen;
