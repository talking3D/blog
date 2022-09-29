/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import {
  GatsbyImage, getImage, ImageDataLike,
} from 'gatsby-plugin-image';
import { BsClockFill, BsHouseFill } from 'react-icons/bs';
import classNames from 'classnames/dedupe';
import { t } from 'i18next';
import SyntaxHighlighter from '../../components/addons/SyntaxHighlighter';
import PostImage from '../../components/common/PostImage';
import TableOfContents, { TableContentsType } from '../../components/common/TableOfContents';
import { Header3, Header4 } from '../../components/common/PostHeaders';
import useLocale from '../../components/hooks/useLocale';
import { getColorContrast } from '../../components/utils/helpers';
import SEO from '../../components/common/SEO';
import Blockquote from '../../components/common/Blockquote';

// Use shortcodes
const components = {
  pre: (props: React.FC) => <SyntaxHighlighter {...props} />,
  h3: (props: {children: string}) => <Header3 {...props} />,
  h4: (props: {children: string}) => <Header4 {...props} />,
  h6: (props: React.FC) => <div {...props} className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-1 mb-4 text-lg font-normal' />,
  img: (props: React.FC) => <PostImage {...props} />,
  blockquote: (props: {children: string}) => <Blockquote {...props} />,
};

type DataProps = {
  mdx: {
    tableOfContents: TableContentsType
    timeToRead: number
    frontmatter: {
      title: string
      sub_title: string
      author: string
      date: Date
      tags: string[]
      hero_image_alt: string
      hero_image_author: string
      hero_image_author_link: string
      hero_image_credit_text: string
      hero_image_source: string
      hero_image_credit_link: string
      hero_image: ImageDataLike
    }
    body: string
  }
}

const BlogPost = ({ data: { mdx } }: PageProps<DataProps>) => {
  const wrapNode = (node: Element) => {
    if (node.firstElementChild?.classList.contains('gatsby-resp-image-wrapper') && node.parentElement?.tagName !== 'FIGURE') {
      const figureWrapper = document.createElement('figure');
      figureWrapper.className = 'from-inline-image';
      const divImageWraper = document.createElement('div');
      divImageWraper.classList
        .add('col-start-1', 'col-end-4', 'lg:col-start-1', 'lg:col-end-2', 'overflow-hidden', 'h-auto', 'px-2');
      figureWrapper.appendChild(divImageWraper);
      if (node.parentElement !== null) {
        node.parentElement.replaceChild(figureWrapper, node);
        divImageWraper.appendChild(node.firstElementChild);
      }
      if (figureWrapper.nextElementSibling?.tagName === 'FIGCAPTION') {
        figureWrapper.nextElementSibling
          .classList.add('col-start-1', 'col-end-4', 'pt-4', 'md:col-start-2', 'md:col-end-4', 'md:-ml-1', 'md:pr-2', 'lg:pl-4', 'lg:pr-4', 'lg:pt-0', 'w-full', 'text-justify');
        figureWrapper.appendChild(figureWrapper.nextElementSibling);
      }
    }
    if (node.firstChild?.nodeType === 3
        && node.firstChild?.textContent === '[figure_caption]'
        && node.previousElementSibling?.tagName === 'FIGURE') {
      const figCaption = document.createElement('figcaption');
      const nodeNextElementSibling = node.nextElementSibling;
      figCaption
        .classList.add('col-start-1', 'col-end-4', 'pt-4', 'md:col-start-2', 'md:col-end-4', 'md:-ml-1', 'md:pr-2', 'lg:pl-4', 'lg:pr-4', 'lg:pt-0', 'w-full', 'text-justify');
      node.removeChild(node.firstChild);
      node.previousElementSibling.appendChild(figCaption);
      figCaption.appendChild(node);
      if (nodeNextElementSibling?.tagName === 'UL') {
        figCaption.appendChild(nodeNextElementSibling);
      }
    }

    if (!!node.parentElement && ['DIV', 'BLOCKQUOTE', 'FIGURE'].includes(node.parentElement?.tagName)) {
      return;
    }
    const parent = node.parentNode;
    const wrapperDiv = document.createElement('div');
    if (node.tagName === 'TABLE') {
      wrapperDiv.classList.add('post-paragraph-table');
    } else {
      wrapperDiv.classList.add('post-paragraph');
    }
    parent?.replaceChild(wrapperDiv, node);
    wrapperDiv.appendChild(node);
  };

  // Table of contents intersection/visibility manager
  const [contentsVisible, setContentsVisible] = React.useState<boolean>(true);
  // const blogPostClick = (e) => console.log(e);

  React.useEffect(() => {
    if (window !== undefined) {
      const pNodes = document.querySelectorAll('p, main ul:not([id]), main ol:not([id]), main table');
      Array.from(pNodes, (node) => {
        if (node.tagName === 'UL') {
          node.classList.add('leading-8', 'list-disc', 'pl-8');
        }
        wrapNode(node);
      });

      const codeWrappers = document.querySelectorAll('pre');
      const imageWrappers = document.querySelectorAll('img.gatsby-resp-image-image');
      const contentsTbl = document.querySelector('#table-of-contents');
      const contentsRect = contentsTbl?.getBoundingClientRect();
      const onScroll = () => {
        if (contentsRect) {
          const intersects = (elem: Element) => {
            const rect = elem.getBoundingClientRect();
            return (rect.top <= contentsRect.bottom && rect.bottom >= contentsRect.top);
          };

          if (Array.from(imageWrappers).some(intersects) || Array.from(codeWrappers).some(intersects)) {
            if (contentsVisible) {
              setContentsVisible(false);
            }
          } else if (!contentsVisible) {
            setContentsVisible(true);
          }
        }
      };

      document.addEventListener('scroll', onScroll);
      return () => {
        document.removeEventListener('scroll', onScroll);
      };
    }
  });

  React.useEffect(() => {
    if (window !== undefined) {
      const titleElements = Array.from(document.querySelectorAll('main h3, main h4'));
      const navLinks = Array.from(document.querySelectorAll('#table-of-contents-items a'));
      let truthTable: boolean[] = Array(titleElements.length).fill(false);

      const isVisible = (element: Element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
          return true;
        }
        return false;
      };

      const updateView = () => {
        const tempArr: boolean[] = [];
        titleElements.map((elem, idx) => {
          tempArr[idx] = isVisible(elem);
        });
        if (tempArr.some((item) => item === true)) {
          truthTable = [...tempArr];
        }

        const activeTitleClass = 'table-of-contents-active-title';
        navLinks.map((navLink, id) => {
          if (id === truthTable.findIndex((item) => item === true)) {
            if (!navLink.classList.contains(activeTitleClass)) navLink.classList.add(activeTitleClass);
          } else {
            navLink.classList.remove(activeTitleClass);
          }
        });
      };

      window.addEventListener('scroll', updateView);
    }
  }, []);

  // Table of contents styling: semi-transparent when it overlaps blog post elements (images or code)
  const contentTableClass = classNames(
    'absolute overflow-hidden p-4 border max-w-[395px] w-full shadow-sm bg-white dark:bg-even-darker border-stone-300 rounded-xl mr-2 hover:opacity-100 transition-opacity duration-700',
    { 'opacity-100': contentsVisible, 'opacity-[.05]': !contentsVisible },
  );

  const image = getImage(mdx.frontmatter.hero_image);

  const inlineHeroMarkerStyle = {
    backgroundColor: image?.backgroundColor,
    color: getColorContrast(image!.backgroundColor!),
  };
  return (
    <div className='flex flex-col mt-2 mx-2 px-2 xl:px-0'>
      {/* begining of heroimage top section */}
      <div className='relative'>
        <div className='flex absolute w-full -z-10 h-77'>
          <GatsbyImage image={image!} alt={mdx.frontmatter.hero_image_alt} className='min-h-full' />
        </div>
        <div className='flex flex-col h-77 justify-between pb-2'>
          <div className='mt-2 px-3 text-sm'>
            {/* <span>{mdx.frontmatter.hero_image_credit_text}</span> */}
            <span className='px-2 py-0.5' style={inlineHeroMarkerStyle}>
              {`${t('post.hero_image_by')} `}
              <a href={mdx.frontmatter.hero_image_author_link} className='font-bold text-md hover:underline' target='_blank' rel="noreferrer">
                {mdx.frontmatter.hero_image_author}
              </a>
              {` ${t('post.hero_image_text_preposition')} `}
              <a href={mdx.frontmatter.hero_image_credit_link} className='font-bold text-md hover:underline' target='_blank' rel="noreferrer">
                {mdx.frontmatter.hero_image_source}
              </a>
            </span>
          </div>
          <div className='flex justify-between mx-2'>
            <div className='flex'>
              <section>
                <h2 className='hidden'>Tags</h2>
                <ul className='flex flex-wrap justify-start'>
                  { mdx.frontmatter.tags.map((tag, index) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      // eslint-disable-next-line max-len
                      className='px-3 mr-2 mb-1 before:content-["#"] font-roboto text-base rounded-xl'
                      style={inlineHeroMarkerStyle}
                    >
                      {tag}
                    </li>
                  )) }
                </ul>
              </section>
            </div>
            <div
              className='flex self-end items-center ml-2 mb-1 rounded-xl px-2'
              style={{
                backgroundColor: image?.backgroundColor,
                color: getColorContrast(image!.backgroundColor!),
              }}
            >
              <BsClockFill size={17} />
              <span className='ml-2'>
                { `${mdx.timeToRead} min` }
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* end of heroimage top section */}
      <div className='flex flex-col relative'>
        <div className='self-end font-roboto text-slate-500 dark:text-zinc-300'>
          {t('post.published')}
          {' '}
          {mdx.frontmatter.date}
        </div>
        {/* begining of blog post main part  */}
        <div className='grid relative grid-rows-auto grid-flow-row grid-cols-2 md:grid-cols-3 gap-4 w-full'>
          <MDXProvider components={components}>
            <nav id='nav-table-of-contents' className='hidden sticky top-4 md:inline-grid md:col-start-1 md:col-span-1'>
              <div id="table-of-contents" className={contentTableClass}>
                <div className='mb-3 -mt-1 text-sm font-roboto text-right text-slate-500 dark:text-slate-300'>
                  <Link to={useLocale()} className='hover:underline'>
                    <BsHouseFill size={16} className='inline mr-1 align-text-bottom' />
                    {t('post.home_page')}
                  </Link>
                </div>
                <TableOfContents tableOfContents={mdx.tableOfContents} />
              </div>
            </nav>
            <header className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-7'>
              <h1 className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 font-bold text-3xl dark:text-white'>{ mdx.frontmatter.title }</h1>
              <h2 className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-3 mb-3 font-normal font-roboto text-2xl text-slate-500 dark:text-slate-300'>{mdx.frontmatter.sub_title}</h2>
            </header>
            <main className='grid grid-flow-row grid-cols-3 col-start-1 col-span-3 text-xl dark:text-white font-light leading-a-little-bit-looser'>
              <MDXRenderer>
                { mdx.body }
              </MDXRenderer>
            </main>
          </MDXProvider>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

export const Head = ({ data: { mdx } }: PageProps<DataProps>) => (
  <SEO title={mdx.frontmatter.title} />
);

export const query = graphql`
  query Post ($postId: String) {
    mdx(id: {eq: $postId}) {
      tableOfContents(maxDepth: 4)
      timeToRead
      frontmatter {
        title
        sub_title
        author
        date(formatString: "DD-MM-YYYY")
        title
        tags
        hero_image_alt
        hero_image_author
        hero_image_author_link
        hero_image_source
        hero_image_credit_link
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 1280, height: 308, placeholder: DOMINANT_COLOR, formats: JPG, transformOptions: {cropFocus: ATTENTION, fit: COVER})
          }
        }
      }
      body
    }
  }
`;
