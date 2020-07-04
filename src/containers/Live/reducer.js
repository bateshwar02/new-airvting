/*
 *
 * Live reducer
 *
 */

import { UPDATE_IN_PROCESS, UPDATE_CATEGORY_OPTION, UPDATE_POST_ACTION } from './constants';

export const initialState = { inProcess: false, catOption: [], isAddPost: true };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_CATEGORY_OPTION:
      return {
        ...state,
        catOption: action.catOption
      };
    case UPDATE_POST_ACTION:
      return {
        ...state,
        isAddPost: action.isAddPost
      };

    default:
      return state;
  }
}
