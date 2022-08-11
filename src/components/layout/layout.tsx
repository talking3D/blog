import * as React from 'react';
import { withTranslation } from 'react-i18next';

import NavBar from './nav';
import Filter from '../common/Filter';
import GoToTop from '../common/GoTop';
import Footer from './footer';

export interface LayoutProps {
  children?: React.FC<React.ReactNode>
}

const Layout = ({ children }: LayoutProps) => (
  <div className='block mx-auto w-screen max-w-screen-xl pb-4'>
    <NavBar />
    { children }
    <Filter />
    <GoToTop />
    <Footer />
  </div>
);

export default withTranslation()(Layout);
