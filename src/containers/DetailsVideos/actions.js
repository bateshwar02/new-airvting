/*
 *
 * DetailsVideos actions
 *
 */

import {
  ADD_COMMENT, GET_COMMENT, GET_VIDEO_DETAILS, UPDATE_VIDEO_DATA, Is_PROCESS_ACTION, UPDATE_COMMENT, FOLLOW_ACTION, ADD_COMMENT_ACTION_IN_PROCESS, FOLLOW_IN_PROCESS, MY_GIFT_UPDATE, STORE_GIFT_UPDATE, MY_GIFT, STORE_GIFT, UPDATE_STORE_PROCCESS, LIKE_ACTION_POST, ADD_COMMENT_DATA
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

export function updateStoreGift(storGift) {
  return {
    type: STORE_GIFT_UPDATE,
    storGift
  };
}

export function updateMyGift(myGift) {
  return {
    type: MY_GIFT_UPDATE,
    myGift
  };
}

export function storeGiftData() {
  return {
    type: STORE_GIFT,
  };
}

export function myGiftData() {
  return {
    type: MY_GIFT,
  };
}

export function updateStoreProcess(storeProccess) {
  return {
    type: UPDATE_STORE_PROCCESS,
    storeProccess
  };
}

export function likeAction(post_id) {
  return {
    type: LIKE_ACTION_POST,
    post_id
  };
}

export function updateAddedCommentData(addedComment) {
  return {
    type: ADD_COMMENT_DATA,
    addedComment
  };
}
