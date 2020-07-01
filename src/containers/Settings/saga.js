import { takeLatest, call, put } from 'redux-saga/effects';
import { notifyError, notifySuccess } from '../App/action';

import {
  UPDATE_USER_DATA, UPDATE_PASSWORD, FORGATE_PASSWORD, GET_GIFT, VERIFY_EMAIL, DEACTIVE_ACCOUNT
} from './constants';
import { updateInProcess, updateGift, updateVerifyMsg } from './actions';
import api from './api';
import Navigation from '../../utils/navigation';

function* updateUserData({ userData, id }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const apiData = yield call(api.updateUserData, userData, id);
    const upData = JSON.parse(apiData);
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

function* updatePassData({ passData }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const changePass = yield call(api.changePassword, passData);
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

function* resetPassSaga({ passData }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const changePass = yield call(api.resetPass, passData);
    if (changePass.success) {
      yield put(notifySuccess('Password updated successfully.'));
      yield put(updateInProcess({ inProcess: false }));
      Navigation.push('/sh/airvtingweb');
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

function* verifyEmailSaga({ token }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const verifyEmail = yield call(api.verfyEmail, token);
    if (verifyEmail.success) {
      yield put(updateInProcess({ inProcess: false }));
      return;
    }
    yield put(updateVerifyMsg(verifyEmail.message));
    yield put(notifyError({ message: verifyEmail.message }));
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* getGiftSaga() {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const apiCall = yield call(api.getGift);
    if (apiCall.success) {
      const dataObj = {
        giftDetail: [{
          airToken: 1, createdAt: '2020-05-23T05:27:17.000000Z', isActive: true, quantity: 2, featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/uploads/gifts/airVting_Icon_Set-01.png', giftId: '5b8f57e3-9ce8-11ea-93ad-fa163eeeaebe', title: 'HANDSHAKE', updatedAt: '2020-05-23T05:31:57.000000Z'
        }, {
          airToken: 1, createdAt: '2020-05-23T05:27:17.000000Z', isActive: true, quantity: 1, featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/uploads/gifts/airVting_Icon_Set-02.png', giftId: '5b8f9095-9ce8-11ea-93ad-fa163eeeaebe', title: 'STAR', updatedAt: '2020-05-23T05:32:01.000000Z'
        }],
        totalGift: 3,
        totalPages: 2
      };
      yield put(updateGift(dataObj));
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* deactivateAccountSaga() {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const deactivateAcc = yield call(api.deActivateAccount);
    if (deactivateAcc.success) {
      yield put(updateInProcess({ inProcess: false }));
      yield put(notifySuccess('Account has been deactivated.'));
      return;
    }
    yield put(notifyError({ message: deactivateAcc.message }));
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
  yield takeLatest(FORGATE_PASSWORD, resetPassSaga);
  yield takeLatest(GET_GIFT, getGiftSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
  yield takeLatest(DEACTIVE_ACCOUNT, deactivateAccountSaga);
}
