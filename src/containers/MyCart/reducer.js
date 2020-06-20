/*
 *
 * Store reducer
 *
 */

import { UPDATE_CART, UPDATE_IN_PROCESS } from './constants';

export const initialState = { cartData: {}, inProcess: true, };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        cartData: action.cartData
      };
    case UPDATE_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess
      };
    default:
      return state;
  }
}
