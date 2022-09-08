/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './src/i18n/i18n-config';
import BlogContextProvider from './src/context/BlogContextProvider';

const wrapRootElement = ({ element }) => (
  <I18nextProvider i18n={i18next}>
    <BlogContextProvider>
      {element}
    </BlogContextProvider>
  </I18nextProvider>
);

export default wrapRootElement;
