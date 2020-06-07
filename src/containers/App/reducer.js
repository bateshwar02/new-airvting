/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import { UPDATE_USER_DATA, UPDATE_VIDEO_OBJ } from './constants';

const initialState = { userData: {}, mediaObj: {} };

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
    default:
      return state;
  }
}
