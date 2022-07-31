import * as React from 'react';
import { BlogStateContext } from '../../context/BlogContextProvider';


const useLocale = () => {
  const blogState = React.useContext(BlogStateContext);
  if (blogState.locale === 'en') {
    return '/';
  }
  return `/${blogState.locale}`;
}

export default useLocale;