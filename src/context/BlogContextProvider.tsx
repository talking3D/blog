import * as React from 'react';

export interface Tag {
  [index: string]: string;
}

export interface BlogState {
  tags: Tag,
  filterOn: boolean
}


export enum ReducerActionType {
  ADD_TAG,
  REMOVE_TAG,
  CLEAR_FILTER,
};


export type ClearFilterAction = {
  type: ReducerActionType.CLEAR_FILTER
};

export type AddOrRemoveTag = {
  type: ReducerActionType.ADD_TAG | ReducerActionType.REMOVE_TAG,
  payload: Tag
};

export type ReducerAction = AddOrRemoveTag | ClearFilterAction;


const defaultState: BlogState = {
  tags: {},
  filterOn: false,
};

interface ContextProps {
  children?: React.FC<React.ReactNode>
}

const BlogStateContext = React.createContext<BlogState>(defaultState);
const BlogDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

const reducer = (state: BlogState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.ADD_TAG:
      return {
        ...state, tags: { ...state.tags, ...action.payload }};
    case ReducerActionType.REMOVE_TAG:
      const key = Object.keys(action.payload)[0]
      const {[key]: _, ...rest} = state.tags;
      return { ...state, tags: rest};
    case ReducerActionType.CLEAR_FILTER:
        return { ...state, tags: {}};
    default:
      throw new Error();
  }
}

const BlogContextProvider = ({children}: ContextProps) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
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