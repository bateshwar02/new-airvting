import { takeLatest, call, put } from 'redux-saga/effects';
import { notifySuccess } from '../App/action';

import { GET_AIR_TOKEN, BUY_TOKEN } from './constants';
import { updateInProcess, updateAirToken } from './actions';
import api from './api';


function* getAirToken() {
  yield put(updateInProcess(true));
  try {
    const airData = yield call(api.getAirToken);
    if (airData.success) {
      yield put(updateAirToken(airData.data));
    }
    yield put(updateInProcess(false));
  } catch (e) {
    console.log(e);
    yield put(updateInProcess(false));
  }
}

function* buyAirTokenSaga({ formData }) {
  yield put(updateInProcess(true));
  try {
    const airData = yield call(api.buyAirToken, formData);
    if (airData.success) {
      yield put(notifySuccess(airData.message));
    }
    yield put(updateInProcess(false));
  } catch (e) {
    console.log(e);
    yield put(updateInProcess(false));
  }
}


export default function* productSaga() {
  yield takeLatest(GET_AIR_TOKEN, getAirToken);
  yield takeLatest(BUY_TOKEN, buyAirTokenSaga);
}
