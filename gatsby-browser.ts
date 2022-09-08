import './src/styles/global.css';
import 'katex/dist/katex.min.css';
import BlogContextProvider from './wrapPageElement';
// import BlogContextProvider from './wrapRootElement';
// import CustomLayout from './wrapPageElement';
// require('katex/dist/katex.min.css');

// export const wrapperRootElement = BlogContextProvider;
// export const wrapPageElement = BlogContextProvider;
// export const wrapPageElement = CustomLayout;
// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = BlogContextProvider;
