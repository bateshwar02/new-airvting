// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, updateInProcess } from '../App/action';

import { GET_FEATURED_DATA } from './constants';
import { updateData } from './actions';
import api from './api';

function* getFeatured() {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const featuredData = yield call(api.getFeaturedData);
    if (featuredData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(featuredData.data)) {
        yield put(updateData({ featuredData: featuredData.data }));
      }
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

export default function* featuredSaga() {
  yield takeLatest(GET_FEATURED_DATA, getFeatured);
}
