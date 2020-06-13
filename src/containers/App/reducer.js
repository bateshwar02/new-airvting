/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import { UPDATE_USER_DATA, UPDATE_VIDEO_OBJ, IS_ADD_PRODUCT } from './constants';

const initialState = { userData: {}, mediaObj: {}, isAddProduct: false };

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
    default:
      return state;
  }
}
