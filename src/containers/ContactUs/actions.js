/* eslint-disable import/prefer-default-export */
import { CONTACT_US, UPDATE_IN_PROCESS, SUBMIT_ACTION } from './constants';

export function contactUs(data) {
  return {
    type: CONTACT_US,
    data,
  };
}

export function updateInProcess(inProcess) {
  return {
    type: UPDATE_IN_PROCESS,
    inProcess
  };
}
export function submitAction(isSubmittedForm) {
  return {
    type: SUBMIT_ACTION,
    isSubmittedForm
  };
}
