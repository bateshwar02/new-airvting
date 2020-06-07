// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError } from '../App/action';

import { FOLLOWERS_ACTION } from './constants';
import { updateFollowersData, updateInProcess } from './actions';
import api from './api';

function* getFollowers() {
  try {
    const followerData = yield call(api.followersData);
    if (followerData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(followerData.data) && !Utils.isUndefinedOrNullOrEmptyList(followerData.data.userDetail)) {
        yield put(updateFollowersData({ followersData: followerData.data.userDetail }));
      }
    } else {
      const arrData = [
        {
          _id: 'd241ffd6-9394-11ea-93ad-fa163eeeaebe',
          createdAt: null,
          displayName: 'Amazing hasan',
          featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/uploads/usersProfile/1589631288.jpeg',
          firstName: 'Amazing',
          isLive: false,
          lastName: 'hasan',
          username: 'Amazing',
        },
      ];

      yield put(updateFollowersData({ followersData: arrData }));
    }
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* followersSaga() {
  yield takeLatest(FOLLOWERS_ACTION, getFollowers);
}
