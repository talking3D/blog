import * as React from 'react';
import Tile from './tile';
import { ImageDataLike } from 'gatsby-plugin-image';
import { useTranslation } from 'react-i18next';

const Main = ({ data } : DataProps) => {
  const { t, i18n } = useTranslation()
  return (
    <div className='mt-7 mx-2'>
      <h3 className='font-roboto text-3xl font-bold'>
        <span className='heading-span-letter'>D</span>omain <span className='heading-span-letter'>D</span>riven <span className='heading-span-letter'>D</span>iscussion
      </h3>
      <h4 className='font-roboto text-2xl font-medium text-gray-700'>
        {/* Generally speaking, a technically oriented blog... */}
        { t('main.subtitle') }
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
                hero_color={node.frontmatter.hero_color}
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
    hero_color: string
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
