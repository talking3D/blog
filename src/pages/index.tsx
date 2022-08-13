/* eslint-disable max-len */
/* eslint-disable no-shadow */
import * as React from "react";
import { graphql } from 'gatsby';
import Main, { DataProps, PostNode } from '../components/layout/main';
import { BlogStateContext } from '../context/BlogContextProvider';

// markup
const IndexPage = ({ data }: DataProps) => {
  const blogState = React.useContext(BlogStateContext);

  // eslint-disable-next-line max-len
  const applyFilter = (node: PostNode, tags: string[]) => tags.map((tag) => node.frontmatter.tags.includes(tag)).some((check) => check === true);

  const dataFilter = ({ data }: DataProps) => {
    if (blogState.filterOn === true) {
      const filtered = data.allMdx.nodes.filter((node: PostNode) => applyFilter(node, Object.values(blogState.tags)));
      return { allMdx: { totalCount: filtered.length, nodes: filtered } };
    }
    return data;
  };
  return (
    <Main data={dataFilter({ data })} />
  );
};

export default IndexPage;

export const query = graphql`
  query Index ($locale: String) {
    allMdx (
      filter: { fields: { locale: { eq: $locale } } }
       sort: {fields: frontmatter___date, order: DESC}
       ) {
      totalCount
      nodes {
        id
        slug
        timeToRead
        fields {
          locale
          isDefault
          slug
        }
        frontmatter {
          title
          date(formatString: "DD-MM-YYYY")
          tags
          reading_time
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 235, height: 400, placeholder: DOMINANT_COLOR, formats: JPG, transformOptions: {cropFocus: ATTENTION, fit: COVER})
            }
          }
        }
      }
    }
  }
  `;
