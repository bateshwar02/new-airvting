import { takeLatest, call, put } from 'redux-saga/effects';
import { notifySuccess, notifyError, updateMediaObj } from '../App/action';
import { addBookMark } from '../../lib/addBookMark';

import {
  BOOKMARK_ACTION, GET_CATEGORY, GET_DATA_BY_CATEGORY, UPDATE_VIDEO, GET_SEARCH_DATA, GET_CURRENT_POST
} from './constatnt';
import {
  updateInProcess, updateCategoryData, updateSearchData, updateCurrentPost,
  // updateSearch
} from './action';
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
    console.log(e);
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
    console.log(e);
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
    console.log(e);
  }
}

function* updateVideoObjSaga({ mediaObj }) {
  try {
    yield put(updateMediaObj({ mediaObj }));
  } catch (e) {
    console.log(e);
  }
}

function* getSearchDataSaga({ keyword }) {
  yield put(updateInProcess(true));
  try {
    const searchAct = yield call(api.getSearchData, keyword);
    if (searchAct.success) {
      yield put(updateSearchData(searchAct.data, true, keyword));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: searchAct.message }));
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    console.log(e);
  }
}

function* getCurrentPostData() {
  try {
    const currentData = yield call(api.getCurrentData);
    if (currentData.success) {
      yield put(updateCurrentPost(currentData.data));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* loginSaga() {
  yield takeLatest(BOOKMARK_ACTION, bookMarkActionSaga);
  yield takeLatest(GET_CATEGORY, getCategoryActionSaga);
  yield takeLatest(GET_DATA_BY_CATEGORY, getDataCategoryActionSaga);
  yield takeLatest(UPDATE_VIDEO, updateVideoObjSaga);
  yield takeLatest(GET_SEARCH_DATA, getSearchDataSaga);
  yield takeLatest(GET_CURRENT_POST, getCurrentPostData);
}
