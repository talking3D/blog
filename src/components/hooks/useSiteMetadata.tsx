import { graphql, useStaticQuery } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  return data.site.siteMetadata;
};
