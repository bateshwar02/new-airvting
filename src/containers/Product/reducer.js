/*
 *
 * Featured reducer
 *
 */
import { UPDATE_ACTION, IS_PROCESS_ACTION, UPDATE_PRODUCT_CATEGORY_OPTION } from './constants';

export const initialState = { categoryOption: [], inProcess: false };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTION:
      return {
        ...state,
        featuredData: action.featuredData,
        inProcess: action.inProcess,
      };
    case IS_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_PRODUCT_CATEGORY_OPTION:
      return {
        ...state,
        categoryOption: action.categoryOption
      };
    default:
      return state;
  }
}
