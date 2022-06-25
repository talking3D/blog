import * as React from 'react';
import NavBar from './nav';

export interface LayoutProps {
  children?: React.FC<React.ReactNode>
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className='block mx-auto w-screen max-w-screen-xl pb-4'>
      <NavBar />
      { children }
  </div>
  )
};

export default Layout;