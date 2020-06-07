/*
 *
 * Live actions
 *
 */

import { UPDATE_USER_DATA, UPDATE_PASSWORD, IS_PROCESS_ACTION } from './constants';

export function updateUser(userData, id) {
  return {
    type: UPDATE_USER_DATA,
    userData,
    id
  };
}

export function updateInProcess({ inProcess }) {
  return {
    type: IS_PROCESS_ACTION,
    inProcess,
  };
}

export function updatePassword(passData, id) {
  return {
    type: UPDATE_PASSWORD,
    passData,
    id
  };
}
