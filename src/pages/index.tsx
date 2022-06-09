import * as React from "react"
import { Link, graphql, PageProps } from 'gatsby';
import NavBar from '../components/layout/nav';

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
      <div className='text-3xl bg-slate-400 font-extrabold'>
        <ul>
          {  
            allMdx.nodes.map((node, id) => (
                <li key={id}><Link to={ `${node.slug}` }>{node.frontmatter.title}</Link></li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default IndexPage

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          data(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`
