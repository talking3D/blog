/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { standarizeId } from './TableOfContents';

// These compoments create headers ids which are then used to link page fragments (parts (h3) and sections (h2))

export const Header3 = (props: {children: string}) => {
  const createElementId = (content: string) => standarizeId(content);
  return (
    <h3
      id={createElementId(props.children)}
      className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-6 mb-1 text-2xl font-medium'
    >
      {props.children}
    </h3>
  );
};

export const Header4 = (props: {children: string}) => {
  const createElementId = (content: string) => standarizeId(content);
  return (
    <h4
      id={createElementId(standarizeId(props.children))}
      className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-4 mb-3 text-2xl font-normal'
    >
      {props.children}
    </h4>
  );
};
