// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, notifySuccess } from '../App/action';
import { getCategoryData } from '../Home/action';

import {
  GET_EXPLORE_DATA, BOOKMARK_ACTION, GET_DATA_FILTER, GET_PEOPLE_DATA, FOLLOW_ACTION, GET_PRODUCT, GET_CATEGORY, LIKED_ACTION
} from './constants';
import {
  updateData, updateInProcess, updateFilter, getExploreData, userFilterUpdate, updatePeopleData, updateFollowProcess, updateProduct
} from './actions';
import api from './api';
import { addBookMark } from '../../lib/addBookMark';

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
    const bookMarkApiAction = yield call(addBookMark, id);
    if (bookMarkApiAction.success) {
      yield put(notifySuccess('Bookmark action perform successfully.'));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: bookMarkApiAction.message }));
    yield put(updateInProcess(false));
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

function* getPeopleDataSaga({ filter }) {
  yield put(updateInProcess(true));
  try {
    const getPeople = yield call(api.getPeopleData, filter);
    if (getPeople.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(getPeople.data)) {
        yield put(updatePeopleData(getPeople.data));
        yield put(userFilterUpdate(filter));
        yield put(updateInProcess(false));
        return;
      }
    }
    yield put(updateInProcess(false));
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getFollowActionSaga({ id }) {
  yield put(updateFollowProcess(true));
  try {
    const follow = yield call(api.followUser, id);
    if (follow.success) {
      yield put(notifySuccess('Follow Action Success.'));
      yield put(updateFollowProcess(false));
      return;
    }
    yield put(notifyError({ message: follow.message }));
    yield put(updateFollowProcess(false));
    return;
  } catch (e) {
    yield put(updateFollowProcess(false));
    yield put(notifyError(e));
  }
}

function* getProductDataSaga() {
  yield put(updateInProcess(true));
  try {
    const product = yield call(api.productList);
    if (product.success) {
      yield put(updateProduct(product.data));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: product.message }));
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getCategorySaga() {
  try {
    yield put(getCategoryData(true));
  } catch (e) {
    yield put(notifyError(e));
  }
}

function* likedActionSaga({ id }) {
  yield put(updateInProcess(true));
  try {
    const likedAcc = yield call(api.productLikedAction, id);
    if (likedAcc.success) {
      yield put(notifySuccess('Product Liked'));
    }
    yield put(updateInProcess(false));
  } catch (e) {
    yield put(updateInProcess(false));
    console.log(e);
  }
}

export default function* exploreSaga() {
  yield takeLatest(GET_EXPLORE_DATA, getExploreDataSaga);
  yield takeLatest(BOOKMARK_ACTION, bookMarkActionSaga);
  yield takeLatest(GET_DATA_FILTER, getDataByFilterSaga);
  yield takeLatest(GET_PEOPLE_DATA, getPeopleDataSaga);
  yield takeLatest(FOLLOW_ACTION, getFollowActionSaga);
  yield takeLatest(GET_PRODUCT, getProductDataSaga);
  yield takeLatest(GET_CATEGORY, getCategorySaga);
  yield takeLatest(LIKED_ACTION, likedActionSaga);
}
