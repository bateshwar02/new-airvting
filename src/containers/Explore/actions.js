/*
 *
 * Explore actions
 *
 */

import {
  GET_EXPLORE_DATA, UPDATE_DATA, IN_PROCESS_ACTION, BOOKMARK_ACTION, UPDATE_FILTER, GET_DATA_FILTER, UPDATE_TAB, GET_PEOPLE_DATA, UPDATE_PEOPLE_DATA, UPDATE_PEOPLE_FILTER, UPDATE_FOLLOW_ACTION, FOLLOW_ACTION, GET_PRODUCT, UPDATE_PRODUCT
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

export function updateTabValue(tabValue) {
  return {
    type: UPDATE_TAB,
    tabValue
  };
}

export function getPeopleData(filter) {
  return {
    type: GET_PEOPLE_DATA,
    filter
  };
}

export function updatePeopleData(PeopleData) {
  return {
    type: UPDATE_PEOPLE_DATA,
    PeopleData
  };
}

export function userFilterUpdate(peopleFilter) {
  return {
    type: UPDATE_PEOPLE_FILTER,
    peopleFilter
  };
}

export function updateFollowProcess(fallowInProcess) {
  return {
    type: UPDATE_FOLLOW_ACTION,
    fallowInProcess
  };
}

export function followAction(id) {
  return {
    type: FOLLOW_ACTION,
    id
  };
}

export function getProductData() {
  return {
    type: GET_PRODUCT
  };
}

export function updateProduct(productData) {
  return {
    type: UPDATE_PRODUCT,
    productData
  };
}
