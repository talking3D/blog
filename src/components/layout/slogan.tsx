import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Slogan = () => {
  const { t } = useTranslation();
  return (
    <div className='mt-7 mx-2'>
      <h3 className='font-roboto text-2xl sm:text-3xl font-bold leading-3'>
        <span className='heading-span-letter align-baseline'>D</span>
        <span className='dark:text-white align-baseline'>ata</span>
        {' '}
        <span className='heading-span-letter align-baseline'>D</span>
        <span className='dark:text-white align-baseline'>riven</span>
        {' '}
        <span className='heading-span-letter align-baseline'>D</span>
        <span className='dark:text-white align-baseline'>iscussion</span>
      </h3>
      <h4 className='font-roboto text-2xl font-medium text-gray-700 leading-3'>
        <span className='dark:text-slate-300 text-base md:text-xl lg:text-2xl'>{ t('main.subtitle') }</span>
      </h4>
    </div>
  );
};

export default Slogan;
