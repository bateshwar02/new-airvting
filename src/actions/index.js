import { GET_USERS_SAGA, UPDATE_USER_DATA } from '../constants';


export function getUsersSaga() {
  return {
    type: GET_USERS_SAGA
  };
}

export function updateUsersSaga({ userData }) {
  return {
    userData,
    type: UPDATE_USER_DATA,
  };
}
