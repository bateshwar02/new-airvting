/*
 *
 * Store actions
 *
 */

import {
  UPDATE_CART, UPDATE_IN_PROCESS, GET_CART, REMOVE_CART, GET_TOKEN
} from './constants';

export function updateCart(cartData) {
  return {
    type: UPDATE_CART,
    cartData
  };
}

export function updateProcessAction(inProcess) {
  return {
    type: UPDATE_IN_PROCESS,
    inProcess
  };
}

export function getCart() {
  return {
    type: GET_CART,
  };
}

export function removeCart() {
  return {
    type: REMOVE_CART,
  };
}

export function getToken() {
  return {
    type: GET_TOKEN,
  };
}
