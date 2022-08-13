/* eslint-disable camelcase */
import * as React from 'react';
import { ImageDataLike } from 'gatsby-plugin-image';
import { useTranslation } from 'react-i18next';
import Tile from './tile';

const Main = ({ data } : DataProps) => {
  const { t } = useTranslation();
  return (
    <div className='mt-7 mx-2'>
      <h3 className='font-roboto text-3xl font-bold'>
        <span className='heading-span-letter'>D</span>
        <span className='dark:text-white'>omain</span>
        {' '}
        <span className='heading-span-letter'>D</span>
        <span className='dark:text-white'>riven</span>
        {' '}
        <span className='heading-span-letter'>D</span>
        <span className='dark:text-white'>iscussion</span>
      </h3>
      <h4 className='font-roboto text-2xl font-medium text-gray-700'>
        <span className='dark:text-slate-300'>{ t('main.subtitle') }</span>
      </h4>
      <div className='mt-7'>
        <div className='grid grid-cols-2 sm:grid-cols-4 grid-rows-auto grid-flow-row gap-4'>
          {
            data.allMdx.nodes.map((node, i) => (
              <Tile
                key={node.id}
                index={i}
                title={node.frontmatter.title}
                slug={node.fields.slug}
                locale={node.fields.locale}
                isDefault={node.fields.isDefault}
                date={node.frontmatter.date}
                count={data.allMdx.totalCount}
                hero_image={node.frontmatter.hero_image}
                tags={node.frontmatter.tags}
                reading_time={node.timeToRead}
              />
            ))
            }
        </div>
      </div>
    </div>
  );
};

export default Main;

export type PostNode = {
  id: string
  slug: string
  timeToRead: number
  fields: {
    locale: 'en' | 'pl'
    isDefault: boolean
    slug: string
  }
  frontmatter: {
    title: string
    date: Date
    tags: string[]
    hero_image: ImageDataLike
  }
}

export type ImageSharp = {
  hildImageSharp: {
    gatsbyImageData: {
      layout: string
      placeholder: {
        fallback: string
      }
      images: {
        fallback: {
          src: string
          srcSet: string
          sizes: string
        },
        sources: []
      }
      width: number
      height: number
  }
}
}

export interface DataProps {
  data: {
    allMdx: {
      totalCount: number
      nodes: PostNode[]
    }
  }
}
