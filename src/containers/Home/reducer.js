/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import {
  USER_DATA, Is_PROCESS_ACTION, UPDATE_CATEGORY_DATA, IS_SHARE, SHARE_URL, UPDATE_SEARCH_DATA, UPDATE_CURRENT_POST, UPDATE_SEARCH, UPDATE_SEARCH_VALUE
} from './constatnt';

// The initial state of the App
export const initialState = {
  categoryData: [], inProcess: false, isShare: false, url: '', searchData: {}, currentPost: {}, isSearch: false, searchValue: '',
};

/* eslint-disable default-case, no-param-reassign */

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state
      };
    case Is_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_CURRENT_POST:
      return {
        ...state,
        currentPost: action.currentPost
      };
    case UPDATE_CATEGORY_DATA:
      return {
        ...state,
        categoryData: action.categoryData,
        inProcess: action.inProcess
      };
    case IS_SHARE:
      return {
        ...state,
        isShare: action.isShare
      };
    case SHARE_URL:
      return {
        ...state,
        url: action.url
      };
    case UPDATE_SEARCH_DATA:
      return {
        ...state,
        searchData: action.searchData,
        searchValue: action.searchValue,
        isSearch: action.isSearch
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        isSearch: action.isSearch
      };
    case UPDATE_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue
      };
    default:
      return state;
  }
}
