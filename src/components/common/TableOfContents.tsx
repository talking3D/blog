import * as React from 'react';

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

export interface TableOfContentsProps {
    tableOfContents: TableContentsType
};

const NoItems = () => {
  return(
    <div>
      There is are no items to be indexed in this post!
    </div>
  );
};

const ItemsList = ({tableOfContents}: TableOfContentsProps) => {
  return (
    <ul className='text-sm'>
      { !!tableOfContents.items && tableOfContents.items.map( (part, id) => (
        <li key={ id } className='font-semibold'>{ part.title }
          { !!part.items && 
              <ul key={ id } className='mb-4 mt-2 font-normal leading-5 list-outside list-disc pl-4'>
                { part.items.map( (section, id) => (
                  <li key={ id } className='mb-2'>{ section.title }</li> ) )
                }
              </ul>}
        </li>

        
      ))}
      </ul>
  )
}

const TableOfContents = ({tableOfContents}: TableOfContentsProps) => {
  return (
    <div>
      { !!tableOfContents.items 
        ? <ItemsList tableOfContents={tableOfContents} />
        : <NoItems />}
    </div>
  )
};

export default TableOfContents;


