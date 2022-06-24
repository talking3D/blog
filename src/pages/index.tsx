import * as React from "react"
import { Link, graphql, PageProps } from 'gatsby';
import NavBar from '../components/layout/nav';
import Main, { DataProps as DataProps} from '../components/layout/main';


// markup
const IndexPage = ({ data }: DataProps) => {
  return (
    <div className='block mx-auto w-screen max-w-screen-xl pb-4'>
      <NavBar />
      <Main data={data}/>
    </div>
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