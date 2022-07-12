import * as React from 'react';
import { Link } from 'gatsby';

export type TableContentsType = {
  items?: {
    url?: string
    title: string
    items?: {
      url: string
      title: string
    }[]
  }[]
};


export interface ItemListProps {
    tableOfContents: TableContentsType
    handleTitleClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  };

export interface TableOfContentsProps {
  tableOfContents: TableContentsType
  onTitleChange:  (e: React.MouseEvent<Element, MouseEvent>) => void;
}

const NoItems = () => {
  return(
    <div>
      We couldn't find any structure in this post
    </div>
  );
};

const listItemId = (text: string) => {
  return 'nav-' + text.toLowerCase().replaceAll(' ', '-')
}


const ItemsList = ({tableOfContents, handleTitleClick}: ItemListProps) => {
  return (
    <ul id='table-of-contents-items' className='text-sm'>
      { !!tableOfContents.items && tableOfContents.items.map( (part, id) => (
        <li key={ id } className='font-semibold'><Link to={ part.url! } id={listItemId(part.title)} className='hover:underline block px-2' onClick={(e) => handleTitleClick(e) }>{ part.title }</Link>
          { !!part.items && 
              <ul key={ id } className='mb-4 mt-2 font-normal leading-5 list-outside list-disc pl-4'>
                { part.items.map( (section, id) => (
                  <li key={ id } className='mb-2'><Link to={ section.url } id={listItemId(section.title)} className='hover:underline block px-2' onClick={(e) => handleTitleClick(e)} >{ section.title }</Link></li> ) )
                }
              </ul>}
        </li>

        
      ))}
      </ul>
  )
}

const TableOfContents = ({tableOfContents, onTitleChange}: TableOfContentsProps ) => {
  return (
    <div>
      { !!tableOfContents.items 
        ? <ItemsList tableOfContents={tableOfContents} handleTitleClick={onTitleChange}/>
        : <NoItems />}
    </div>
  )
};

export default TableOfContents;


