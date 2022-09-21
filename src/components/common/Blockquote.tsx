/* eslint-disable arrow-body-style */
import React from 'react';
import { BsChatQuote } from 'react-icons/bs';

const Blockquote = (props: {children: string}) => {
  const { children } = props;
  return (
    <blockquote className='flex justify-start gap-x-6 flex-wrap md:flex-nowrap col-start-1 col-span-3 md:col-start-2 md:col-span-2 mt-6 mb-1 px-4 md:px-auto text-2xl text-slate-500 dark:text-slate-300 font-light italic'>
      <BsChatQuote size={32} className='flex-none justify-self-center md:self-center mr-auto ml-auto md:m-auto' />
      { children }
    </blockquote>
  );
};

export default Blockquote;
