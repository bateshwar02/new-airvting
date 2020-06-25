/*
 *
 * Store reducer
 *
 */

import {
  UPDATE_TOKEN, UPDATE_IN_PROCESS_ACTION, TRANSICTION_UPDATE, GIFT_UPDATE
} from './constants';

export const initialState = {
  myToken: {}, inProcess: true, myGift: {}, transictionsData: {}
};

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        myToken: action.myToken
      };
    case UPDATE_IN_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case TRANSICTION_UPDATE:
      return {
        ...state,
        transictionsData: action.transictionsData
      };
    case GIFT_UPDATE:
      return {
        ...state,
        myGift: action.myGift
      };
    default:
      return state;
  }
}
