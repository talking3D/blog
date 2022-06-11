import * as React from "react"
import { Link, graphql, PageProps } from 'gatsby';
import NavBar from '../components/layout/nav';
import Main from '../components/layout/main';

type DataProps = {
  allMdx: {
    nodes: {
      frontmatter: {
        data: {formatString: string}
        title: string
      }
      id: string
      slug: string
    }[]
  }
}

// markup
const IndexPage = ({ data: { allMdx } }: PageProps<DataProps>) => {
  return (
    <div className='block mx-auto w-screen max-w-screen-xl'>
      <NavBar />
      <Main />
    </div>
  );
}

export default IndexPage

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`
