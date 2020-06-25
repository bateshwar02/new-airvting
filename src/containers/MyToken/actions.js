/*
 *
 * Store actions
 *
 */

import {
  UPDATE_TOKEN, UPDATE_IN_PROCESS_ACTION, GET_TOKEN, TRANSICTION_UPDATE, GET_TRANSICTION, GET_GIFT, GIFT_UPDATE
} from './constants';

export function updateToken(myToken) {
  return {
    type: UPDATE_TOKEN,
    myToken
  };
}

export function updateInProcess(inProcess) {
  return {
    type: UPDATE_IN_PROCESS_ACTION,
    inProcess,
  };
}

export function getTokenData() {
  return {
    type: GET_TOKEN,
  };
}

export function updateTransaction(transictionsData) {
  return {
    type: TRANSICTION_UPDATE,
    transictionsData,
  };
}

export function getTransictionsData() {
  return {
    type: GET_TRANSICTION,
  };
}

export function getGiftData() {
  return {
    type: GET_GIFT,
  };
}

export function updateGift(myGift) {
  return {
    type: GIFT_UPDATE,
    myGift
  };
}
