/*
 *
 * Following actions
 *
 */

import { FOLLOWING_ACTION, UPDATE_ACTION, Is_PROCESS_ACTION } from './constants';

export function getFollowingData() {
  return {
    type: FOLLOWING_ACTION,
  };
}

export function updateFollowingData({ followingData, inProcess = false }) {
  return {
    followingData,
    inProcess,
    type: UPDATE_ACTION,
  };
}

export function updateInProcess({ inProcess }) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess,
  };
}
