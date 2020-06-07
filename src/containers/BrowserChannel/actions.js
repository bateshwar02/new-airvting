/*
 *
 * Followers actions
 *
 */

import {
  GET_USER_DATA_BY_ID, GET_POST_DATA_BY_ID, Is_PROCESS_ACTION, UPDATE_USER_POST_DATA, UPDATE_USER_DATA, BOOKMARK_ACTION
} from './constants';

export function updateUserData({ channelUserData, inProcess = false }) {
  return {
    type: UPDATE_USER_DATA,
    channelUserData,
    inProcess
  };
}

export function updatePostData({ postDataByUser, inProcess = false }) {
  return {
    type: UPDATE_USER_POST_DATA,
    postDataByUser,
    inProcess
  };
}

export function getUserDataById(id) {
  return {
    type: GET_USER_DATA_BY_ID,
    id
  };
}

export function updateInProcess(data) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess: data,
  };
}

export function getPostDataByUserId(id) {
  return {
    type: GET_POST_DATA_BY_ID,
    id,
  };
}

export function bookMarkAction({ id }) {
  return {
    type: BOOKMARK_ACTION,
    id,
  };
}
