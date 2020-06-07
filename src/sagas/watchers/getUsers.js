import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_USERS_SAGA } from '../../constants';
import { updateUsersSaga } from '../../actions';
import api from '../../lib/api';

function* workerGetUsersSaga() {
  const users = yield call(api.getUserProfileDetails);
  if (users.success) {
    yield put(updateUsersSaga({ userData: users.data }));
  }
}

export default function* watchGetUsersSaga() {
  yield takeLatest(GET_USERS_SAGA, workerGetUsersSaga);
}
