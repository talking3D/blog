import * as React from "react"
import { Link, graphql, PageProps } from 'gatsby';

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
    <div>
      <ul>
        {  
          allMdx.nodes.map(node => (
              <li><Link to={ `${node.slug}` }>{node.frontmatter.title}</Link></li>
          ))
        }
      </ul>
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
