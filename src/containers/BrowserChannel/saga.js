// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, notifySuccess } from '../App/action';

import { GET_USER_DATA_BY_ID, GET_POST_DATA_BY_ID, BOOKMARK_ACTION } from './constants';
import { updatePostData, updateInProcess, updateUserData } from './actions';
import { addBookMark } from '../../lib/addBookMark';
import api from './api';

function* getChannelUser({ id }) {
  try {
    const userData = yield call(api.getUserData, id);
    if (userData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(userData.data)) {
        yield put(updateUserData({ channelUserData: userData.data }));
        return;
      }
    }
    yield put(updateInProcess(false));
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getPostDataByUser({ id }) {
  try {
    const postData = yield call(api.getPostDataByUser, id);
    if (postData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(postData.data)) {
        yield put(updatePostData({ postDataByUser: postData.data }));
        return;
      }
    }
    yield put(updateInProcess(false));
  } catch (e) {
    yield put(updateInProcess(false));
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

export default function* followersSaga() {
  yield takeLatest(GET_USER_DATA_BY_ID, getChannelUser);
  yield takeLatest(GET_POST_DATA_BY_ID, getPostDataByUser);
  yield takeLatest(BOOKMARK_ACTION, bookMarkActionSaga);
}
