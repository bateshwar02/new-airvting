/* eslint-disable consistent-return */
import { UPDATE_IN_PROCESS, SUBMIT_ACTION } from './constants';

export const initialState = { inProcess: false, isSubmittedForm: false };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess,
      };
    case SUBMIT_ACTION:
      return {
        ...state,
        isSubmittedForm: action.isSubmittedForm,
      };

    default:
      return state;
  }
}
