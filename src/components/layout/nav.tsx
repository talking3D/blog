/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  BsFilterCircle, BsFilterCircleFill, BsSun, BsGithub, BsThreeDotsVertical,
} from 'react-icons/bs';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useLocation } from "@reach/router";
import classNames from 'classnames/bind';
import { t } from 'i18next';
import useLocale from '../hooks/useLocale';
import { BlogDispatchContext, BlogStateContext, ReducerActionType } from '../../context/BlogContextProvider';
// import SearchBar from '../common/Search';
import LocaleIcon, { LocaleIconPL, LocaleIconGB } from '../common/LocaleIcon';
import { LogoVertical, LogoHorizontal } from '../common/Logo';

const NavBar = () => {
  const blogState = React.useContext(BlogStateContext);
  const dispatch = React.useContext(BlogDispatchContext);

  // const [visible, setVisible] = React.useState<boolean>(false);

  const { i18n } = useTranslation();

  const showFilter = () => {
    const target = document.querySelector('#filter-modal');
    const filterContent = document.querySelector('#filter-content');
    target?.classList.toggle('hidden');
    // target?.classList.toggle('filter-modal-visible');
    setTimeout(() => {
      target?.classList.toggle('filter-modal-visible');
      filterContent?.classList.toggle('filter-content-visible');
    }, 1);
    dispatch({ type: ReducerActionType.TOGGLE_FILTER, payload: true });
  };

  const clearFilter = () => {
    dispatch({ type: ReducerActionType.CLEAR_FILTER });
    dispatch({ type: ReducerActionType.UPDATE_FILTER, payload: {} });
  };

  const { pathname } = useLocation();
  const isActiveLocalePath = (locale: string) => {
    const regex = new RegExp(String.raw`^\/${locale}(?:\/|$)`);
    return regex.test(pathname);
  };

  React.useEffect(() => {
    if (window !== undefined) {
      const filterIcon = document.querySelector('#filter-on');
      filterIcon?.addEventListener('click', showFilter);
      return () => {
        filterIcon?.removeEventListener('click', showFilter);
      };
    }
  }, []);

  React.useEffect(() => {
    if (window !== undefined) {
      function clickedOutsideLocaleMenu(e: Event) {
        const localeMenu = document.querySelector('#locale-menu');
        const localeNav = document.querySelector('#nav-locale');
        if (!localeNav?.contains(e.target as HTMLElement)) {
          if (!localeMenu?.classList.contains('hidden')) {
            localeMenu?.classList.add('hidden');
          }
        }
      }

      document.addEventListener('click', (e) => clickedOutsideLocaleMenu(e));
      return () => document.removeEventListener('click', (e) => clickedOutsideLocaleMenu(e));
    }
  }, []);

  // Update blog locale when user click language switcher
  const handleLanguageChange = (lang: 'pl' | 'en') => {
    // if (lang !== blogState.locale) {
    dispatch({ type: ReducerActionType.SET_LOCALE, payload: lang });
    i18n.changeLanguage(lang);
    // }
  };

  // Update blog locale state when user changes locale manually by typing URL
  const activeLocale = isActiveLocalePath('pl') ? 'pl' : 'en';
  React.useEffect(() => {
    handleLanguageChange(activeLocale);
  }, [activeLocale]);

  const handleLocaleClick = () => {
    const localeMenu = document.querySelector('#locale-menu');
    localeMenu?.classList.toggle('hidden');
  };

  const localeStyles = {
    base: 'flex flex-nowrap items-baseline px-2',
    active: 'bg-stone-200 rounded text-stone-500',
  };
  const localeListElementClass = classNames.bind(localeStyles);

  const lokaleURLPL = useLocation().pathname.replace(/^\//, useLocation().pathname === '/' ? '/pl' : '/pl/');
  const lokaleURLGB = useLocation().pathname.replace(/^\/pl(?:\/|$)/, `/`);

  return (
    <nav>
      <div className="flex items-center justify-between mx-4 xl:mx-1 h-22.5 md:h-20 lg:h-22.5">
        {/* <div className={!visible ? 'sm:flex-none' : 'hidden'}> */}
        <div className='sm:flex-none'>
          <Link to={useLocale()}>
            <div className="hidden sm:block mr-10 w-29 lg:w-42">
              <LogoHorizontal />
            </div>
            <div className="block sm:hidden mr-10 w-19">
              <LogoVertical />
            </div>
          </Link>
        </div>
        <div className="flex flex-[2_1] flex-nowrap justify-center items-center mr-8 lg:mx-auto">
          {/* <div>
            <SearchBar handleVisibility={setVisible} />
          </div> */}
          {/* <div className="ml-4 sm:ml-8 xl:ml-11"> */}
          <div className='w-11 h-11 rounded-full hover:bg-stone-100'>
            <div className='w-7 h-7 mx-auto my-2 shadow-md rounded-full'>
              { blogState.filterOn
                ? (
                  <div id="filter-on" className="relative">
                    <BsFilterCircleFill className="w-7 h-7" onClick={showFilter} />
                    <span className="absolute -top-1 left-4 w-5 h-5 py-0.5 bg-cube-like rounded-full text-xs text-white align-middle text-center">
                      { Object.keys(blogState.tags).length }
                    </span>
                  </div>
                )
                : <BsFilterCircle className="w-7 h-7" onClick={showFilter} />}
            </div>

          </div>
          {
            blogState.filterOn
            && <div className="ml-5 font-medium underline cursor-pointer" onClick={clearFilter}>{t('filter.clear_filter')}</div>
          }
        </div>
        <div className="hidden md:flex md:flex-nowrap self-center items-end justify-around w-48">
          <div className='w-10 h-10 hover:bg-stone-100 rounded-full'>
            <div>
              <BsSun size={20} className='mx-auto mt-2.5' />
            </div>
          </div>
          <div className='w-14 h-10 hover:bg-stone-100 rounded-3xl'>
            <div id="nav-locale" className="relative mt-2.5" onClick={() => handleLocaleClick()}>
              {/* <BsGlobe2 size={20} /> */}
              <LocaleIcon locale={blogState.locale} />
              <div id="locale-menu" className="hidden absolute -left-6 top-7  min-w-min min-h-max px-1 py-2 z-10 bg-white shadow-md text-sm rounded-md border">
                <ul className="leading-7">
                  <li onClick={() => handleLanguageChange('en')} className={localeListElementClass('base', { active: blogState.locale === 'en' })}>
                    <div className="w-4 h-3 mr-2 rounded-sm"><LocaleIconGB /></div>
                    { isActiveLocalePath('pl')
                      ? (
                        <Link to={lokaleURLGB} hrefLang="en" className="hover:underline">
                          Engilsh
                        </Link>
                      )
                      : 'English'}
                  </li>
                  <li onClick={() => handleLanguageChange('pl')} className={localeListElementClass('base', { active: blogState.locale === 'pl' })}>
                    <div className="w-4 h-3 mr-2"><LocaleIconPL /></div>
                    {
                      !isActiveLocalePath('pl')
                        ? <Link to={lokaleURLPL} hrefLang="pl" className="hover:underline">Polski</Link>
                        : 'Polski'
                    }

                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-10 h-10 hover:bg-stone-100 rounded-full'>
            <div>
              <BsGithub size={20} className='mx-auto mt-2.5' />
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <BsThreeDotsVertical size={28} />
        </div>
        <div className="hidden md:flex w-16 justify-end">
          <StaticImage
            src="./../../images/about_1x.png"
            alt="Funny drawing showing author of this blog"
            layout="fullWidth"
            className="hidden md:block md:w-9 md:h-9 lg:w-12 lg:h-12 p-0 border-2 border-gray-900 rounded-full drop-shadow-[0_3px_5px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
