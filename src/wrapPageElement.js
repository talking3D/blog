/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n/i18n-config';

import Layout from './components/layout/layout';
import BlogContextProvider from './context/BlogContextProvider';

const wrapPageElement = ({ props, element }) => (

  <I18nextProvider i18n={i18next}>
    <BlogContextProvider>
      <Layout {...props}>{element}</Layout>
    </BlogContextProvider>
  </I18nextProvider>
);

export default wrapPageElement;
