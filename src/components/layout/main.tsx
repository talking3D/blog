import * as React from 'react';
import { graphql } from 'gatsby';
import { data } from 'autoprefixer';

const Main = ({ data } : Props) => {
  return (
    <div className='mt-7'>
      <h3 className='font-roboto text-3xl font-bold'>
        <span className='heading-span-letter'>D</span>omain <span className='heading-span-letter'>D</span>riven <span className='heading-span-letter'>D</span>iscussion
      </h3>
      <h4 className='font-roboto text-2xl font-medium text-gray-700'>
        Generally speaking, a technically oriented blog...
      </h4>
      <div>
        <ul>
          {
            data.allMdx.nodes.map((node) => (
              <article>
                <h2>{node.frontmatter.title}</h2>
              </article>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Main;

export interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: {
          title: string
        }
      } []
  }
}
}
