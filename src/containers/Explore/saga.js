// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, notifySuccess } from '../App/action';

import { GET_EXPLORE_DATA, BOOKMARK_ACTION, GET_DATA_FILTER } from './constants';
import {
  updateData, updateInProcess, updateFilter, getExploreData
} from './actions';
import api from './api';
import commonApi from '../../lib/api';

function* getExploreDataSaga({ filter }) {
  try {
    const getExplore = yield call(api.getExploreData, filter);
    if (getExplore.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(getExplore.data)) {
        yield put(updateData({ exploreData: getExplore.data }));
        return;
      }
    }
    yield put(updateInProcess({ inProcess: false }));
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* bookMarkActionSaga({ id }) {
  yield put(updateInProcess(true));
  try {
    const bookMarkApiAction = yield call(commonApi.bookMarkApiAction, id);
    if (bookMarkApiAction.success) {
      yield put(notifySuccess('Bookmark action perform successfully.'));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: bookMarkApiAction.message }));
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getDataByFilterSaga({ filter }) {
  yield put(updateInProcess(true));
  try {
    yield put(updateFilter(filter));
    yield put(getExploreData(filter));
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* exploreSaga() {
  yield takeLatest(GET_EXPLORE_DATA, getExploreDataSaga);
  yield takeLatest(BOOKMARK_ACTION, bookMarkActionSaga);
  yield takeLatest(GET_DATA_FILTER, getDataByFilterSaga);
}
