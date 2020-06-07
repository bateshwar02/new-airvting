/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION, UPDATE_ACTION, SIGNUP, SIGNIN, PROCESS_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateActions({ action }) {
  return {
    type: UPDATE_ACTION,
    action,
  };
}

export function signUp(formData) {
  return {
    type: SIGNUP,
    formData,
  };
}

export function signIn(formData, setIsRedirect) {
  return {
    type: SIGNIN,
    formData,
    setIsRedirect,
  };
}

export function updateProcessAction(data) {
  return {
    type: PROCESS_ACTION,
    inProcess: data,
  };
}
