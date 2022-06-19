import * as React from 'react';

type Style = {
  tall: string 
  large: string
};

const tile: Style = {
  tall: 'lg:col-span-1 lg:row-span-2 lg:h-100 lg:max-w-tall', 
  large: 'lg:col-span-2 lg:max-w-long lg:h-100',
};

function getStyle<S, K extends keyof S>(obj: S, key: K): S[K] | '' {
  if( key in Object.keys(obj)) {
    return obj[key]
  }
  return ''
}

const layoutResolver = (index: number, length: number) => {
  
  const set = 6;
  const sets = Math.trunc(length / set);
  const rest = length % set;

  if (index < ( set * sets)) {
    if (index === 0 || (index + 1) % set === 0 || index % set === 0) {
      return '';
    } else {
      return tile['tall']
    }
  } else if (rest !== 0) {
    switch (rest) {
      case 1:
      case 2:
        return '';

      case 3:
        type K = keyof Style
        let tail: K[] = ['tall', 'tall', 'large'];
        return getStyle(tile, tail[length - index - 1]);
      
      case 4:
        return '';
        
      case 5:
        tail = ['large', 'tall', 'tall'];
        return getStyle(tile, tail[length - index - 1]); 
    }
  }
  return '';
}

const Main = ({ data } : Props) => {
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
              <article key={node.id} className={`col-span-2 max-w-long h-72 ${layoutResolver(i, data.allMdx.totalCount)} border-2 border-black rounded-2xl`}>
                <h2>{ node.frontmatter.title }</h2>
                <div className='flex items-center justify-center text-6xl text-center h-4/6'>{`${i}/${data.allMdx.totalCount}`}</div>
              </article>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Main;

export interface Props {
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
