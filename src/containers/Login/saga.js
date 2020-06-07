import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import {
  notifySuccess, notifyError, updateUserData
} from '../App/action';
import { SIGNUP, SIGNIN } from './constants';
import { updateActions, updateProcessAction } from './actions';
import api from './api';
import Navigation from '../../utils/navigation';


function* signUpSaga({ formData }) {
  yield put(updateProcessAction(true));
  try {
    const signUp = yield call(api.signUp, formData);
    if (signUp.success) {
      yield put(notifySuccess('User sign-up successfully'));
      if (!Utils.isUndefinedOrNullOrEmptyObject(signUp.data)) {
        yield call(api.setCredential, signUp.data.token);
        yield put(updateUserData({ userData: signUp.data }));
        yield put(updateProcessAction(false));
      }
      return;
    }
    yield put(notifyError({ message: signUp.message }));
    yield put(updateActions({ action: 1 }));
    yield put(updateProcessAction(false));
  } catch (e) {
    yield put(updateProcessAction(false));
    yield put(notifyError(e));
  }
}

function* signInSaga({ formData }) {
  yield put(updateProcessAction(true));
  try {
    const signInCall = yield call(api.signIn, formData);
    if (signInCall.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(signInCall.data)) {
        yield call(api.setCredential, signInCall.data.tokenId, signInCall.data.userDetail._id);
        yield put(updateUserData({ userData: signInCall.data }));
        yield put(updateProcessAction(false));
        Navigation.forceReload('/sh/airvtingweb/');
        return;
      }
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: signInCall.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log('sign in error ====', e);
    yield put(notifyError(e));
  }
}

export default function* loginSaga() {
  yield takeLatest(SIGNUP, signUpSaga);
  yield takeLatest(SIGNIN, signInSaga);
}
