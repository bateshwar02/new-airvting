/*
 *
 * Seting Action
 *
 */

import {
  UPDATE_USER_DATA, UPDATE_PASSWORD, IS_PROCESS_ACTION, FORGATE_PASSWORD, GET_GIFT, UPDATE_GIFT, VERIFY_EMAIL, UPDATE_VERIFY_MSG
} from './constants';

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

export function forgatePassword(passData) {
  return {
    type: FORGATE_PASSWORD,
    passData,
  };
}

export function verifyEmail(token) {
  return {
    type: VERIFY_EMAIL,
    token
  };
}

export function updateVerifyMsg(emailVerifyMsg) {
  return {
    type: UPDATE_VERIFY_MSG,
    emailVerifyMsg,
  };
}

export function updateGift(gift) {
  return {
    type: UPDATE_GIFT,
    gift,
  };
}

export function getGift() {
  return {
    type: GET_GIFT,
  };
}

