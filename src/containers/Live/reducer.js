/*
 *
 * Live reducer
 *
 */

import {
  UPDATE_IN_PROCESS, UPDATE_CATEGORY_OPTION, UPDATE_POST_ACTION, UPDATE_POST_DATA, UPDATE_PRODUCT_OPTION
} from './constants';

export const initialState = {
  inProcess: false, catOption: [], isAddPost: true, postData: {}, porductData: []
};

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

    case UPDATE_POST_DATA:
      return {
        ...state,
        postData: action.postData
      };
    case UPDATE_PRODUCT_OPTION:
      return {
        ...state,
        porductData: action.porductData
      };

    default:
      return state;
  }
}
