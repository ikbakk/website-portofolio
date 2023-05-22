import { FC } from 'react';
import Link from 'next/link';
import { RiExternalLinkLine } from 'react-icons/ri';
import { RxDownload, RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx';

interface Props {
  resumeLink: string;
}

const SideSocials: FC<Props> = ({ resumeLink }) => {
  return (
    <>
      <nav className='w-full'>
        <ul className='flex w-full flex-col space-y-2 md:flex-row md:justify-around md:space-y-0'>
          <li className='group w-fit active:scale-95'>
            <a
              target='_blank'
              className='flex items-center space-x-3 duration-200 hover:text-secondary'
              href='https://github.com/ikbakk'>
              <figure>
                <RxGithubLogo size={32} />
              </figure>
              <p className='pt-1'>Github</p>
              <figure className='duration-75 group-hover:translate-x-3'>
                <RiExternalLinkLine size={22} />
              </figure>
            </a>
          </li>
          <li className='group w-fit active:scale-95'>
            <a
              target='_blank'
              className='flex items-center space-x-3 duration-200 hover:text-secondary'
              href='https://linkedin.com/in/ikbak'>
              <figure>
                <RxLinkedinLogo size={32} />
              </figure>
              <p className='pt-1'>LinkedIn</p>
              <figure className='duration-75 group-hover:translate-x-3'>
                <RiExternalLinkLine size={22} />
              </figure>
            </a>
          </li>
          <li className='group w-fit active:scale-95'>
            <a
              download
              target='_blank'
              className='flex items-center space-x-3 duration-200 hover:text-secondary'
              href={`${resumeLink}?dl=`}>
              <figure>
                <RxDownload size={32} />
              </figure>
              <p className='pt-1'>Resume</p>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideSocials;
