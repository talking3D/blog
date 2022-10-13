/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Link } from 'gatsby';
import { t } from 'i18next';
import classNames from 'classnames/dedupe';

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
    tableOfContents: TableContentsType,
    active: string | null
  }

export interface TableOfContentsProps {
  tableOfContents: TableContentsType
}

const NoItems = () => (
  <div>
    {t('toc.cannot_find')}
  </div>
);

export const standarizeId = (idProposal: string) => {
  let itemId = idProposal.toLocaleLowerCase();
  itemId = itemId.replaceAll(' ', '-').replaceAll(/[“”:….,'"?()!]/g, "");
  return itemId;
};

export const listItemId = (text: string) => `nav-${standarizeId(text)}`;

const ItemsList = ({ tableOfContents, active }: ItemListProps) => (
  <ul id='table-of-contents-items' className='text-sm'>
    { !!tableOfContents.items && tableOfContents.items.map((part, partId) => (
      <li key={partId} className='font-semibold'>
        <Link
          to={part.url!}
          id={listItemId(part.title)}
          className={classNames(
            'hover:underline',
            'block',
            'px-2',
            'dark:text-white',
            { 'table-of-contents-active-title': listItemId(part.title) === active },
          )}
        >
          { part.title }
        </Link>
        { !!part.items
              && (
              <ul key={partId} className='mb-4 mt-2 font-normal leading-5 list-outside list-disc pl-4'>
                { part.items.map((section, sectionId) => (
                  <li key={sectionId} className='mb-2 dark:text-white'>
                    <Link
                      to={section.url}
                      id={listItemId(section.title)}
                      className={
                        classNames(
                          'hover:underline',
                          'block',
                          'px-2',
                          { 'table-of-contents-active-title': listItemId(section.title) === active },
                        )
                      }
                    >
                      { section.title }
                    </Link>
                  </li>
                ))}
              </ul>
              )}
      </li>

    ))}
  </ul>
);

const TableOfContents = ({ tableOfContents, active }: ItemListProps) => (
  <div>
    { tableOfContents.items
      ? <ItemsList tableOfContents={tableOfContents} active={active} />
      : <NoItems />}
  </div>
);

export default TableOfContents;
