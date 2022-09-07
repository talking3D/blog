// import Layout from './src/wrapPageElement';
import BlogContextProvider from './src/wrapPageElement';
import 'katex/dist/katex.min.css';
import './src/styles/global.css';
// require('katex/dist/katex.min.css');

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = BlogContextProvider;
