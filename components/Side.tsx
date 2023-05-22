import { FC } from 'react';
import SideIntro from './SideIntro';
import SideNav from './SideNav';
import SideSocials from './SideSocials';

interface Props {
  firstName: string;
  lastName: string;
  description?: string | null;
  resumeLink: string;
}

const SidePanel: FC<Props> = ({
  firstName,
  lastName,
  description,
  resumeLink
}) => {
  return (
    <section className='flex h-full w-full flex-col justify-around p-8 md:p-10'>
      <SideIntro
        firstName={firstName}
        lastName={lastName}
        description={description}
      />
      <SideNav />
      <SideSocials resumeLink={resumeLink} />
    </section>
  );
};

export default SidePanel;
