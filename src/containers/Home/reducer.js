/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { USER_DATA, Is_PROCESS_ACTION, UPDATE_CATEGORY_DATA } from './constatnt';

// The initial state of the App
export const initialState = { categoryData: [], inProcess: false };

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
    case UPDATE_CATEGORY_DATA:
      return {
        ...state,
        categoryData: action.categoryData,
        inProcess: action.inProcess
      };
    default:
      return state;
  }
}
