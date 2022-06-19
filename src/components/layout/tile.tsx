import * as React from 'react';

import {DataProps} from './main';

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

interface TileProps {
  index: number,
  count: number,
  title: string
}

const Tile = ({index, count, title}: TileProps) => {
  return (
    <div className={`col-span-2 max-w-long h-72 ${layoutResolver(index, count)} border-2 border-black rounded-2xl`}>
      <h2>{ title }</h2>
        <div className='flex items-center justify-center text-6xl text-center h-4/6'>{`${index}/${count}`}</div>
    </div>
  );
};

export default Tile;