/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Layout from './src/components/layout/layout';

const wrapPageElement = ({ props, element }) => (
  <Layout {...props}>{element}</Layout>
);

export default wrapPageElement;
