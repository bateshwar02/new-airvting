/*
 *
 * DetailsVideos reducer
 *
 */

// import { DEFAULT_ACTION } from './constants';

import {
  UPDATE_VIDEO_DATA, Is_PROCESS_ACTION, UPDATE_COMMENT, ADD_COMMENT_ACTION_IN_PROCESS, FOLLOW_IN_PROCESS
} from './constants';

export const initialState = {
  videoData: {}, inProcess: true, commentData: {}, actionInProcess: false, fallowInProcess: false
};
/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VIDEO_DATA:
      return {
        ...state,
        videoData: action.videoData,
        inProcess: action.inProcess,
      };
    case Is_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        commentData: action.commentData
      };
    case ADD_COMMENT_ACTION_IN_PROCESS:
      return {
        ...state,
        actionInProcess: action.actionInProcess
      };
    case FOLLOW_IN_PROCESS:
      return {
        ...state,
        fallowInProcess: action.fallowInProcess
      };
    default:
      return state;
  }
}
