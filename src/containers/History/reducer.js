/*
 *
 * History reducer
 *
 */

import { UPDATE_ACTION, Is_PROCESS_ACTION, UPDATE_BOOKMARK } from './constants';

export const initialState = { historyData: {}, inProcess: true, bookmarkData: {} };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTION:
      return {
        ...state,
        historyData: action.historyData,
        inProcess: action.inProcess,
      };
    case Is_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_BOOKMARK:
      return {
        ...state,
        bookmarkData: action.bookmarkData
      };
    default:
      return state;
  }
}
