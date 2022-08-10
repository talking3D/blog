/**
 * Inspired by:
 * https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
 * and:
 * https://github.com/n8tb1t/use-scroll-position
 *
 * Hook detects scroll movement and allows to call CB function based on scroll position params
 * @param {Fn} callback function to be invoked on srcoll postion parameters
 * @param {Node} element The DOM element to watch scroll position against
 * @param {Boolean} viewport If set to true hook will retrun scroll position related to viewport
 * @param {Number} wait Miliseconds for callback asynchronous action
 */

import { useEffect, useLayoutEffect, useRef } from 'react';

export interface Position {
   x: number;
   y: number;
 }

export interface CallbackEffectProps {
   prevPos: Position;
   curPos: Position
 }

const useScrollPosition = ({
  callback,
  element,
  viewport,
  wait,
}: {
   callback: (props: CallbackEffectProps) => void,
   element?: HTMLElement,
   viewport: boolean,
   wait?: number
 }) => {
  const getBoundingClientRect = (element: HTMLElement) => element.getBoundingClientRect();
  const getScrollPosition = ({ element, viewport }: {element?: HTMLElement, viewport: boolean}) => {
    const isBrowser = typeof window !== 'undefined';

    if (!isBrowser) {
      return { x: 0, y: 0 };
    }

    if (viewport) {
      return { x: window.scrollX, y: window.scrollY };
    }

    const targetElement = element || document.body;
    const targetElementPosition = getBoundingClientRect(targetElement);
    return {
      x: targetElementPosition.x, y: targetElementPosition.y,
    };
  };
  const position = useRef(getScrollPosition({ element, viewport }));

  const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  const callbackEffect = () => {
    const currentPosition = getScrollPosition({ element, viewport });
    callback({ prevPos: position.current, curPos: currentPosition });
    position.current = currentPosition;
  };

  useIsomorphicEffect(() => {
    const onScroll = () => {
      setTimeout(() => {
        callbackEffect();
      }, wait);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });
};

export default useScrollPosition;
