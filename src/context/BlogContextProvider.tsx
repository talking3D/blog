/* eslint-disable no-unused-vars */
import * as React from 'react';

export interface Tag {
  [index: string]: string;
}

export interface BlogState {
  tags: Tag,
  filterOn: boolean,
  filterVisible: boolean,
  locale: 'en' | 'pl',
  theme: 'light' | 'dark' | 'system'
}

// eslint-disable-next-line no-shadow
export enum ReducerActionType {
  UPDATE_FILTER,
  CLEAR_FILTER,
  APPLY_FILTER,
  TOGGLE_FILTER,
  SET_LOCALE,
  TOGGLE_THEME
}

export type ClearFilterAction = {
  type: ReducerActionType.CLEAR_FILTER
  payload: boolean
};

export type UpdateFilterAction = {
  type: ReducerActionType.UPDATE_FILTER
  payload: Tag
}

export type ApplyFilterAction = {
  type: ReducerActionType.APPLY_FILTER
};

export type ToggleFilterVisibilityAction = {
  type: ReducerActionType.TOGGLE_FILTER
  payload: boolean
};

export type SetLocaleLanguage = {
  type: ReducerActionType.SET_LOCALE
  payload: 'pl' | 'en'
}

export type ToggleThemeAction = {
  type: ReducerActionType.TOGGLE_THEME
  payload: 'light' | 'dark'
}

export type ReducerAction = UpdateFilterAction
                            | ClearFilterAction
                            | ApplyFilterAction
                            | ToggleFilterVisibilityAction
                            | SetLocaleLanguage
                            | ToggleThemeAction

const checkLocalStorageAvailability = () => {
  let storage;
  try {
    storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    )
    // acknowledge QuotaExceededError only if there's something already stored
    && (storage && storage.length);
  }
};

// Set up default blog state values
const defaultState: BlogState = {
  tags: {},
  filterOn: false,
  filterVisible: false,
  locale: 'en',
  theme: 'light',
};

interface ContextProps {
  children?: React.FC<React.ReactNode>
}

// Create contexts
const BlogStateContext = React.createContext<BlogState>(defaultState);
const BlogDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

// Create reducer
const reducer = (state: BlogState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.UPDATE_FILTER:
      return { ...state, tags: action.payload };
    case ReducerActionType.CLEAR_FILTER:
      return { ...state, tags: {}, filterOn: false };
    case ReducerActionType.APPLY_FILTER:
      return { ...state, filterOn: true };
    case ReducerActionType.TOGGLE_FILTER:
      return { ...state, filterVisible: action.payload };
    case ReducerActionType.SET_LOCALE:
      localStorage.setItem('i18nextLng', action.payload);
      return { ...state, locale: action.payload };
    case ReducerActionType.TOGGLE_THEME:
      if (action.payload === 'light') {
        localStorage.setItem('theme', action.payload);
      } else if (action.payload === 'dark') {
        localStorage.setItem('theme', action.payload);
      } else {
        localStorage.removeItem('theme');
      }
      return { ...state, theme: action.payload };
    default:
      throw new Error('This operation is not available!');
  }
};

const BlogContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  // const [locale, setLocale] = React.useState<string>();

  React.useEffect(() => {
    if (window !== undefined) {
      // If localStorage is available (supported)
      if (checkLocalStorageAvailability()) {
        // Check if lang is set up in localStorage
        const lang = localStorage.getItem('i18nextLng');
        if (lang) {
          // set up lang value based on localStorage value
          dispatch({ type: ReducerActionType.SET_LOCALE, payload: lang as 'pl' | 'en' });
        } else {
          // Set up default value for lang
          localStorage.setItem('i18nextLng', defaultState.locale);
        }
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          dispatch({ type: ReducerActionType.TOGGLE_THEME, payload: 'dark' });
          localStorage.removeItem('theme');
        } else {
          document.documentElement.classList.remove('dark');
          dispatch({ type: ReducerActionType.TOGGLE_THEME, payload: 'light' });
          localStorage.setItem('theme', 'light');
        }
      }
    }
  }, []);

  return (
    <BlogStateContext.Provider value={state}>
      <BlogDispatchContext.Provider value={dispatch}>
        { children }
      </BlogDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
};

export default BlogContextProvider;

export { BlogStateContext, BlogDispatchContext };
