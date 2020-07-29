// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, updateMediaObj } from '../App/action';

import { GET_HISTORY_DATA, UPDATE_VIDEO, GET_BOOKMARK_DATA } from './constants';
import { updateData, updateInProcess, updateBookmar } from './actions';
import api from './api';

function* getFeatured() {
  try {
    const historyData = yield call(api.getHistoryData);
    if (historyData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(historyData.data)) {
        yield put(updateData({ historyData: historyData.data }));
      }
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* updateVideoObjSaga({ mediaObj }) {
  try {
    updateMediaObj({ mediaObj });
  } catch (e) {
    yield put(notifyError(e));
  }
}


function* getBookmarkSaga() {
  try {
    const bookMarkData = yield call(api.getHistoryData);
    if (bookMarkData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(bookMarkData.data)) {
        yield put(updateBookmar(bookMarkData.data));
      }
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

export default function* historySaga() {
  yield takeLatest(GET_HISTORY_DATA, getFeatured);
  yield takeLatest(UPDATE_VIDEO, updateVideoObjSaga);
  yield takeLatest(GET_BOOKMARK_DATA, getBookmarkSaga);
}
