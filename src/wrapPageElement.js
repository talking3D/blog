import * as React from 'react';

import Layout from './components/layout/layout';

const wrapPageElement = ({props, element}) => (
  <Layout {...props}>{element}</Layout>
);

export default wrapPageElement;