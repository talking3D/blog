import * as React from "react"
import { Link, graphql, PageProps } from 'gatsby';
import NavBar from '../components/layout/nav';
import Main, { Props as DataProps} from '../components/layout/main';


// markup
const IndexPage = ({ data }: DataProps) => {
  return (
    <div className='block mx-auto w-screen max-w-screen-xl'>
      <NavBar />
      <Main data={data}/>
    </div>
  );
}

export default IndexPage;

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          title
        }
      }
    }
  }
  `