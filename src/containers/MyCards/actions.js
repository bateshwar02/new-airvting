/*
 *
 * Store actions
 *
 */

import { UPDATE_CARDS, GET_CARDS_DETAILS, ADD_CARDS_DETAILS, IN_PROCESS, ADD_CARD_IN_PROCESS, IS_ADD_CARD } from './constants';

export function updateCards(cardDetails) {
  return {
    type: UPDATE_CARDS,
    cardDetails,
  };
}
export function gertCards() {
  return {
    type: GET_CARDS_DETAILS,
  };
}
export function addCards(cardData) {
  return {
    type: ADD_CARDS_DETAILS,
    cardData,
  };
}
export function updateProcessAction(inProcess) {
  return {
    type: IN_PROCESS,
    inProcess,
  };
}
export function updateAddCardsProcessAction(inAddCradProcess) {
  return {
    type: ADD_CARD_IN_PROCESS,
    inAddCradProcess,
  };
}

export function isAddCard (isCardAdd){
  return{
    type:IS_ADD_CARD,
    isCardAdd
  }
}
