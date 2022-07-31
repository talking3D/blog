import * as React from 'react';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { BsCalendar3, BsClockFill } from 'react-icons/bs';
import { Link } from 'gatsby';
import { getHeroColor } from '../utils/heroColors';


type Style = {
  tall: string 
  large: string
};

const tile: Style = {
  tall: 'lg:col-span-1 lg:row-span-2 lg:h-100 lg:max-w-tall', 
  large: 'lg:col-span-2 lg:max-w-long lg:h-100',
};

function getStyle<S, K extends keyof S>(obj: S, key: K): S[K] | '' {
  if((Object.keys(obj) as Array<keyof typeof obj>).includes(key)) {
    return obj[key]
  }
  return ''
}

const layoutResolver = (index: number, length: number) => {
  
  const set = 6;
  // const sets = length > set ? Math.trunc(length / set) :  1;
  const sets = Math.trunc(length / set);
  const rest = length % set;
  if (index  < ( set * sets )) {
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
  slug: string,
  locale: 'en' | 'pl',
  isDefault: boolean,
  date: Date,
  hero_image: ImageDataLike,
  hero_color: string,
  tags: string[],
  reading_time: number
}


const Tile = ({index, count, title, slug, locale, isDefault, date, hero_color, hero_image, tags, reading_time}: TileProps) => {
  const image = getImage(hero_image);
  
  return (
    <article className={`relative col-span-2 max-w-long h-72 ${layoutResolver(index, count)} rounded-2xl overflow-hidden relative shadow-md`}>
          <div className='w-full h-full image-overflow overflow-hidden rounded-2xl'>
          <Link to={`${isDefault ? '/' : `/${locale}/` }blog/${slug}`}>
              <div className='flex flex-col justify-between h-full rounded-2xl'>
                <GatsbyImage image={image!} alt={'altext'} className='absolute -z-50 w-full rounded-2xl'/>
                <div className='flex flex-col'>
                  <div className={`flex items-center py-1 px-2 self-end ${getHeroColor(hero_color).withOpacity} text-white rounded-tr-xl rounded-bl-xl text-sm font-normal`}>
                    <BsCalendar3 size={14} className='mx-1.5'/>
                      { date }
                    </div>
                    <h2 className='my-4 px-4 font-roboto font-bold text-3xl text-white'>
                        <span className={`box-decoration-clone leading-snug ${getHeroColor(hero_color).withOpacity} px-2 py-0.5`}>
                          { title }
                        </span>
                    </h2>
                </div>
                  <div className='flex justify-between mb-2 px-4  w-full'>
                    <ul className='flex flex-wrap justify-start text-white '>
                      { tags.map((tag, index) => (
                        <li key={index} className={`px-3 mr-2 mb-1 before:content-["#"] ${getHeroColor(hero_color).solid} font-roboto text-base rounded-xl`}>{tag}</li>
                      )) }
                    </ul>
                    <div className='flex flex-nowrap w-min-max self-end items-center mb-0.5 text-white'>
                      <BsClockFill size={17}/>
                      <span className='ml-2 block min-w-max'>{ reading_time } min</span>
                    </div>
                  </div>
              </div>
            </Link>
          </div>
      </article>
  );
};

export default Tile;
