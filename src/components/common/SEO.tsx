import React from 'react';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

type SeoDataTypes = {
  title?: string
  description?: string
  pathname?: string
  children?: React.FC<React.ReactNode>
}

const SEO = ({
  title, description, pathname, children,
} : SeoDataTypes) => {
  const { title: defaultTitle, description: defaultDecription, siteUrl } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDecription,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />
      <link rel='icon' href='../../images/gatsby-icon.png' />
      { children }
    </>
  );
};

export default SEO;
