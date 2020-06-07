/*
 *
 * Following reducer
 *
 */
import { UPDATE_ACTION, Is_PROCESS_ACTION } from './constants';

export const initialState = { followingData: [], inProcess: true };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTION:
      return {
        ...state,
        followingData: action.followingData,
        inProcess: action.inProcess,
      };
    case Is_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    default:
      return state;
  }
}
