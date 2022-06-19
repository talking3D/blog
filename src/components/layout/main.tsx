import * as React from 'react';
import Tile from './tile';

const Main = ({ data } : DataProps) => {
  return (
    <div className='mt-7 mx-2'>
      <h3 className='font-roboto text-3xl font-bold'>
        <span className='heading-span-letter'>D</span>omain <span className='heading-span-letter'>D</span>riven <span className='heading-span-letter'>D</span>iscussion
      </h3>
      <h4 className='font-roboto text-2xl font-medium text-gray-700'>
        Generally speaking, a technically oriented blog...
      </h4>
      <div className='mt-7'>
        <div className='grid grid-cols-2 sm:grid-cols-4 grid-rows-auto grid-flow-row gap-4'>
          {
            data.allMdx.nodes.map((node, i) => (
              <Tile 
                key={node.id}
                index={i}
                title={node.frontmatter.title}
                count={data.allMdx.totalCount}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Main;

export interface DataProps {
  data: {
    allMdx: {
      totalCount: number
      nodes: {
        id: string
        frontmatter: {
          title: string
        }
      } []
  }
}
}
