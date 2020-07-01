/* eslint-disable consistent-return */
import { UPDATE_IN_PROCESS } from './constants';

export const initialState = { inProcess: false };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess,
      };
    default:
      return state;
  }
}
