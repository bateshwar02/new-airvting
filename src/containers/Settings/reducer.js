/*
 *
 * Live reducer
 *
 */

import { IS_PROCESS_ACTION, UPDATE_GIFT, UPDATE_VERIFY_MSG } from './constants';

export const initialState = { inProcess: false, gift: {}, emailVerifyMsg: '' };
/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case IS_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_GIFT:
      return {
        ...state,
        gift: action.gift
      };
    case UPDATE_VERIFY_MSG:
      return {
        ...state,
        emailVerifyMsg: action.emailVerifyMsg
      };
    default:
      return state;
  }
}
