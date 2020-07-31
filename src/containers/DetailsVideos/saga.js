// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing


import { takeLatest, call, put } from 'redux-saga/effects';
import { notifyError, notifySuccess } from '../App/action';

import {
  GET_VIDEO_DETAILS, ADD_COMMENT, GET_COMMENT, FOLLOW_ACTION, MY_GIFT, STORE_GIFT, LIKE_ACTION_POST
} from './constants';
import {
  updateVideoData, updateInProcess, updateCommentData, getComment, updateActionInProcess, updateFallowInProcess, updateMyGift, updateStoreGift, updateStoreProcess, getVideoDetails
} from './actions';
import api from './api';

function* getVideoDataSaga({ id }) {
  try {
    const getVideoDetailsCall = yield call(api.getVideoDetails, id);
    if (getVideoDetailsCall.success) {
      yield put(updateVideoData({ videoData: getVideoDetailsCall.data.postDetail, inProcess: false }));
      return;
    }
    yield put(notifyError({ message: getVideoDetailsCall.message }));
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* addVideoCommentSaga({ formData, postId }) {
  yield put(updateActionInProcess(true));
  try {
    const addVideoComment = yield call(api.addComment, formData, postId);
    if (addVideoComment.success) {
      yield put(notifySuccess('Comment has been added successfully.'));
      yield put(getComment(postId));
      yield put(updateActionInProcess(false));
      return;
    }
    yield put(notifyError({ message: addVideoComment.message }));
    yield put(updateActionInProcess(false));
    return;
  } catch (e) {
    yield put(notifyError(e));
  }
}

function* getCommentSaga({ id }) {
  yield put(updateInProcess(true));
  try {
    const commentData = yield call(api.getCommentData, id);
    if (commentData.success) {
      yield put(updateCommentData({ commentData: commentData.data }));
      yield put(updateInProcess(false));
      return;
    }
    yield put(notifyError({ message: commentData.message }));
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* followUserSaga({ id }) {
  yield put(updateFallowInProcess(true));
  try {
    const follow = yield call(api.followUser, id);
    if (follow.success) {
      yield put(notifySuccess('Follow Action Success.'));
      yield put(updateFallowInProcess(false));
      return;
    }
    yield put(notifyError({ message: follow.message }));
    yield put(updateFallowInProcess(false));
    return;
  } catch (e) {
    yield put(updateFallowInProcess(false));
    yield put(notifyError(e));
  }
}

function* getMyGiftSaga() {
  yield put(updateStoreProcess(true));
  try {
    const callGift = yield call(api.getMyGift);
    if (callGift.success) {
      yield put(updateMyGift(callGift.data));
      yield put(updateStoreProcess(false));
      return;
    }
    yield put(notifyError({ message: callGift.message }));
    yield put(updateStoreProcess(false));
    return;
  } catch (e) {
    yield put(notifyError(e));
    yield put(updateStoreProcess(false));
  }
}

function* getStoreGiftSaga() {
  yield put(updateStoreProcess(true));
  try {
    const callGift = yield call(api.getStoreGift);
    if (callGift.success) {
      yield put(updateStoreGift(callGift.data));
      yield put(updateStoreProcess(false));
      return;
    }
    yield put(notifyError({ message: callGift.message }));
    yield put(updateStoreProcess(false));
    return;
  } catch (e) {
    yield put(notifyError(e));
    yield put(updateStoreProcess(false));
  }
}

function* likeActionSaga({ post_id }) {
  yield put(updateStoreProcess(true));
  try {
    const callGift = yield call(api.likePostAction, post_id);
    if (callGift.success) {
      console.log('like === ', callGift);
      yield put(notifySuccess('Liked Post'));
      yield put(getVideoDetails(post_id));
      yield put(updateStoreProcess(false));
      return;
    }
    yield put(notifyError({ message: callGift.message }));
    yield put(updateStoreProcess(false));
    return;
  } catch (e) {
    yield put(notifyError(e));
    yield put(updateStoreProcess(false));
  }
}


export default function* detailsVideosSaga() {
  yield takeLatest(GET_VIDEO_DETAILS, getVideoDataSaga);
  yield takeLatest(ADD_COMMENT, addVideoCommentSaga);
  yield takeLatest(GET_COMMENT, getCommentSaga);
  yield takeLatest(FOLLOW_ACTION, followUserSaga);
  yield takeLatest(MY_GIFT, getMyGiftSaga);
  yield takeLatest(STORE_GIFT, getStoreGiftSaga);
  yield takeLatest(LIKE_ACTION_POST, likeActionSaga);
}
