/*
 *
 * Featured actions
 *
 */

import { UPDATE_ACTION, GET_FEATURED_DATA, Is_PROCESS_ACTION } from './constants';

export function updateData({ featuredData }) {
  return {
    type: UPDATE_ACTION,
    featuredData,
  };
}

export function getFeaturedData() {
  return {
    type: GET_FEATURED_DATA,
  };
}

export function updateInProcess(inProcess) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess,
  };
}
