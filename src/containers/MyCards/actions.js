/*
 *
 * Store actions
 *
 */

import {
  UPDATE_CARDS, GET_CARDS_DETAILS, ADD_CARDS_DETAILS, IN_PROCESS, ADD_CARD_IN_PROCESS, IS_ADD_CARD, DELETE_CARD, GET_CARD_DETAILS, UPDATE_CARD_DETAILS
} from './constants';

export function updateCards(cardsData) {
  return {
    type: UPDATE_CARDS,
    cardsData,
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

export function isAddCard(isCardAdd) {
  return {
    type: IS_ADD_CARD,
    isCardAdd
  };
}
export function deleteCard(id) {
  return {
    type: DELETE_CARD,
    id
  };
}

export function getCardDetails(id) {
  return {
    type: GET_CARD_DETAILS,
    id
  };
}

export function updateCardDetails(cardDetails) {
  return {
    type: UPDATE_CARD_DETAILS,
    cardDetails
  };
}
