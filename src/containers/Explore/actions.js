/*
 *
 * Explore actions
 *
 */

import {
  GET_EXPLORE_DATA, UPDATE_DATA, IN_PROCESS_ACTION, BOOKMARK_ACTION, UPDATE_FILTER, GET_DATA_FILTER
} from './constants';

export function updateData({ exploreData, inProcess = false }) {
  return {
    type: UPDATE_DATA,
    exploreData,
    inProcess
  };
}

export function getExploreData(filter) {
  return {
    type: GET_EXPLORE_DATA,
    filter
  };
}

export function updateInProcess(inProcess) {
  return {
    type: IN_PROCESS_ACTION,
    inProcess
  };
}

export function addBookMark(id) {
  return {
    type: BOOKMARK_ACTION,
    id,
  };
}

export function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    filter,
  };
}

export function getDataByFilter(filter) {
  return {
    type: GET_DATA_FILTER,
    filter,
  };
}
