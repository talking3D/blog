import * as React from 'react';
import { useTranslation } from 'react-i18next';
// import { Trans } from 'react-i18next';
import { Link } from 'gatsby';
import { RiCopyrightLine } from 'react-icons/ri';
import useActiveLocalePath from '../hooks/useActiveLocalePath';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='h-12 w-full mt-10 pt-4 mb-8 px-4 text-sm leading-7 border-t border-slate-200 dark:border-slate-500 dark:text-white'>
      {t('footer.blog_pl')}
      <strong>Talking 3D </strong>
      {t('footer.blog_en')}
      {t('footer.powered')}
      {' '}
      <a href='https://www.gatsbyjs.com' className='hover:underline text-blue-600 dark:text-blue-400' target='_blank' rel="noreferrer">Gatsby</a>
      {t('footer.author')}
      <Link to={useActiveLocalePath('pl') ? '/pl/about' : '/about'} className='hover:underline text-blue-600 dark:text-blue-400'>{t('footer.author_himself')}</Link>
      {t('footer.this_blog')}
      <br />
      {t('footer.copyright')}
      {' '}
      <RiCopyrightLine size={16} className='inline align-text-top' />
      {' '}
      2022
      {' '}
      <Link to={useActiveLocalePath('pl') ? '/pl/about' : '/about'} className='hover:underline text-blue-600 dark:text-blue-400'>Krzysztof Skwarski</Link>
      .
      {/* TO:DO: Try to use Trans component */}
      {/* {t('footer.copyright')}
      {' '}
      <RiCopyrightLine size={20} className='inline align-text-top' />
      {' '}
      2022
      {' '}
      <Link to='/about'>Krzysztof Skwarski.</Link>
      <br />
      <Trans t={t} i18nKey='copyright' ns='copyright'>
        <strong>Talking3D</strong>
        {' '}
        blog is proudly powered by the great
        {' '}
        <a href='https://www.gatsbyjs.com'>Gatsby</a>
        {' '}
        and humble
        {' '}
        <Link to='/about'>author</Link>
        {' '}
        of this blog.
      </Trans> */}
    </div>

  );
};

export default Footer;
