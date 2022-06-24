import * as React from 'react';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { BsCalendar3 } from 'react-icons/bs'


import tileHeroColors  from '../utils/heroColors';

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

const getHeroColor = (color: string) => {
  if (color in tileHeroColors) {
    return tileHeroColors[color as keyof typeof tileHeroColors]
  }

  return tileHeroColors['default']
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
  title: string,
  hero_image: ImageDataLike,
  hero_color: string,
}


const Tile = ({index, count, title, hero_color, hero_image}: TileProps) => {
  const image = getImage(hero_image)
  return (
    <div className={`relative col-span-2 max-w-long h-72 ${layoutResolver(index, count)} rounded-2xl overflow-hidden shadow-md relative`}>
      <div className='flex flex-col'>
        <GatsbyImage image={image!} alt={'altext'} className='absolute -z-50 w-full' />
        <div className={`flex items-center py-1 px-2 self-end max-w-max ${getHeroColor(hero_color).withOpacity} text-white rounded-tr-xl rounded-bl-xl text-sm font-normal`}>
          <BsCalendar3 size={14} className='mx-1.5'/>
          2022-04-11
          </div>
          <h2 className='my-4 px-4 font-roboto font-bold text-3xl text-white'>
              <span className={`box-decoration-clone leading-snug ${getHeroColor(hero_color).withOpacity} px-2 py-0.5`}>
                { title }
              </span>
          </h2>
          <div className='flex items-center justify-center text-6xl text-center h-4/6'></div>
      </div>
    </div>
  );
};

export default Tile;