import './src/styles/global.css';
import 'katex/dist/katex.min.css';

import BlogContextProvider from './wrapRootElement';
import BlogLayout from './wrapPageElement';

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = BlogContextProvider;

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = BlogLayout;
