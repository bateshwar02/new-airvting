import { UPDATE_USER_DATA } from '../constants';

const initialState = { userData: {} };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.userData
      };
    default:
      return state;
  }
}
