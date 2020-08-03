import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifySuccess } from '../App/action';
import { CONTACT_US } from './constants';
import { updateInProcess, submitAction } from './actions';
import Navigation from '../../utils/navigation';
import api from './api';

function* setContactUs({ data }) {
  yield put(updateInProcess(true));
  try {
    const dataClone = Utils.deepCopy(data);
    const apiResponse = yield call(api.contactUs, dataClone);
    if (apiResponse.success) {
      yield put(notifySuccess('Your request has been sent successfully'));
      Navigation.forceReload('/sh/airvtingweb/contact');
      yield put(submitAction(true));
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(submitAction(false));
    console.log(e);
  }
}

export default function* loginSaga() {
  yield takeLatest(CONTACT_US, setContactUs);
}
