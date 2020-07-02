// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing


import { takeLatest, call, put } from 'redux-saga/effects';
import { notifyError, notifySuccess } from '../App/action';

import {
  GET_VIDEO_DETAILS, ADD_COMMENT, GET_COMMENT, FOLLOW_ACTION, MY_GIFT, STORE_GIFT, LIKE_ACTION_POST
} from './constants';
import {
  updateVideoData, updateInProcess, updateCommentData, getComment, updateActionInProcess, updateFallowInProcess, updateMyGift, updateStoreGift, updateStoreProcess
} from './actions';
import api from './api';

function* getVideoDataSaga({ id }) {
  try {
    const getVideoDetails = yield call(api.getVideoDetails, id);
    if (getVideoDetails.success) {
      yield put(updateVideoData({ videoData: getVideoDetails.data.postDetail, inProcess: false }));
      return;
    }
    yield put(notifyError({ message: getVideoDetails.message }));
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
      // yield put(updateMyGift(callGift.data));
      const data = {
        giftDetail: [{
          airToken: 1, createdAt: '2020-05-23T05:27:17.000000Z', isActive: true, quantity: 2, featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/uploads/gifts/airVting_Icon_Set-01.png', giftId: '5b8f57e3-9ce8-11ea-93ad-fa163eeeaebe', title: 'HANDSHAKE', updatedAt: '2020-05-23T05:31:57.000000Z'
        }, {
          airToken: 1, createdAt: '2020-05-23T05:27:17.000000Z', isActive: true, quantity: 1, featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/uploads/gifts/airVting_Icon_Set-02.png', giftId: '5b8f9095-9ce8-11ea-93ad-fa163eeeaebe', title: 'STAR', updatedAt: '2020-05-23T05:32:01.000000Z'
        }],
        totalGift: 3,
        totalPages: 2
      };
      yield put(updateMyGift(data));
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
      yield put(notifySuccess('Liked Post'));
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
