import * as React from 'react';

import Layout from './components/layout/layout';
import BlogContextProvider from './context/BlogContextProvider';

const wrapPageElement = ({props, element}) => (
  <BlogContextProvider>
    <Layout {...props}>{element}</Layout>
  </BlogContextProvider>
);

export default wrapPageElement;