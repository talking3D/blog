/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Link } from 'gatsby';
import { t } from 'i18next';

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
  }

export interface TableOfContentsProps {
  tableOfContents: TableContentsType
}

const NoItems = () => (
  <div>
    {t('toc.cannot_find')}
  </div>
);

const listItemId = (text: string) => `nav-${text.toLowerCase().replaceAll(' ', '-')}`;

const ItemsList = ({ tableOfContents }: ItemListProps) => (
  <ul id='table-of-contents-items' className='text-sm'>
    { !!tableOfContents.items && tableOfContents.items.map((part, partId) => (
      <li key={partId} className='font-semibold'>
        <Link to={part.url!} id={listItemId(part.title)} className='hover:underline block px-2'>{ part.title }</Link>
        { !!part.items
              && (
              <ul key={partId} className='mb-4 mt-2 font-normal leading-5 list-outside list-disc pl-4'>
                { part.items.map((section, sectionId) => (
                  <li key={sectionId} className='mb-2'><Link to={section.url} id={listItemId(section.title)} className='hover:underline block px-2'>{ section.title }</Link></li>))}
              </ul>
              )}
      </li>

    ))}
  </ul>
);

const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => (
  <div>
    { tableOfContents.items
      ? <ItemsList tableOfContents={tableOfContents} />
      : <NoItems />}
  </div>
);

export default TableOfContents;
