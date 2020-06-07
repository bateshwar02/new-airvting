// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, updateMediaObj } from '../App/action';
import { addBookMark } from '../Home/action';
import { GET_LIKED_VIDEOS_DATA, BOOKMARK_ACTION, UPDATE_VIDEO } from './constants';
import { updateData, updateInProcess } from './actions';
import api from './api';

function* getLickedVideos() {
  try {
    const dataObj = yield call(api.getLikedVideosData);
    if (dataObj.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(dataObj.data)) {
        yield put(updateData({ likeVideosData: dataObj.data }));
        return;
      }
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* bookMarkActionSaga({ id }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    yield put(addBookMark({ id }));
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

export default function* likeVideosSaga() {
  yield takeLatest(GET_LIKED_VIDEOS_DATA, getLickedVideos);
  yield takeLatest(BOOKMARK_ACTION, bookMarkActionSaga);
  yield takeLatest(UPDATE_VIDEO, updateVideoObjSaga);
}
