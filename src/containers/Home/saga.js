import { takeLatest, call, put } from 'redux-saga/effects';
import { notifySuccess, notifyError, updateMediaObj } from '../App/action';
import { addBookMark } from '../../lib/addBookMark';

import {
  BOOKMARK_ACTION, GET_CATEGORY, GET_DATA_BY_CATEGORY, UPDATE_VIDEO
} from './constatnt';
import { updateInProcess, updateCategoryData } from './action';
import api from './api';

function* bookMarkActionSaga({ id }) {
  yield put(updateInProcess(true));
  try {
    const bookMarkApiAction = yield call(addBookMark, id);
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

function* getCategoryActionSaga() {
  yield put(updateInProcess(true));
  try {
    const getCategory = yield call(api.getCategory);
    if (getCategory.success) {
      yield put(updateCategoryData({ categoryData: getCategory.data.categoriesDetail, inProcess: false }));
      return;
    }
    yield put(notifyError({ message: getCategory.message }));
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getDataCategoryActionSaga({ id }) {
  yield put(updateInProcess(true));
  try {
    const bookMarkApiAction = yield call(api.signUp, id);
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

function* updateVideoObjSaga({ mediaObj }) {
  try {
    updateMediaObj({ mediaObj });
  } catch (e) {
    yield put(notifyError(e));
  }
}

export default function* loginSaga() {
  yield takeLatest(BOOKMARK_ACTION, bookMarkActionSaga);
  yield takeLatest(GET_CATEGORY, getCategoryActionSaga);
  yield takeLatest(GET_DATA_BY_CATEGORY, getDataCategoryActionSaga);
  yield takeLatest(UPDATE_VIDEO, updateVideoObjSaga);
}
