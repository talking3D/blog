import * as React from 'react';

export interface Tag {
  [index: string]: string;
}

export interface BlogState {
  tags: Tag,
  filterOn: boolean,
  filterVisible: boolean,
  locale: 'en' | 'pl',
}


export enum ReducerActionType {
  UPDATE_FILTER,
  CLEAR_FILTER,
  APPLY_FILTER,
  TOGGLE_FILTER,
  SET_LOCALE,
};


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

export type ReducerAction = UpdateFilterAction | ClearFilterAction | ApplyFilterAction | ToggleFilterVisibilityAction | SetLocaleLanguage;


const checkLocalStorageAvailability = () => {
  let storage;
  try {
    storage = window['localStorage'];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) 
      // acknowledge QuotaExceededError only if there's something already stored
    && (storage && storage.length);
  }
}

const defaultState: BlogState = {
  tags: {},
  filterOn: false,
  filterVisible: false,
  locale: 'en'
};

interface ContextProps {
  children?: React.FC<React.ReactNode>
}

const BlogStateContext = React.createContext<BlogState>(defaultState);
const BlogDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

const reducer = (state: BlogState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.UPDATE_FILTER:
      return { ...state, tags: action.payload};
    case ReducerActionType.CLEAR_FILTER:
        return { ...state, tags: {}, filterOn: false};
    case ReducerActionType.APPLY_FILTER:
      return { ...state, filterOn: true};
    case ReducerActionType.TOGGLE_FILTER:
      return { ...state, filterVisible: action.payload };
    case ReducerActionType.SET_LOCALE:
      console.log(action.payload);
      localStorage.setItem('locale', action.payload)
      return {...state, locale: action.payload}
    default:
      throw new Error('This operation is not available!');
  }
}

const BlogContextProvider = ({children}: ContextProps) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  // const [locale, setLocale] = React.useState<string>();

  React.useEffect(() => {
    if (window !== undefined) {
      if (checkLocalStorageAvailability()) {
        const lang = localStorage.getItem('locale');
        console.log('lang: ', lang);
        if (!!lang) {
          // setLocale(lang);
          dispatch({type: ReducerActionType.SET_LOCALE, payload: lang as 'pl' | 'en'})
        } else {
          localStorage.setItem('locale', defaultState.locale);
        }
      }
    }
  }, [])

  return (
    <BlogStateContext.Provider value={state}>
      <BlogDispatchContext.Provider value={dispatch}>
        { children }
      </BlogDispatchContext.Provider>
    </BlogStateContext.Provider>
  )
};

export default BlogContextProvider;

export { BlogStateContext, BlogDispatchContext };