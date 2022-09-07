/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  BsFilterCircle,
  BsFilterCircleFill,
  BsSun,
  BsGithub,
  BsThreeDotsVertical,
  BsMoonStars,
  BsTv,
} from 'react-icons/bs';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useLocation } from "@reach/router";
import classNames from 'classnames/bind';
import { t } from 'i18next';
import { LogoVertical, LogoHorizontal } from '../common/Logo';
import useActiveLocalePath from '../hooks/useActiveLocalePath';
import useLocale from '../hooks/useLocale';
import { BlogDispatchContext, BlogStateContext, ReducerActionType } from '../../context/BlogContextProvider';
// import SearchBar from '../common/Search';
import LocaleIcon, { LocaleIconPL, LocaleIconGB } from '../common/LocaleIcon';

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

  React.useEffect(() => {
    if (window !== undefined) {
      const filterIcon = document.querySelector('#filter-on');
      filterIcon?.addEventListener('click', showFilter);
      return () => {
        filterIcon?.removeEventListener('click', showFilter);
      };
    }
  }, []);

  // Locale menu handler
  React.useEffect(() => {
    if (window !== undefined) {
      function clickedOutsideLocaleMenu(e: Event) {
        const localeMenuWrapper = document.querySelector('#nav-locale-wrapper');
        const localeMenu = document.querySelector('#locale-menu');
        const localeNav = document.querySelector('#nav-locale');
        if (!localeNav?.contains(e.target as HTMLElement)) {
          if (!localeMenu?.classList.contains('hidden')) {
            localeMenu?.classList.add('hidden');
          }
          // To remove menu hover effect while user clicks out off visible locale menu
          if (localeMenuWrapper?.classList.contains('bg-stone-100')) {
            localeMenuWrapper.classList.remove('bg-stone-100');
          } else if (localeMenuWrapper?.classList.contains('bg-zinc-800')) {
            localeMenuWrapper.classList.remove('bg-zinc-800');
          }
        }
      }
      document.addEventListener('click', (e) => clickedOutsideLocaleMenu(e));
      return () => document.removeEventListener('click', (e) => clickedOutsideLocaleMenu(e));
    }
  }, []);

  // Theme menu handler
  React.useEffect(() => {
    if (window !== undefined) {
      function clickedOutsideThemeMenu(e: Event) {
        const themeMenuWrapper = document.querySelector('#nav-theme-wrapper');
        const themeMenu = document.querySelector('#theme-menu');
        const themeNav = document.querySelector('#nav-theme');
        if (!themeNav?.contains(e.target as HTMLElement)) {
          if (!themeMenu?.classList.contains('hidden')) {
            themeMenu?.classList.add('hidden');
          }
          // To remove menu hover effect while user clicks off visible theme menu
          if (themeMenuWrapper?.classList.contains('bg-stone-100')) {
            themeMenuWrapper?.classList.remove('bg-stone-100');
          } else if (themeMenuWrapper?.classList.contains('bg-zinc-800')) {
            themeMenuWrapper?.classList.remove('bg-zinc-800');
          }
        }
      }
      document.addEventListener('click', (e) => clickedOutsideThemeMenu(e));
      return () => document.removeEventListener('click', (e) => clickedOutsideThemeMenu(e));
    }
  }, []);

  // Dots menu handler
  function clickedOutsideDotsMenu(e: Event) {
    const dotsMenu = document.querySelector('#dots-menu');
    const dotsMenuNav = document.querySelector('#nav-dots');
    if (!dotsMenuNav?.contains(e.target as HTMLElement)) {
      if (!dotsMenu?.classList.contains('hidden')) {
        dotsMenu?.classList.add('hidden');
      }
    }
  }
  React.useEffect(() => {
    if (window !== undefined) {
      document.addEventListener('click', (e) => clickedOutsideDotsMenu(e));
      return () => document.removeEventListener('click', (e) => clickedOutsideDotsMenu(e));
    }
  }, []);

  // Update blog locale when user click language switcher
  const handleLanguageChange = (lang: 'pl' | 'en') => {
    dispatch({ type: ReducerActionType.SET_LOCALE, payload: lang });
    i18n.changeLanguage(lang);
  };

  // Update blog locale state when user changes locale manually by typing URL
  const activeLocale = useActiveLocalePath('pl') ? 'pl' : 'en';
  React.useEffect(() => {
    handleLanguageChange(activeLocale);
  }, [activeLocale]);

  const handleLocaleClick = () => {
    const isDark: boolean = document.documentElement.classList.contains('dark');
    const menuHoverClass = classNames({ 'bg-stone-100': !isDark, 'bg-zinc-800': isDark });

    const localeMenuWrapper = document.querySelector('#nav-locale-wrapper');
    const localeMenu = document.querySelector('#locale-menu');
    localeMenu?.classList.toggle('hidden');
    // To persist hover effect when user hover off yet visible locale menu
    localeMenuWrapper?.classList.toggle(menuHoverClass);
  };

  const handleThemeChange = (theme: string) => {
    // Check system preferences
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Update blog state
    dispatch({ type: ReducerActionType.TOGGLE_THEME, payload: theme });
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Update theme when user change system color scheme
  const updateTheme = (e: MediaQueryListEvent) => {
    if (e.matches && blogState.theme === 'system') {
      // If theme in system preferences is choosen to be dark and blog user selects system preferences
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleThemeToggleClick = () => {
    // TO:DO: Persist hover state while user hovers off the visible menu area
    // const isDark: boolean = document.documentElement.classList.contains('dark');
    // const toggleStyle = { light: 'bg-stone-100', dark: 'bg-zinc-800' };
    // const menuHoverClass = classNames({ 'bg-stone-100': !isDark, 'bg-zinc-800': isDark });
    // const themeMenuWrapper = document.querySelector('#nav-theme-wrapper');
    const themeMenu = document.querySelector('#theme-menu');
    themeMenu?.classList.toggle('hidden');

    // To persist hover effect when user hover off yet visible locale menu
    // themeMenuWrapper?.classList.toggle(menuHoverClass);
  };

  React.useEffect(() => {
    if (window !== undefined) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => updateTheme(e));
    }
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', (e) => updateTheme(e));
  }, []);

  const localeStyles = {
    base: 'flex flex-nowrap items-baseline px-2 dark:text-white',
    active: 'bg-stone-200 dark:bg-zinc-800 rounded text-stone-500 dark:text-zinc-400',
  };
  const localeListElementClass = classNames.bind(localeStyles);
  const themeToggleClass = classNames.bind({ base: 'dark:text-white hover:underline hover:cursor-pointer', active: 'text-stone-500 dark:text-zinc-400 hover:no-underline hover:cursor-auto' });

  const lokaleURLPL = useLocation().pathname.replace(/^\//, useLocation().pathname === '/' ? '/pl' : '/pl/');
  const lokaleURLGB = useLocation().pathname.replace(/^\/pl(?:\/|$)/, `/`);

  // Check currently set theme mode and return respective color
  interface ThemeColors {
    dark?: string
    light?: string
  }

  const handleDotsMenuClick = () => {
    const isDark: boolean = document.documentElement.classList.contains('dark');
    const menuHoverClass = classNames({ 'bg-stone-100': !isDark, 'bg-zinc-800': isDark });

    const localeDotsMenuWrapper = document.querySelector('#nav-dots-menu-wrapper');
    const dotsMenu = document.querySelector('#dots-menu');
    dotsMenu?.classList.toggle('hidden');
    // To persist hover effect when user hover off yet visible locale menu
    localeDotsMenuWrapper?.classList.toggle(menuHoverClass);
  };

  const setElementThemeColor = ({ dark = '#FFF', light = '#231F20' }: ThemeColors) => (document.documentElement.classList.contains('dark') ? dark : light);
  return (
    <nav>
      <div className="flex items-center justify-between mx-4 xl:mx-1 h-22.5 md:h-20 lg:h-22.5">
        {/* <div className={!visible ? 'sm:flex-none' : 'hidden'}> */}
        <div className='sm:flex-none'>
          <Link to={useLocale()}>
            <div className="hidden sm:block mr-10 w-29 lg:w-42">
              <LogoHorizontal textColor={setElementThemeColor({})} />
            </div>
            <div className="block sm:hidden mr-10 w-19">
              <LogoVertical textColor={setElementThemeColor({})} />
            </div>
          </Link>
        </div>
        <div className="flex flex-[2_1] flex-nowrap justify-center items-center mr-8 lg:mx-auto">

          {/* <div>
          // TO:DO: Search functionality MUST! be implemented if blog contains more than 10 posts!!!
            <SearchBar handleVisibility={setVisible} />
          </div> */}
          {/* <div className="ml-4 sm:ml-8 xl:ml-11"> */}
          <div className='w-11 h-11 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800'>
            <div className='w-7 h-7 mx-auto my-2 shadow-md rounded-full'>
              { blogState.filterOn
                ? (
                  <div id="filter-on" className="relative">
                    <BsFilterCircleFill className="w-7 h-7" color={setElementThemeColor({ light: '#000' })} onClick={() => showFilter()} />
                    <span className="absolute -top-1 left-4 w-5 h-5 py-0.5 bg-cube-like rounded-full text-xs text-white align-middle text-center">
                      { Object.keys(blogState.tags).length }
                    </span>
                  </div>
                )
                : <BsFilterCircle className="w-7 h-7" onClick={() => showFilter()} color={setElementThemeColor({ light: '#000' })} />}
            </div>

          </div>
          {
            blogState.filterOn
            && <div className="ml-5 font-medium underline cursor-pointer dark:text-white" onClick={() => clearFilter()}>{t('filter.clear_filter')}</div>
          }
        </div>
        <div className="hidden md:flex md:flex-nowrap self-center items-end justify-around w-48">
          <div id='nav-theme-wrapper' className='w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800'>
            <div id='nav-theme' className='relative' onClick={() => handleThemeToggleClick()}>
              {blogState.theme === 'light' && <BsSun size={20} className='mx-auto mt-2.5' color={setElementThemeColor({ light: '#000' })} />}
              {blogState.theme === 'dark' && <BsMoonStars size={20} className='mx-auto mt-2.5' color={setElementThemeColor({ light: '#000' })} />}
              {blogState.theme === 'system' && <BsTv size={20} className='mx-auto mt-2.5' color={setElementThemeColor({ light: '#000' })} />}
              {/* <BsSun size={20} className='mx-auto mt-2.5' color={setElementThemeColor({ light: '#000' })} /> */}
              <div id='theme-menu' className='hidden absolute -left-6 top-9 min-w-min min-h-max px-1 py-2 z-10 bg-white dark:bg-slate-700 shadow-md text-sm rounded-md border dark:border-slate-500'>
                <ul className='leading-7'>
                  <li
                    className={localeListElementClass('base', { active: blogState.theme === 'light' })}
                    onClick={() => handleThemeChange('light')}
                  >
                    <div className='w-4 h-4 mr-2 self-center'>
                      <BsSun size={16} color={setElementThemeColor({ light: '#000' })} />
                    </div>
                    <span className={themeToggleClass('base', { active: blogState.theme === 'light' })}>{t('theme.light')}</span>
                  </li>
                  <li
                    className={localeListElementClass('base', { active: blogState.theme === 'dark' })}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <div className='w-4 h-4 mr-2 self-center'>
                      <BsMoonStars size={16} color={setElementThemeColor({ light: '#000' })} />
                    </div>
                    <span className={themeToggleClass('base', { active: blogState.theme === 'dark' })}>{t('theme.dark')}</span>
                  </li>
                  <li
                    className={localeListElementClass('base', { active: blogState.theme === 'system' })}
                    onClick={() => handleThemeChange('system')}
                  >
                    <div className='w-4 h-4 mr-2  self-center'>
                      <BsTv size={16} color={setElementThemeColor({ light: '#000' })} />
                    </div>
                    <span className={themeToggleClass('base', { active: blogState.theme === 'system' })}>{t('theme.system')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id='nav-locale-wrapper' className='w-14 h-10 rounded-3xl hover:bg-stone-100 dark:hover:bg-zinc-800'>
            <div id="nav-locale" className="relative mt-2.5" onClick={() => handleLocaleClick()}>
              {/* <BsGlobe2 size={20} /> */}
              <LocaleIcon locale={blogState.locale} color={setElementThemeColor({ light: '#000' })} />
              <div id="locale-menu" className="hidden absolute -left-6 top-9  min-w-min min-h-max px-1 py-2 z-10 bg-white dark:bg-slate-700 shadow-md text-sm rounded-md border dark:border-slate-500">
                <ul className="leading-7">
                  <li onClick={() => handleLanguageChange('en')} className={localeListElementClass('base', { active: blogState.locale === 'en' })}>
                    <div className="w-4 h-3 mr-2 rounded-sm"><LocaleIconGB /></div>
                    { useActiveLocalePath('pl')
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
                      !useActiveLocalePath('pl')
                        ? <Link to={lokaleURLPL} hrefLang="pl" className="hover:underline">Polski</Link>
                        : 'Polski'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-10 h-10 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full'>
            <div className='w-4 h-4 mr-2 self-center'>
              <BsGithub size={20} className='mx-auto mt-2.5' color={setElementThemeColor({ light: '#000' })} />
            </div>
          </div>
        </div>
        <div id='nav-dots-menu-wrapper' className="block w-12 h-12 mr-auto ml-auto rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800 md:hidden">
          <div id='nav-dots' className='relative mt-2.5' onClick={() => handleDotsMenuClick()}>
            <BsThreeDotsVertical size={28} color={setElementThemeColor({ light: '#000' })} className='mx-auto' />
            <div id='dots-menu' className='hidden absolute top-8 mt-3 px-4 py-2 text-sm dark:text-white bg-white dark:bg-slate-700 right-2 border dark:border-slate-500 rounded-md shadow-md min-w-max z-10'>
              <ul className='leading-7'>
                <li className='font-medium text-md border-b dark:border-b-slate-500 leading-6 mt-2 mb-1'>{t('dots_menu.theme')}</li>
                <ul>
                  <li
                    className={localeListElementClass('base', { active: blogState.theme === 'light' })}
                    onClick={() => handleThemeChange('light')}
                  >
                    <div className='w-4 h-4 mr-2 self-center'>
                      <BsSun size={16} color={setElementThemeColor({ light: '#000' })} />
                    </div>
                    <span className={themeToggleClass('base', { active: blogState.theme === 'light' })}>{t('theme.light')}</span>
                  </li>
                  <li
                    className={localeListElementClass('base', { active: blogState.theme === 'dark' })}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <div className='w-4 h-4 mr-2 self-center'>
                      <BsMoonStars size={16} color={setElementThemeColor({ light: '#000' })} />
                    </div>
                    <span className={themeToggleClass('base', { active: blogState.theme === 'dark' })}>{t('theme.dark')}</span>
                  </li>
                  <li
                    className={localeListElementClass('base', { active: blogState.theme === 'system' })}
                    onClick={() => handleThemeChange('system')}
                  >
                    <div className='w-4 h-4 mr-2 self-center'>
                      <BsTv size={16} color={setElementThemeColor({ light: '#000' })} />
                    </div>
                    <span className={themeToggleClass('base', { active: blogState.theme === 'system' })}>{t('theme.system')}</span>
                  </li>
                </ul>
                <li className='font-medium text-md border-b dark:border-b-slate-500 leading-6 mt-2 mb-1'>{t('dots_menu.language')}</li>
                <ul>
                  <li onClick={() => handleLanguageChange('en')} className={localeListElementClass('base', { active: blogState.locale === 'en' })}>
                    <div className="w-4 h-3 mr-2 rounded-sm"><LocaleIconGB /></div>
                    { useActiveLocalePath('pl')
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
                      !useActiveLocalePath('pl')
                        ? <Link to={lokaleURLPL} hrefLang="pl" className="hover:underline">Polski</Link>
                        : 'Polski'
                    }
                  </li>
                </ul>
                <li className='font-medium leading-5 mt-2 hover:underline cursor-pointer'>{t('dots_menu.github')}</li>
                <li className='font-medium leading-5 mt-2 hover:underline cursor-pointer'>{t('dots_menu.author')}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-end rounded-full border-4 dark:border-gray-700 drop-shadow-2xl">
          <Link to={useActiveLocalePath('pl') ? '/pl/about' : '/about'}>
            <StaticImage
              src="./../../images/about-face.png"
              alt="Funny drawing showing face of the author of this blog"
              // layout="fullWidth"
              objectFit='scale-down'
              // objectPosition='top'
              width={25}
              height={37}
              className="hidden md:block md:w-9 md:h-9 lg:w-12 lg:h-12 p-0 border bg-[#FEF7E4] dark:bg-[#482E22] border-gray-400 dark:border-gray-500 rounded-full "
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
