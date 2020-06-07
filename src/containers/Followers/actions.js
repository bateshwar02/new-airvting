/*
 *
 * Followers actions
 *
 */

import { FOLLOWERS_ACTION, UPDATE_ACTION, Is_PROCESS_ACTION } from './constants';

export function getFollowersData() {
  return {
    type: FOLLOWERS_ACTION,
  };
}

export function updateFollowersData({ followersData, inProcess = false }) {
  return {
    followersData,
    type: UPDATE_ACTION,
    inProcess
  };
}

export function updateInProcess(data) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess: data,
  };
}
