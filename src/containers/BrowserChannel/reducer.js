/*
 *
 * Followers reducer
 *
 */
import { UPDATE_USER_DATA, Is_PROCESS_ACTION, UPDATE_USER_POST_DATA } from './constants';

export const initialState = { channelUserData: {}, postDataByUser: {}, inProcess: true };

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        channelUserData: action.channelUserData,
        inProcess: action.inProcess,
      };
    case UPDATE_USER_POST_DATA:
      return {
        ...state,
        postDataByUser: action.postDataByUser,
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
