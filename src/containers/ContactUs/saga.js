import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, notifySuccess } from '../App/action';
import { CONTACT_US } from './constants';
import { updateInProcess } from './actions';
import api from './api';

function* setContactUs({ data, setContactUsForm }) {
  yield put(updateInProcess(true));
  try {
    const dataClone = Utils.deepCopy(data);
    const apiResponse = yield call(api.contactUs, dataClone);
    if (apiResponse.success) {
      yield put(notifySuccess('Your request has been sent successfully'));
      setContactUsForm({});
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* loginSaga() {
  yield takeLatest(CONTACT_US, setContactUs);
}
