import * as React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SyntaxHighlighter from '../../components/addons/SyntaxHighlighter';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { getHeroColor } from '../../components/utils/HeroColors';
import { BsClockFill, BsHouseFill } from 'react-icons/bs';
import PostImage from '../../components/common/Image';
import TableOfContents, { TableContentsType } from '../../components/common/TableOfContents';
import {Header3, Header4} from '../../components/common/PostHeaders';
import classNames from 'classnames/dedupe';


// Use shortcodes
const components = {
  pre: (props: React.FC) => <SyntaxHighlighter {...props } />,
  // h3: (props: React.FC) => <h3 { ...props } className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-2 mb-1 text-2xl font-normal' />,
  h3: (props: React.FC) => <Header3 {...props} />,
  h4: (props: React.FC) => <Header4 { ...props } />,
  h6: (props: React.FC) => <div { ...props } className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-1 mb-4 text-lg font-normal' />,
  img: (props: React.FC) => <PostImage {...props} />,
}

type DataProps = {
  mdx: {
    tableOfContents: TableContentsType
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

  const addParentDiv = (node: HTMLElement) => {
    if (node.parentElement?.tagName === 'DIV') {
      return;
    }
    const parent = node.parentNode;
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('post-paragraph');
    parent?.replaceChild(wrapperDiv, node);
    wrapperDiv.appendChild(node);
  }

  // Table of contents intersection/visibility manager
  const [contentsVisible, setContentsVisible] = React.useState<boolean>(true);
  // const blogPostClick = (e) => console.log(e);

  React.useEffect(() => {
    
    if (window !== undefined) {
      const pNodes = document.querySelectorAll('p');
      Array.from(pNodes, node => addParentDiv(node))

      const codeWrappers = document.querySelectorAll('pre');
      const imageWrappers = document.querySelectorAll('figure.from-inline-image');
      const contentsTbl = document.querySelector('#table-of-contents');
      const contentsRect = contentsTbl?.getBoundingClientRect();
      const onScroll = () => {
        if (!!contentsRect) {
          const intersects = (elem: Element) => {
            const rect = elem.getBoundingClientRect();
            return ( rect.top <= contentsRect.bottom && rect.bottom >= contentsRect.top );
          };

         if (Array.from(imageWrappers).some(intersects) || Array.from(codeWrappers).some(intersects) ) {
          if (contentsVisible) {
            setContentsVisible(false);
          }
         } else {
          if (!contentsVisible) {
            setContentsVisible(true);
          }
         } 
        }
      };

      document.addEventListener('scroll', onScroll);
      return()  => {
        document.removeEventListener('scroll', onScroll);
      }
    }
  });


  // Table of contents scroll spy
  const [activeHeader, setActiveHeader] = React.useState<Element>();
  const logClicked = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log(e);
  };

  React.useEffect(() => {
    if (window !== undefined) {
      const titleElements = Array.from(document.querySelectorAll('h3, h4'));
      const truthTable = Array(titleElements.length).fill(false);

      const setTitleAsActive = (current: Element | undefined, nextElement: Element): Element => {
        if (!!current) {
          document.querySelector(`#nav-${current.innerHTML.toLowerCase().replaceAll(' ', '-')}`)?.classList.remove('table-of-contents-active-title');
        }
        const newActiveTitle =  titleElements[truthTable.findIndex(item => item === true)]
        if (!!newActiveTitle) {
          document.querySelector(`#nav-${newActiveTitle.innerHTML.toLowerCase().replaceAll(' ', '-')}`)?.classList.add('table-of-contents-active-title');
          setActiveHeader(newActiveTitle);
        }
        return newActiveTitle;
      }

      let activeTitle: Element | undefined;
      const callbackFn =  (entries: IntersectionObserverEntry[]) => {
        const [ entry ] = entries;
        console.log(entry.target.innerHTML);
        truthTable[ titleElements.indexOf(entry.target) ] = entry.isIntersecting;

        if (truthTable.some(item => item === true) || titleElements.indexOf(entry.target) === 0) {
          activeTitle = setTitleAsActive(activeTitle, entry.target);
        }
      };

      // Examine intersections against viewport
      const options = {
        root: null,
      };
      
      const observer = new IntersectionObserver(callbackFn, options);
      Array.from(titleElements).map(elem => observer.observe(elem));
    }
  }, [])

  // Table of contents styling: semi-transparent when it overlaps blog post elements (images or code)
  const contentTableClass = classNames(
    'absolute overflow-hidden p-4 border max-w-[395px] w-full shadow-sm bg-white border-stone-300 rounded-xl mr-2 hover:opacity-100 transition-opacity duration-700',
    {'opacity-100': contentsVisible, 'opacity-[.05]': !contentsVisible});

  const image = getImage(mdx.frontmatter.hero_image);
  console.log(activeHeader);

  return (
    <div className='flex flex-col mt-2 mx-2 px-2 xl:px-0'>
      {/* begining of heroimage top section */}
      <div className='relative'>
        <div className='flex absolute w-full -z-10 h-77'>
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
      </div>
      {/* end of heroimage top section */}
      <div className='flex flex-col relative'>
        <div className='self-end font-roboto text-slate-500'>
          Published on {mdx.frontmatter.date}
        </div>
        {/* begining of blog post main part  */}
        <div className='grid relative grid-rows-auto grid-flow-row grid-cols-2 md:grid-cols-3 gap-4 w-full'>
            <MDXProvider components={ components }>
              <nav id='nav-table-of-contents' className='hidden sticky top-4 md:inline-grid md:col-start-1 md:col-span-1'>
                <div id="table-of-contents" className={contentTableClass}>
                  <div className='mb-3 -mt-1 text-sm font-roboto text-right text-slate-500'>
                    <Link to='/' className='hover:underline'>
                      <BsHouseFill size={16} className='inline mr-1 align-text-bottom' />Go to Home Page
                    </Link>
                  </div>
                  <TableOfContents tableOfContents={ mdx.tableOfContents } onTitleChange={(e) => logClicked(e)} />
                </div>
              </nav>
              <header className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-7'>
                <h1 className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 font-bold text-3xl'>{ mdx.frontmatter.title }</h1>
                <h2 className='col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-3 mb-3 font-normal font-roboto text-2xl text-slate-500'>{mdx.frontmatter.sub_title}</h2>
              </header>
              <main className='grid grid-flow-row grid-cols-3 col-start-1 col-span-3 text-xl font-thin leading-a-little-bit-looser'>
                <MDXRenderer>
                  { mdx.body }
                </MDXRenderer>
              </main>
            </MDXProvider>
        </div>
      </div>
    </div>
  )
}

export default BlogPost;

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      tableOfContents(maxDepth: 4)
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

function ev(ev: any): (this: Window, ev: Event) => any {
  throw new Error('Function not implemented.');
}
