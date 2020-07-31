import { put, takeLatest, call } from 'redux-saga/effects';

import {
  GET_USERS_SAGA, LOGOUT, GET_NOTIFICATION, GET_MESSAGE, VERIFY_EMAIL, CART_DATA
} from './constants';
import {
  updateUserData, updateNotification, updateMessage, updateInProcess, notifySuccess,
} from './action';
import { getCart } from '../MyCart/actions';
import Utils from '../../utils/common';
import Navigation from '../../utils/navigation';
import api from './api';

function* workerGetUsersSaga() {
  const users = yield call(api.getUserProfileDetails);
  if (users.success) {
    yield put(updateUserData({ userData: users.data }));
  }
}

function* logoutSaga() {
  yield put(updateInProcess(true));
  try {
    const apiCall = yield call(api.logout);
    if (apiCall.success) {
      Navigation.forceReload('/sh/airvtingweb/');
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    console.log(e);
    yield put(updateInProcess(false));
  }
}

function* getNotificationSaga() {
  try {
    const notifCall = yield call(api.updateNotification);
    if (notifCall.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(notifCall.data)) {
        yield put(updateNotification(notifCall.data));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* getMessageSaga() {
  try {
    const msgCall = yield call(api.getMessageData);
    if (msgCall.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(msgCall.data)) {
        yield put(updateMessage(msgCall.data));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* verifyEmailSaga() {
  yield put(updateInProcess(true));
  try {
    const apiCall = yield call(api.verifyEmail);
    if (apiCall.success) {
      yield put(notifySuccess('Your email verification link has been send on regitered mail id.'));
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    console.log(e);
    yield put(updateInProcess(false));
  }
}

function* getCartSaga() {
  try {
    yield put(getCart());
  } catch (e) {
    console.log(e);
  }
}

export default function* watchGetUsersSaga() {
  yield takeLatest(GET_USERS_SAGA, workerGetUsersSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_NOTIFICATION, getNotificationSaga);
  yield takeLatest(GET_MESSAGE, getMessageSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
  yield takeLatest(CART_DATA, getCartSaga);
}
