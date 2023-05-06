import Link from 'next/link';
import { FC } from 'react';

const navList = [
  { name: 'Skills', link: '/#skills' },
  { name: 'Projects', link: '/#projects' },
  { name: 'Contact', link: '/#contact' }
];

const SideNav: FC = () => {
  return (
    <nav className='py-5'>
      <ul className='hidden md:flex md:flex-col'>
        {navList.map((list, index) => (
          <li key={index}>
            <Link href={list.link} className='nav-li group'>
              <div className='nav-li-bar' />
              <p className='px-5 duration-300 group-hover:text-secondary'>
                {list.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
