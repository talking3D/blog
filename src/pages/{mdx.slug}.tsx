import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SyntaxHighlighter from '../components/addons/SyntaxHighlighter';

const components = {
  pre: SyntaxHighlighter,
}

type DataProps = {
  mdx: {
    frontmatter: {
      title: string
    }
    body: string
  }
}

const BlogPost = ({ data: { mdx } }: PageProps<DataProps>) => {
  return (
    <>
      <MDXProvider components={ components }>
        <h1>{ mdx.frontmatter.title }</h1>
        <MDXRenderer>
          { mdx.body }
        </MDXRenderer>
      </MDXProvider>
    </>
  )
}

export default BlogPost;

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
      }
      body
    }
  }
`