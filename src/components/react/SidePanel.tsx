import SideIntro from './SideIntro';
import SideNav from './SideNav';
import SideSocials from './SideSocials';

type Props = {
  firstName: string;
  lastName: string;
  description?: string | null;
  resumeLink: string;
};

const SidePanel = ({ firstName, lastName, description, resumeLink }: Props) => {
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
