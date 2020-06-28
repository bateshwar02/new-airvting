/*
 *
 * Store reducer
 *
 */

import {
  UPDATE_AIR_TOKEN, UPDATE_ACTION_IN_PROCESS, tabMenu, UPDATE_TAB_MENU
} from './constants';

export const initialState = {
  aitTokenList: {}, inProcess: false, tabValue: 'product', tabMenu
};

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AIR_TOKEN:
      return {
        ...state,
        aitTokenList: action.aitTokenList
      };
    case UPDATE_ACTION_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_TAB_MENU:
      return {
        ...state,
        tabValue: action.tabValue
      };
    default:
      return state;
  }
}
