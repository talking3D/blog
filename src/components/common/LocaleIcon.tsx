// icons from: https://github.com/lipis/flag-icons

import * as React from 'react';
import { BsGlobe2 } from 'react-icons/bs';
import classNames from 'classnames';

export interface LocaleIconProps {
  locale: 'en' | 'pl',
  color?: string
}

// eslint-disable-next-line react/prop-types
export const LocaleIconPL = ({ long = false }) => {
  let viewBox;
  if (long) {
    viewBox = `0 0 640 480`;
  } else {
    viewBox = `0 0 512 512`;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-pl" viewBox={viewBox}>
      <g fillRule="evenodd">
        <path fill="#fff" d="M512 512H0V0h512z" />
        <path fill="#dc143c" d="M512 512H0V256h512z" />
      </g>
    </svg>
  );
};

// eslint-disable-next-line react/prop-types
export const LocaleIconGB = ({ long = false }) => {
  let viewBox;
  if (long) {
    viewBox = `0 0 640 480`;
  } else {
    viewBox = `0 0 512 512`;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox={viewBox}>
      <path fill="#012169" d="M0 0h512v512H0z" />
      <path fill="#FFF" d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z" />
      <path fill="#C8102E" d="m184 324 11 34L42 512H0v-3l184-185zm124-12 54 8 150 147v45L308 312zM512 0 320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z" />
      <path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
      <path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
    </svg>
  );
};

const LocaleIcon = ({ locale, color }: LocaleIconProps) => {
  const localeIconClass = classNames('absolute -top-2 left-3 w-5 h-5 rounded-full overflow-clip border', { 'border-[#231F20]': color === '#FFF', 'border-black': color === '#000' });
  return (
    <div className="relative ml-3">
      {/* <div className="absolute -top-2 left-3 w-5 h-5 rounded-full overflow-clip border"> */}
      <div className={localeIconClass}>
        { locale === 'pl' ? <LocaleIconPL /> : <LocaleIconGB />}
      </div>
      <BsGlobe2 size={20} color={color} />
    </div>
  );
};

export default LocaleIcon;
