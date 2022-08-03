import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { LogoVertical, LogoHorizontal } from '../common/Logo';
import LocaleIcon, {LocaleIconPL, LocaleIconGB, LocaleIconProps } from '../common/LocaleIcon';
import SearchBar from '../common/Search';
import { BsFilterCircle, BsFilterCircleFill, BsSun, BsGlobe2, BsGithub, BsThreeDotsVertical } from 'react-icons/bs';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { BlogDispatchContext, BlogStateContext, ReducerActionType } from '../../context/BlogContextProvider';
import useLocale from '../hooks/useLocale';
import { useLocation } from "@reach/router";
import classNames from 'classnames';
import { t } from 'i18next';


const NavBar = () => {
  const blogState = React.useContext(BlogStateContext);
  const dispatch = React.useContext(BlogDispatchContext);

  const [visible, setVisible] = React.useState<boolean>(false);

  const { i18n } = useTranslation();
  
  const showFilter = () => {
    const target = document.querySelector('#filter-modal');
    const filterContent = document.querySelector('#filter-content');
    target?.classList.toggle('hidden');
    // target?.classList.toggle('filter-modal-visible');
    setTimeout(() => {
      target?.classList.toggle('filter-modal-visible')
      filterContent?.classList.toggle('filter-content-visible')
    }, 1);
    dispatch({type: ReducerActionType.TOGGLE_FILTER, payload: true})
  };

  const clearFilter = () => {
    dispatch({type: ReducerActionType.CLEAR_FILTER});
    dispatch({type: ReducerActionType.UPDATE_FILTER, payload: {}});
  };

  const isActiveLocalePath = (locale: string) => {
    const { pathname } = useLocation();
    const regex = new RegExp(String.raw`^\/${locale}(?:\/|$)`);
    return regex.test(pathname);
  }

  React.useEffect(() => {
    if (window !== undefined) {
      const filterIcon = document.querySelector('#filter-on');
      filterIcon?.addEventListener('click', showFilter);
      return () => {
        filterIcon?.removeEventListener('click', showFilter);
      }
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
      dispatch({type: ReducerActionType.SET_LOCALE, payload: lang})
      i18n.changeLanguage(lang);
    // }
  };


  // Update blog locale state when user changes locale manually by typing URL
  const activeLocale = isActiveLocalePath('pl') ? 'pl' : 'en';
  React.useEffect(() => {
    handleLanguageChange(activeLocale);
    // dispatch({type: ReducerActionType.SET_LOCALE, payload: activeLocale})
    // i18n.changeLanguage(activeLocale);
  }, [activeLocale]);

  const handleLocaleClick = () => {
    const localeMenu = document.querySelector('#locale-menu');
    localeMenu?.classList.toggle('hidden');
  }
  
  const localeListElementPLClass = classNames('flex flex-nowrap items-baseline px-2', {'bg-stone-200 rounded text-stone-500': blogState.locale === 'pl'})
  const localeListElementGBClass = classNames('flex flex-nowrap items-baseline px-2', {'bg-stone-200 rounded text-stone-500': blogState.locale === 'en'})

  return(
    <nav>
      <div className='flex items-center justify-between mx-4 xl:mx-1 h-22.5 md:h-20 lg:h-22.5'>
        <div className={!visible ? 'sm:flex-none' : 'hidden'} >
          <Link to={ useLocale() }>
            <div className='hidden sm:block mr-10 w-29 lg:w-42'>
              <LogoHorizontal />
            </div>
            <div className='block sm:hidden mr-10 w-19'>
              <LogoVertical />
            </div>
          </Link>
        </div>
        <div className='flex flex-[2_1] flex-nowrap justify-center items-center mr-8 lg:mx-auto'>
          <div>
            <SearchBar handleVisibility={setVisible}/>
          </div>
          <div className='ml-4 sm:ml-8 xl:ml-11'>
            { blogState.filterOn
              ? <div id='filter-on' className='relative'>
                  <BsFilterCircleFill className='w-7 h-7 md:w-6 md:h-6' onClick={showFilter} />
                  <span className='absolute -top-1 left-4 w-5 h-5 py-0.5 bg-cube-like rounded-full text-xs text-white align-middle text-center'>
                    { Object.keys(blogState.tags).length }
                  </span>
                </div>
              : <BsFilterCircle className='w-7 h-7 md:w-6 md:h-6' onClick={showFilter}/>
            }
          </div>
          {
            blogState.filterOn && 
            <div className='ml-5 font-medium underline cursor-pointer' onClick={clearFilter}>{t('filter.clear_filter')}</div>
          }
        </div>
        <div className="hidden md:flex md:flex-nowrap self-center items-end justify-around w-48">
          <div>
            <BsSun size={20}/>
          </div>
          <div id='nav-locale' className='relative' onClick={() => handleLocaleClick()} >
            {/* <BsGlobe2 size={20} /> */}
            <LocaleIcon locale={blogState.locale} />
            <div id='locale-menu' className='hidden absolute -left-6 top-7  min-w-min min-h-max px-1 py-2 z-10 bg-white shadow-md text-sm rounded-md border'>
              <ul className='leading-7'>
                <li onClick={ () => handleLanguageChange('en') } className={ localeListElementGBClass }>
                  <div className='w-4 h-3 mr-2 rounded-sm'><LocaleIconGB /></div>
                  { isActiveLocalePath('pl')  
                     ? <Link to={ useLocation().pathname.replace(/^\/pl(?:\/|$)/, `/`) } hrefLang='en' className='hover:underline'>
                    {/* <Link to={ useLocation().pathname } hrefLang='en' > */}
                      Engilsh
                    </Link>
                     : 'English'
                  }
                </li>
                <li onClick={ () => handleLanguageChange('pl') } className={ localeListElementPLClass } >
                  <div className='w-4 h-3 mr-2'><LocaleIconPL /></div>
                  {
                    !isActiveLocalePath('pl') 
                    ? <Link to={ useLocation().pathname.replace(/^\//, useLocation().pathname === '/' ? '/pl' : '/pl/') } hrefLang='pl' className='hover:underline'>Polski</Link>
                    : 'Polski'
                  }</li>
              </ul>
            </div>
          </div>
          <div>
            <BsGithub size={20} />
          </div>
        </div>
        <div className="block md:hidden">
          <BsThreeDotsVertical size={28}/>
        </div>
        <div className='hidden md:flex w-16 justify-end'>
          <StaticImage
          src='./../../images/about_1x.png' 
          alt='Funny drawing showing author of this blog'
          layout='fullWidth'
          className='hidden md:block md:w-9 md:h-9 lg:w-12 lg:h-12 p-0 border-2 border-gray-900 rounded-full drop-shadow-[0_3px_5px_rgba(0,0,0,0.2)]'
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;