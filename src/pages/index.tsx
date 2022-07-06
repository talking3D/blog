import * as React from "react"
import { graphql} from 'gatsby';
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
    allMdx ( sort: {fields: frontmatter___date, order: DESC}) {
      totalCount
      nodes {
        id
        slug
        frontmatter {
          title
          date(formatString: "DD-MM-YYYY")
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