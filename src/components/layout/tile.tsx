/* eslint-disable max-len */
/* eslint-disable camelcase */
import * as React from 'react';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { BsCalendar3, BsClockFill } from 'react-icons/bs';
import { Link } from 'gatsby';
import { getColorContrast, hexToRGB } from "../utils/helpers";

type Style = {
  tall: string
  large: string
};

const tile: Style = {
  tall: 'lg:col-span-1 lg:row-span-2 lg:h-100 lg:max-w-tall',
  large: 'lg:col-span-2 lg:max-w-long lg:h-100',
};

function getStyle<S, K extends keyof S>(obj: S, key: K): S[K] | '' {
  if ((Object.keys(obj) as Array<keyof typeof obj>).includes(key)) {
    return obj[key];
  }
  return '';
}

const layoutResolver = (index: number, length: number) => {
  const set = 6;
  // const sets = length > set ? Math.trunc(length / set) :  1;
  const sets = Math.trunc(length / set);
  const rest = length % set;

  type K = keyof Style
  const tailForThree: K[] = ['tall', 'tall', 'large'];
  const tailForFive: K[] = ['large', 'tall', 'tall'];
  if (index < (set * sets)) {
    if (index === 0 || (index + 1) % set === 0 || index % set === 0) {
      return '';
    }
    return tile.tall;
  } if (rest !== 0) {
    switch (rest) {
      case 1:
      case 2:
        return '';

      case 3:
        return getStyle(tile, tailForThree[length - index - 1]);

      case 4:
        return '';

      case 5:
        return getStyle(tile, tailForFive[length - index - 1]);
      default:
        return '';
    }
  }
  return '';
};

interface TileProps {
  index: number,
  count: number,
  title: string,
  slug: string,
  locale: 'en' | 'pl',
  isDefault: boolean,
  date: Date,
  hero_image: ImageDataLike,
  tags: string[],
  reading_time: number
}

const Tile = ({
  index, count, title, slug, locale, isDefault, date, hero_image, tags, reading_time,
}: TileProps) => {
  const image = getImage(hero_image);

  const makeTransparentBackground = (opacity: number) => {
    const { red, green, blue } = hexToRGB(image?.backgroundColor!);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  };

  const inlineHeroMarkerStyle = {
    backgroundColor: image?.backgroundColor,
    color: getColorContrast(image!.backgroundColor!),
  };

  return (
    <article className={`relative col-span-2 max-w-long h-72 ${layoutResolver(index, count)} rounded-2xl overflow-hidden relative shadow-md`}>
      <div className="w-full h-full image-overflow overflow-hidden rounded-2xl">
        <Link to={`${isDefault ? '/' : `/${locale}/`}blog/${slug}`}>
          <div className="flex flex-col justify-between h-full rounded-2xl">
            <GatsbyImage image={image!} alt="altext" className="absolute -z-50 w-full rounded-2xl" />
            <div className="flex flex-col">
              <div
                className='flex items-center py-1 px-2 self-end rounded-tr-xl rounded-bl-xl text-sm font-normal'
                style={{ ...inlineHeroMarkerStyle, backgroundColor: makeTransparentBackground(0.4) }}
              >
                <BsCalendar3 size={14} className="mx-1.5" />
                { date }
              </div>
              <h2 className="my-4 px-4 font-roboto font-bold text-3xl text-white">
                <span
                  className='box-decoration-clone leading-snug px-2 py-0.5'
                  style={{ ...inlineHeroMarkerStyle, backgroundColor: makeTransparentBackground(0.4) }}
                >
                  { title }
                </span>
              </h2>
            </div>
            <div className="flex justify-between mb-2 px-4  w-full">
              <ul className="flex flex-wrap justify-start">
                { tags.map((tag) => (
                  <li
                    key={tag}
                    className='px-3 mr-2 mb-1 before:content-["#"] font-roboto text-base rounded-xl'
                    style={inlineHeroMarkerStyle}
                  >
                    {tag}
                  </li>
                )) }
              </ul>
              <div
                className="flex flex-nowrap w-min-max self-end items-center mb-1"
                style={{ color: getColorContrast(image!.backgroundColor!) }}
              >
                <BsClockFill size={17} />
                <span className="ml-2 block min-w-max">
                  { reading_time }
                  {' '}
                  min
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default Tile;
