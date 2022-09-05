/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from 'gatsby-plugin-image';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import useActiveLocalePath from '../components/hooks/useActiveLocalePath';

const NotFoundPage = () => (
  <div className='dark:text-white'>
    <div className='flex w-full min-h-full mt-7 bg-[#493971] relative'>
      <StaticImage
        src='./../images/404.png'
        alt='Blog author looking through magnifying glass on illuminated 404 text'
      />
      <div className='absolute max-w-1/2 right-4 top-1 mt-0 mr-2 lg:mr-6 sm:mt-2 md:mt-6 lg:mt-12 px-2 font-semibold text-white text-xs xs:text-base sm:text-2xl lg:text-4xl'>
        <p>{t('404page.couldnt_find')}</p>
        <p>
          <Trans i18nKey='404page.see_all_posts'>
            <Link
              to={useActiveLocalePath('pl') ? '/pl' : '/'}
              className='underline text-cube-like'
            >
              See
            </Link>
            {' '}
            the full list of posts on our blog!
          </Trans>
        </p>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
