import * as React from 'react';

import { LogoVertical, LogoHorizontal } from '../common/logo';

const NavBar = () => {
  return(
    <div className='flex items-center h-22.5'>
      <div className='hidden sm:block'>
        <LogoHorizontal width={165} height={63}/>
      </div>
      <div className='block sm:hidden'>
        <LogoVertical  width={75} height={62.8}/>
      </div>
    </div>
  );
};

export default NavBar;