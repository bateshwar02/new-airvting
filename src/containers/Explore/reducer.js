/*
 *
 * Explore reducer
 *
 */

import {
  UPDATE_DATA, IN_PROCESS_ACTION, tabMenu, UPDATE_FILTER, subTabMenu, UPDATE_TAB, UPDATE_PEOPLE_DATA, UPDATE_PEOPLE_FILTER, UPDATE_FOLLOW_ACTION, userSubMenu, UPDATE_PRODUCT
} from './constants';

export const initialState = {
  exploreData: {}, filter: 'hot', inProcess: true, tabMenu, subTabMenu, tabValue: 'post', peopleData: {}, peopleFilter: 'new', fallowInProcess: false, userSubMenu, productData: {}
};

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        inProcess: action.inProcess,
        exploreData: action.exploreData
      };
    case IN_PROCESS_ACTION:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case UPDATE_TAB:
      return {
        ...state,
        tabValue: action.tabValue
      };
    case UPDATE_PEOPLE_DATA:
      return {
        ...state,
        peopleData: action.PeopleData
      };
    case UPDATE_PEOPLE_FILTER:
      return {
        ...state,
        peopleFilter: action.peopleFilter
      };
    case UPDATE_FOLLOW_ACTION:
      return {
        ...state,
        fallowInProcess: action.fallowInProcess
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        productData: action.productData
      };

    default:
      return state;
  }
}
