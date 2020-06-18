/*
 *
 * Store reducer
 *
 */

import { UPDATE_CARDS, IN_PROCESS, ADD_CARD_IN_PROCESS, IS_ADD_CARD } from './constants';

export const initialState = {isCardAdd: false, cardDetails:{}, inProcess: true, inAddCradProcess: false};

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CARDS: 
    return{
      ...state,
      cardDetails: action.cardDetails
    };
    case IN_PROCESS: 
    return{
      ...state,
      inProcess: action.inProcess
    };
    case ADD_CARD_IN_PROCESS: 
    return{
      ...state,
      inAddCradProcess: action.inAddCradProcess
    };
    case IS_ADD_CARD:
        return{
          ...state,
          isCardAdd: action.isCardAdd
        };
    default:
      return state;
  }
}
