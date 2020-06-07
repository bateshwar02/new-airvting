/*
 *
 * DetailsVideos actions
 *
 */

import {
  ADD_COMMENT, GET_COMMENT, GET_VIDEO_DETAILS, UPDATE_VIDEO_DATA, Is_PROCESS_ACTION, UPDATE_COMMENT, FOLLOW_ACTION, ADD_COMMENT_ACTION_IN_PROCESS, FOLLOW_IN_PROCESS
} from './constants';

export function updateVideoData({ videoData, inProcess = false }) {
  return {
    type: UPDATE_VIDEO_DATA,
    videoData,
    inProcess
  };
}

export function addVideoComment(data, postId) {
  return {
    type: ADD_COMMENT,
    formData: data,
    postId,
  };
}

export function getComment(id) {
  return {
    type: GET_COMMENT,
    id
  };
}

export function getVideoDetails(id) {
  return {
    type: GET_VIDEO_DETAILS,
    id
  };
}

export function updateInProcess(data) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess: data,
  };
}

export function updateCommentData({ commentData }) {
  return {
    type: UPDATE_COMMENT,
    commentData,
  };
}

export function followAction(id) {
  return {
    type: FOLLOW_ACTION,
    id,
  };
}

export function updateActionInProcess(actionInProcess) {
  return {
    type: ADD_COMMENT_ACTION_IN_PROCESS,
    actionInProcess
  };
}

export function updateFallowInProcess(fallowInProcess) {
  return {
    type: FOLLOW_IN_PROCESS,
    fallowInProcess
  };
}
