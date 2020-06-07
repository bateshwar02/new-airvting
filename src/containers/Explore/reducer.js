/*
 *
 * Explore reducer
 *
 */

import {
  UPDATE_DATA, IN_PROCESS_ACTION, tabMenu, UPDATE_FILTER
} from './constants';

export const initialState = {
  exploreData: {}, filter: 'hot', inProcess: true, tabMenu
};

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        inProcess: action.inProcess,
        exploreData: action.exploreData
      };
    case IN_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}
