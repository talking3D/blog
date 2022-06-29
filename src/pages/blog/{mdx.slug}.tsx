import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SyntaxHighlighter from '../../components/addons/SyntaxHighlighter';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { getHeroColor } from '../../components/utils/heroColors';
import { BsClockFill } from 'react-icons/bs';
import PostImage from '../../components/common/image';


// Use shortcodes
const components = {
  pre: SyntaxHighlighter,
  h3: (props: React.FC) => <h3 { ...props } className='mt-2 mb-1 text-2xl font-normal' />,
  h4: (props: React.FC) => <h4 { ...props } className='mt-2 mb-1 text-xl font-normal' />,
  h6: (props: React.FC) => <div { ...props } className='mt-1 mb-4 text-lg font-normal' />,
  img: (props: any) => <PostImage {...props} />,
}

type DataProps = {
  mdx: {
    frontmatter: {
      title: string
      sub_title: string
      author: string
      date: Date
      tags: string[]
      reading_time: string
      hero_image_alt: string
      hero_image_credit_text: string
      hero_image_credit_link: string
      hero_color: string
      hero_image: ImageDataLike
    }
    body: string
  }
}

const BlogPost = ({ data: { mdx } }: PageProps<DataProps>) => {
  const image = getImage(mdx.frontmatter.hero_image);
  return (
    <div className='flex flex-col mt-2 px-2 xl:px-0 relative'>
      <div className='flex absolute -z-10 h-77'>
        <GatsbyImage image={image!} alt={mdx.frontmatter.hero_image_alt} className='min-h-full'/>
      </div>
      <div className='flex flex-col h-77 justify-between pb-2'>
        <div className='mt-2 px-3 text-white text-xs'>
          <span>{mdx.frontmatter.hero_image_credit_text}</span>
        </div>
        <div className='flex mx-2'>
          <div className='flex'>
            <section>
              <h2 className='hidden'>Tags</h2>
              <ul className='flex flex-wrap justify-start text-white'>
                { mdx.frontmatter.tags.map((tag, index) => (
                    <li key={index} className={`px-3 mr-2 mb-1 before:content-["#"] ${getHeroColor(mdx.frontmatter.hero_color).solid} font-roboto text-base rounded-xl`}>{tag}</li>
                  )) }
              </ul>
            </section>
          </div>
        <div className='flex self-end items-center ml-2 mb-0.5 text-white'>
          <BsClockFill size={17}/>
          <span className='ml-2'>{ mdx.frontmatter.reading_time }</span>
        </div>
      </div>
      </div>
      <div className='flex flex-col relative'>
        <div className='self-end font-roboto text-slate-500'>
          Published on {mdx.frontmatter.date}
        </div>
        <div className='flex flex-nowrap justify-between w-full border-4 border-cyan-200'>
          <div className='flex border-2 border-cyan-400'>aaaaaaaa aaaa</div>
          <div className='flex flex-col lg:w-200 justify-self-end  border-2 border-cyan-800'>
            <MDXProvider components={ components }>
              <header className='mt-7'>
                <h1 className='font-bold text-3xl'>{ mdx.frontmatter.title }</h1>
                <h2 className='mt-3 mb-3 font-normal font-roboto text-2xl text-slate-500'>{mdx.frontmatter.sub_title}</h2>
              </header>
              <main className='text-xl font-thin leading-a-little-bit-looser'>
                <MDXRenderer>
                  { mdx.body }
                </MDXRenderer>
                </main>
            </MDXProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost;

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        sub_title
        author
        date(formatString: "DD-MM-YYYY")
        title
        tags
        reading_time
        hero_image_alt
        hero_image_credit_text
        hero_image_credit_link
        hero_color
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 1280, height: 308, placeholder: DOMINANT_COLOR, formats: JPG, transformOptions: {cropFocus: ATTENTION, fit: COVER})
          }
        }
      }
      body
    }
  }
`