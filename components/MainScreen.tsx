import { FC } from 'react';
import { MainScreenProps } from '../types';

import Skills from './Skills';
import Projects from './Projects';
import SidePanel from './Side';
import MobileNavbar from './MobileNavbar';
import MobileIntro from './MobileIntro';

interface Props {
  data: MainScreenProps;
}

const MainScreen: FC<Props> = ({ data }) => {
  const { firstName, lastName, description, resumeLink } = data;

  return (
    <section id='home' className='flex h-screen flex-col md:flex-row'>
      <section className='h-full w-full justify-start p-8 md:w-1/2 md:p-10'>
        <MobileIntro data={data} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        {/* <Contact /> */}
      </section>
      <section className='right-0 hidden h-full w-1/2 items-center md:fixed md:block md:basis-1/2'>
        <SidePanel
          firstName={firstName}
          lastName={lastName}
          description={description}
          resumeLink={resumeLink}
        />
      </section>

      <MobileNavbar resumeLink={resumeLink} />
    </section>
  );
};

export default MainScreen;
