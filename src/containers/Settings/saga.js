import { takeLatest, call, put } from 'redux-saga/effects';
import { notifyError, notifySuccess } from '../App/action';

import { UPDATE_USER_DATA, UPDATE_PASSWORD, FORGATE_PASSWORD } from './constants';
import { updateInProcess } from './actions';
import api from './api';

function* updateUserData({ userData, id }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const upData = yield call(api.updateUserData, userData, id);
    if (upData.success) {
      yield put(notifySuccess('User data updated successfully.'));
      yield put(updateInProcess({ inProcess: false }));
      return;
    }
    yield put(notifyError({ message: upData.message }));
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* updatePassData({ passData, id }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const changePass = yield call(api.updatePass, passData, id);
    if (changePass.success) {
      yield put(notifySuccess('Password updated successfully.'));
      yield put(updateInProcess({ inProcess: false }));
      return;
    }
    yield put(notifyError({ message: changePass.message }));
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* changePassData({ passData, token }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const changePass = yield call(api.updatePass, passData, token);
    if (changePass.success) {
      yield put(notifySuccess('Password updated successfully.'));
      yield put(updateInProcess({ inProcess: false }));
      return;
    }
    yield put(notifyError({ message: changePass.message }));
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

export default function* settingSaga() {
  yield takeLatest(UPDATE_USER_DATA, updateUserData); 
  yield takeLatest(UPDATE_PASSWORD, updatePassData);
  yield takeLatest(FORGATE_PASSWORD, changePassData);
}
