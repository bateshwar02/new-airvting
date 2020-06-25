import { takeLatest, call, put } from 'redux-saga/effects';
// import Utils from '../../utils/common';
import {
//   notifySuccess,
  notifyError
} from '../App/action';
import {
  GET_TRANSICTION, GET_GIFT
} from './constants';
import {
  updateTransaction, updateInProcess, updateGift
} from './actions';
import api from './api';

function* getTransactionSaga() {
  yield put(updateInProcess(true));
  try {
    const tranc = yield call(api.getTrarnction);
    if (tranc.success) {
      yield put(updateTransaction(tranc.data));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: tranc.message }));
    yield put(updateInProcess(false));
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getGiftSaga() {
  yield put(updateInProcess(true));
  try {
    const gift = yield call(api.getGift);
    if (gift.success) {
      yield put(updateGift(gift.data));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: gift.message }));
    yield put(updateInProcess(false));
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* myTokenSaga() {
  yield takeLatest(GET_TRANSICTION, getTransactionSaga);
  yield takeLatest(GET_GIFT, getGiftSaga);
}
