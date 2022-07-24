import * as React from 'react';

export interface Tag {
  [index: string]: string;
}

export interface BlogState {
  tags: Tag,
  filterOn: boolean,
  filterVisible: boolean,
}


export enum ReducerActionType {
  // ADD_TAG,
  // REMOVE_TAG,
  UPDATE_FILTER,
  CLEAR_FILTER,
  APPLY_FILTER,
  TOGGLE_FILTER,
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

// export type AddOrRemoveTag = {
//   type: ReducerActionType.ADD_TAG | ReducerActionType.REMOVE_TAG,
//   payload: Tag
// };

export type ReducerAction = UpdateFilterAction | ClearFilterAction | ApplyFilterAction | ToggleFilterVisibilityAction;


const defaultState: BlogState = {
  tags: {},
  filterOn: false,
  filterVisible: false,
};

interface ContextProps {
  children?: React.FC<React.ReactNode>
}

const BlogStateContext = React.createContext<BlogState>(defaultState);
const BlogDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

const reducer = (state: BlogState, action: ReducerAction) => {
  switch (action.type) {
    // case ReducerActionType.ADD_TAG:
    //   return {
    //     ...state, tags: { ...state.tags, ...action.payload }};
    // case ReducerActionType.REMOVE_TAG:
    //   const key = Object.keys(action.payload)[0]
    //   const {[key]: _, ...rest} = state.tags;
    //   return { ...state, tags: rest};
    case ReducerActionType.UPDATE_FILTER:
      return { ...state, tags: action.payload};
    case ReducerActionType.CLEAR_FILTER:
        return { ...state, tags: {}, filterOn: false};
    case ReducerActionType.APPLY_FILTER:
      return { ...state, filterOn: true};
    case ReducerActionType.TOGGLE_FILTER:
      return { ...state, filterVisible: action.payload }
    default:
      throw new Error('This operation is not available!');
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