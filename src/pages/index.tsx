import * as React from "react"
import { Link, graphql, PageProps } from 'gatsby';
import Main, { DataProps } from '../components/layout/main';


// markup
const IndexPage = ({ data }: DataProps) => {
  return (
      <Main data={data} />
  );
}

export default IndexPage;

export const query = graphql`
  query {
    allMdx {
      totalCount
      nodes {
        id
        frontmatter {
          title
          date
          tags
          reading_time
          hero_color
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 235, height: 400, placeholder: DOMINANT_COLOR, formats: JPG, transformOptions: {cropFocus: ATTENTION, fit: COVER})
            }
          }
        }
      }
    }
  }
  `