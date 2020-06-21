/*
 *
 * MyChannel reducer
 *
 */

import { UPDATE_DATA, UPDATE_IN_PROCESS, UPDATE_CONVERSATION } from './constants';

export const initialState = { messageData: {}, inProcess: true, conversionDataById: {} };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        messageData: action.messageData
      };
    case UPDATE_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_CONVERSATION:
      return {
        ...state,
        conversionDataById: action.conversionDataById
      };
    default:
      return state;
  }
}
