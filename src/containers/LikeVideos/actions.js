/*
 *
 * LikeVideos actions
 *
 */

import {
  UPDATE_ACTION, GET_LIKED_VIDEOS_DATA, BOOKMARK_ACTION, Is_PROCESS_ACTION, UPDATE_VIDEO
} from './constants';

export function updateData({ likeVideosData, inProcess = false }) {
  return {
    type: UPDATE_ACTION,
    likeVideosData,
    inProcess
  };
}

export function getLikedVideosData() {
  return {
    type: GET_LIKED_VIDEOS_DATA,
  };
}

export function bookMarkAction({ id }) {
  return {
    type: BOOKMARK_ACTION,
    id,
  };
}

export function updateInProcess({ inProcess }) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess,
  };
}

export function updateVideosObj(data) {
  return {
    type: UPDATE_VIDEO,
    mediaObj: data,
  };
}
