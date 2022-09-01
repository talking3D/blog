import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Slogan = () => {
  const { t } = useTranslation();
  return (
    <div className='mt-7 mx-2'>
      <h3 className='font-roboto text-3xl font-bold'>
        <span className='heading-span-letter'>D</span>
        <span className='dark:text-white'>ata</span>
        {' '}
        <span className='heading-span-letter'>D</span>
        <span className='dark:text-white'>riven</span>
        {' '}
        <span className='heading-span-letter'>D</span>
        <span className='dark:text-white'>iscussion</span>
      </h3>
      <h4 className='font-roboto text-2xl font-medium text-gray-700'>
        <span className='dark:text-slate-300'>{ t('main.subtitle') }</span>
      </h4>
    </div>
  );
};

export default Slogan;
