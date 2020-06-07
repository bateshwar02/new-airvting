/*
 *
 * Login reducer
 *
 */
import { UPDATE_ACTION, PROCESS_ACTION } from './constants';

export const initialState = { action: 1, inProcess: false };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTION:
      return {
        ...state,
        action: action.action
      };
    case PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    default:
      return state;
  }
}
