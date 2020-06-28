/*
 *
 * Store actions
 *
 */

import {
  UPDATE_AIR_TOKEN, GET_AIR_TOKEN, UPDATE_ACTION_IN_PROCESS, UPDATE_TAB_MENU, BUY_TOKEN
} from './constants';

export function updateAirToken(aitTokenList) {
  return {
    type: UPDATE_AIR_TOKEN,
    aitTokenList,
  };
}

export function updateInProcess(inProcess) {
  return {
    type: UPDATE_ACTION_IN_PROCESS,
    inProcess,
  };
}

export function getAirToken() {
  return {
    type: GET_AIR_TOKEN,
  };
}

export function updateTabValue(tabValue) {
  return {
    type: UPDATE_TAB_MENU,
    tabValue
  };
}

export function buyAirToken(formData) {
  return {
    type: BUY_TOKEN,
    formData
  };
}
