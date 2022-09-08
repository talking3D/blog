import './src/styles/global.css';
import 'katex/dist/katex.min.css';
import BlogLayout from './wrapPageElement';
import BlogContenextProvider from './wrapRootElement';

export const wrapRootElement = BlogContenextProvider;

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = BlogLayout;
