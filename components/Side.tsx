import { FC } from 'react';
import SideIntro from './SideIntro';
import SideNav from './SideNav';
import SideSocials from './SideSocials';

interface Props {
  firstName: string;
  lastName: string;
  description?: string | null;
}

const SidePanel: FC<Props> = ({ firstName, lastName, description }) => {
  return (
    <section className='flex h-full w-full flex-col justify-around p-8 md:p-10'>
      <SideIntro
        firstName={firstName}
        lastName={lastName}
        description={description}
      />
      <SideNav />
      <SideSocials />
    </section>
  );
};

export default SidePanel;
