// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError } from '../App/action';

import { GET_FEATURED_DATA } from './constants';
import { updateData, updateInProcess } from './actions';
import api from './api';

function* getFeatured() {
  try {
    const featuredData = yield call(api.getFeaturedData);
    if (featuredData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(featuredData.data)) {
        yield put(updateData({ featuredData: featuredData.data }));
      }
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* featuredSaga() {
  yield takeLatest(GET_FEATURED_DATA, getFeatured);
}
