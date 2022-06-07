import * as React from 'react';

import { LogoVertical, LogoHorizontal } from '../common/logo';

const NavBar = () => {
  return(
    <div className='flex items-center h-24'>
      <div className='hidden sm:block'>
        <LogoHorizontal width={165} height={63}/>
      </div>
      <div className='block sm:hidden'>
        <LogoVertical  width={90} height={75.4}/>
      </div>
    </div>
  );
};

export default NavBar;