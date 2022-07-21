import * as React from 'react';
import { BsXLg } from 'react-icons/bs';
import { useStaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';
import { BlogStateContext, BlogDispatchContext, ReducerActionType, Tag } from '../../context/BlogContextProvider';


type QueryNode = {
  frontmatter: {
    tags: string[]
  }
  id: string
};

const Filter = () => {

  const dispatch = React.useContext(BlogDispatchContext);
  const blogState = React.useContext(BlogStateContext);
  
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            tags
          }
          id
        }
      }
    }
  `)

  React.useEffect(() => {
    if (window !== undefined) {
      const xfilter = document.querySelector('#xfilter');
      const blend = document.querySelector('#filter-modal');
      const filterContent = document.querySelector('#filter-content');
      const closeBlend = () => {
        setTimeout(() => blend?.classList.toggle('hidden'), 500);
        blend?.classList.toggle('filter-modal-visible');
        filterContent?.classList.toggle('filter-content-visible');
      }
      xfilter?.addEventListener('click', closeBlend);
      return () => xfilter?.removeEventListener('click', closeBlend);
    }
  }, []);

  let tags = new Map();
  query.allMdx.nodes.map((node: QueryNode, idx: number) => {
    node.frontmatter.tags.map((tag, id) =>  (
      tags.set(tag, `${idx}.${id}`)
    ));
  });

  const handleBlendClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const event = e.target as HTMLElement;
    const blend = document.querySelector('#filter-modal');
    const filterContent = document.querySelector('#filter-content');

    if (!!blend && event.id === 'filter-modal' || event.id === 'show-all') {
      setTimeout(() => blend?.classList.toggle('hidden'), 500);
      blend?.classList.toggle('filter-modal-visible');
      filterContent?.classList.toggle('filter-content-visible');
    }
  }
  // const [selected, setSelected] = React.useState<{[id: string]: string}>({});

  const handleTagSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    if (!Object.hasOwn(blogState.tags, target.id)) {
      dispatch({type: ReducerActionType.ADD_TAG, payload: { [target.id]: target.innerText } })
    } else {
      dispatch({type: ReducerActionType.REMOVE_TAG, payload: { [target.id]: target.innerText } })
    }
  };

  const countBlogPostByTag = (tags: Tag) => {
    let postId = new Set();
    const tagsArray = Object.values(tags);
    query.allMdx.nodes.map((node: QueryNode) => {
      tagsArray.map((tag) => {
        if (node.frontmatter.tags.includes(tag)) {
          postId.add(node.id)
        }
      })
    })
    return postId.size;
  }
  return (
    <div
     id='filter-modal' 
     className='fixed hidden left-0 top-0 w-full h-full bg-neutral-800/0 transition-colors ease-in-out duration-500'
     onClick={(e) => handleBlendClick(e)}
     >
      <div id='filter-content'
       className='absolute opacity-0 top-1/2 left-1/4 right-1/4 mr-auto ml-auto max-w-3xl my-40 min-h-min bg-white rounded-lg transition-all ease-linear duration-300'>
        <div className='flex items-center py-4 h-16 border-b-slate-300 border-b relative'>
          <span className='absolute block w-full text-lg text-center font-semibold -z-1'>Filter</span>
          <div id='xfilter' className='ml-8 w-8 h-8 z-10 relative'>
            <BsXLg size={18} className='m-0 z-40 absolute top-1/4 left-1/4'/>
          </div>
        </div>
        <div className='my-4'>
          <ul className='flex flex-wrap justify-start px-3'>
            { [...tags.entries()].sort().map(([tag, id]) => {
              const listElementClass = classnames(
                'rounded-2xl px-4 py-1 my-2 mx-2 text-sm before:content-["#"] inline',
                {'border border-even-darker transition-colors duration-500 animate-bumpdown': !Object.hasOwn(blogState.tags, id)},
                {'border border-even-darker bg-even-darker text-white transition-colors duration-500 animate-bumpup': Object.hasOwn(blogState.tags, id)}
              )
              return (
              <li 
                key={id}
                id={id}
                className={ listElementClass }
                onClick={(e) => handleTagSelect(e)}
              >
                { tag }
                </li>
            )})}
          </ul>
        </div>
        <div className='flex justify-between items-center h-16 border-t border-t-slate-300'>
          <span className='ml-6 font-medium underline cursor-pointer' onClick={() => dispatch({type: ReducerActionType.CLEAR_FILTER})}>Clear filter</span>
          {
            Object.keys(blogState.tags).length > 0
              ? <button type='button' className='mr-6 px-6 py-2 font-medium bg-cube-like rounded-xl'>Show { `${countBlogPostByTag(blogState.tags)} ${countBlogPostByTag(blogState.tags) > 1 ? 'posts' : 'post'}` }</button>
              : <button id='show-all' type='button' className='mr-6 px-6 py-2 font-medium bg-cube-like rounded-xl text-white'>Show all posts</button>
          }
        </div>
      </div>
     </div>
  );
};

export default Filter;
