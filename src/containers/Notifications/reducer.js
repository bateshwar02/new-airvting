/*
 *
 * MyChannel reducer
 *
 */

import {
  UPDATE_DATA, UPDATE_IN_PROCESS, UPDATE_CONVERSATION, IS_ADD_MESSAGE, ADD_MESSAGE_ACTION
} from './constants';

export const initialState = {
  messageData: {}, inProcess: true, conversionDataById: {}, isAddMessage: false, actionInProcess: false
};

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
    case IS_ADD_MESSAGE:
      return {
        ...state,
        isAddMessage: action.isAddMessage
      };
    case ADD_MESSAGE_ACTION:
      return {
        ...state,
        actionInProcess: action.actionInProcess
      };
    default:
      return state;
  }
}
