/*
 *
 * History actions
 *
 */

import {
  UPDATE_ACTION, GET_HISTORY_DATA, Is_PROCESS_ACTION, UPDATE_VIDEO
} from './constants';

export function updateData({ historyData, inProcess = false }) {
  return {
    type: UPDATE_ACTION,
    historyData,
    inProcess
  };
}

export function getHistoryData() {
  return {
    type: GET_HISTORY_DATA,
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
