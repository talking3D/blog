import * as React from 'react';

import { LogoVertical, LogoHorizontal } from '../common/Logo';
import SearchBar from '../common/Search';
import { BsFilterCircle, BsSun, BsGlobe2, BsGithub, BsThreeDotsVertical } from 'react-icons/bs';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

const NavBar = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const showFilter = () => {
    const target = document.querySelector('#filter-modal');
    const filterContent = document.querySelector('#filter-content');
    target?.classList.toggle('hidden');
    // target?.classList.toggle('filter-modal-visible');
    setTimeout(() => {
      target?.classList.toggle('filter-modal-visible')
      filterContent?.classList.toggle('filter-content-visible')
    }, 1)

  };

  return(
    <nav>
      <div className='flex items-center justify-between mx-4 xl:mx-1 h-22.5 md:h-20 lg:h-22.5'>
        <div className={!visible ? 'sm:flex-none' : 'hidden'} >
          <Link to='/'>
            <div className='hidden sm:block mr-10 w-29 lg:w-42'>
              <LogoHorizontal />
            </div>
            <div className='block sm:hidden mr-10 w-19'>
              <LogoVertical />
            </div>
          </Link>
        </div>
        <div className='flex flex-[2_1] flex-nowrap justify-center items-center mr-8 lg:mx-auto'>
          <div>
            <SearchBar handleVisibility={setVisible}/>
          </div>
          <div className='ml-4 sm:ml-8 xl:ml-11'>
            <BsFilterCircle className='w-7 h-7 md:w-6 md:h-6' onClick={showFilter}/>
          </div>
        </div>
        <div className="hidden md:flex md:flex-nowrap self-center items-end justify-around w-48">
          <div>
            <BsSun size={20}/>
          </div>
          <div>
            <BsGlobe2 size={20}/>
          </div>
          <div>
            <BsGithub size={20}/>
          </div>
        </div>
        <div className="block md:hidden">
          <BsThreeDotsVertical size={28}/>
        </div>
        <div className='hidden md:flex w-16 justify-end'>
          <StaticImage
          src='./../../images/about_1x.png' 
          alt='Funny drawing showing author of this blog'
          layout='fullWidth'
          className='hidden md:block md:w-9 md:h-9 lg:w-12 lg:h-12 p-0 border-2 border-gray-900 rounded-full drop-shadow-[0_3px_5px_rgba(0,0,0,0.2)]'
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;