// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, updateInProcess } from '../App/action';

import { FOLLOWING_ACTION } from './constants';
import { updateFollowingData } from './actions';
import api from './api';

function* getFollowing() {
  yield put(updateInProcess(true));
  try {
    const followingData = yield call(api.followingData);
    if (followingData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(followingData.data) && !Utils.isUndefinedOrNullOrEmptyList(followingData.data.userDetail)) {
        yield put(updateFollowingData({ followingData: followingData.data.userDetail }));
      }
    } else {
      const arrData = [
        {
          _id: '30cef825-9131-11ea-93ad-fa163eeeaebe',
          createdAt: null,
          displayName: 'Ajay Yadav',
          featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/uploads/usersProfile/1589631288.jpeg',
          firstName: 'Ajay',
          isLive: false,
          lastName: 'Yadav',
          username: 'Ajay',
        },
      ];

      yield put(updateFollowingData({ followingData: arrData }));
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* followingSaga() {
  yield takeLatest(FOLLOWING_ACTION, getFollowing);
}
