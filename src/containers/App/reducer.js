/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import {
  UPDATE_USER_DATA, UPDATE_VIDEO_OBJ, IS_ADD_PRODUCT, UPDATE_NOTIFICATION, UPDATE_MESSAGE, UPDATE_IN_PROCCESS, UPDATE_SEARCH
} from './constants';

const initialState = {
  userData: {}, mediaObj: {}, isAddProduct: false, notification: {}, message: {}, inProcess: false, isSearch: false
};

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.userData
      };
    case UPDATE_VIDEO_OBJ:
      return {
        ...state,
        mediaObj: action.mediaObj
      };
    case IS_ADD_PRODUCT:
      return {
        ...state,
        isAddProduct: action.isAddProduct
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case UPDATE_IN_PROCCESS:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        isSearch: action.isSearch
      };
    default:
      return state;
  }
}
