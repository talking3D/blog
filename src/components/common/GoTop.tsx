import * as React from 'react';
import { BsChevronUp } from 'react-icons/bs';

/* TO:DO: develop more responsive version - button visibility should depend on scroll position
and scroll direction (up or down) */
// import useScrollPosition from '../hooks/useScrollPosition';

const GoToTop = () => {
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleButtonVisibility = () => {
    const scroll = window.scrollY;
    const button = document.querySelector('#button');
    const isHidden = button?.classList.contains('hidden');
    if (scroll > 100 && isHidden) {
      button?.classList.remove('hidden');
    } else if (scroll <= 100 && !isHidden) {
      button?.classList.add('hidden');
    }
  };
  React.useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('scroll', toggleButtonVisibility);
      return () => window.removeEventListener('scroll', toggleButtonVisibility);
    }
  });

  return (
    <div className='fixed bottom-8 block mx-auto w-screen max-w-screen-xl'>
      <div
        id='button'
        className='ml-auto mr-4 w-12 h-12 pt-2.5 rounded-full border-2 border-stone-400 dark:border-slate-200 bg-stone-100 dark:bg-slate-700 shadow-md opacity-50 hover:opacity-100 cursor-pointer transition-opacity ease-linear'
        onClick={() => handleButtonClick()}
      >
        <BsChevronUp
          size={24}
          className='mx-auto text-stone-400 dark:text-slate-200'
        />
      </div>
    </div>
  );
};

export default GoToTop;
