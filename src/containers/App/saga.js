import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_USERS_SAGA, LOGOUT } from './constants';
import { updateUserData } from './action';
import api from './api';

function* workerGetUsersSaga() {
  const users = yield call(api.getUserProfileDetails);
  if (users.success) {
    yield put(updateUserData({ userData: users.data }));
  }
}

function* logoutSaga() {
  try {
    yield call(api.logout);
    window.location = '/sh/airvtingweb';
    return;
  } catch (e) {
    console.log(e);
  }
}

export default function* watchGetUsersSaga() {
  yield takeLatest(GET_USERS_SAGA, workerGetUsersSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
