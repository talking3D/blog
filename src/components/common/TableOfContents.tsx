/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Link } from 'gatsby';
import { t } from 'i18next';
import classNames from 'classnames/dedupe';
import { BsHouseFill } from 'react-icons/bs';
import useLocale from '../hooks/useLocale';

export type FlatTocItems = {
  title?: string,
  url?: string,
}

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
    active: string | null,
  }

export interface TableOfContentsProps extends ItemListProps {
  title: string,
  expanded: boolean
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

// Recursively unpack table of contens items to flat (1D) array;
const unpackItems = ({ items } : TableContentsType, tocItems: FlatTocItems[] = []) => {
  if (items) {
    Object.values(items).forEach((value) => {
      tocItems.push({ title: value.title, url: value.url });
      if (value.items) unpackItems(value, tocItems);
    });
  }
  return tocItems;
};

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

const TableOfContents = ({
  tableOfContents, title, active, expanded,
}: TableOfContentsProps) => {
  // Table of contents styling: semi-transparent when it overlaps blog post elements (images or code)
  const contentTableClassExpanded = classNames(
    'absolute overflow-hidden p-4 border max-w-[395px] w-full shadow-sm bg-white dark:bg-even-darker border-stone-300 rounded-xl mr-2 transition-opacity duration-700',
    { 'opacity-100': expanded, 'opacity-[0]': !expanded },
  );

  const contentTableClassCollapsed = classNames(
    'flex flex-nowrap items-center absolute overflow-hidden z-20 w-full',
    { visible: !expanded, invisible: expanded },
  );

  const expandedToc = (
    <div id="table-of-contents" className={contentTableClassExpanded}>
      <div className='mb-3 -mt-1 text-sm font-roboto text-right text-slate-500 dark:text-slate-300'>
        <Link to={useLocale()} className='hover:underline'>
          <BsHouseFill size={16} className='inline mr-1 align-text-bottom' />
          {t('post.home_page')}
        </Link>
      </div>
      <div>
        {tableOfContents.items
          ? <ItemsList tableOfContents={tableOfContents} active={active} />
          : <NoItems />}
      </div>
    </div>
  );

  const collapsedToc = (
    <div className={contentTableClassCollapsed}>
      <div className='rounded-full border border-slate-300 w-10 h-10 text-center -mr-5 z-[100] bg-white shadow'>
        <Link to={useLocale()} className='hover:underline'>
          <BsHouseFill size={20} className='inline text-slate-500 dark:text-slate-300 align-bottom mt-2' />
        </Link>
      </div>
      <div className='w-full pl-8 py-4 border rounded-xl bg-white font-medium shadow'>
        { unpackItems(tableOfContents).find((item) => `nav-${standarizeId(item.title!)}` === active)?.title || title}
        {/* { console.log(active) } */}
      </div>
    </div>
  );

  return (
    <div>
      { collapsedToc }
      { expandedToc }
    </div>
  );
};

export default TableOfContents;
