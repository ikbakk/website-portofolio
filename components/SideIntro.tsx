import { FC } from 'react';

interface Props {
  firstName: string;
  lastName: string;
  description?: string | null;
}

const SideIntro: FC<Props> = ({ firstName, lastName, description }) => {
  return (
    <div>
      <h1>
        {firstName}
        <span className='text-secondary'> {lastName}</span>
      </h1>
      <h2 className='pt-1 text-secondary '>Front-End Developer</h2>
      <p className='prose pt-5'>{description}</p>
    </div>
  );
};

export default SideIntro;
