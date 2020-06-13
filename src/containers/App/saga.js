import { put, takeLatest, call } from 'redux-saga/effects';

import {
  GET_USERS_SAGA, LOGOUT, GET_NOTIFICATION, GET_MESSAGE
} from './constants';
import { updateUserData, updateNotification, updateMessage } from './action';
import Utils from '../../utils/common';
import api from './api';

function* workerGetUsersSaga() {
  const users = yield call(api.getUserProfileDetails);
  if (users.success) {
    yield put(updateUserData({ userData: users.data }));
  }
}

function* logoutSaga() {
  try {
    yield call(api.logout);
    window.location = '/sh/airvtingweb';
    return;
  } catch (e) {
    console.log(e);
  }
}

function* getNotificationSaga() {
  try {
    const notifCall = yield call(api.updateNotification);
    if (notifCall.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(notifCall.data)) {
        const dataObj = {
          statusCode: 201,
          success: true,
          message: null,
          data: {
            items: [{
              _id: '664d1574-a65f-11ea-93ad-fa163eeeaebe',
              createdAt: '2020-06-04T12:32:05Z',
              isRead: false,
              notifier: {
                displayName: 'mudassir hasan ', featuredImage: '', firstName: 'mudassir', isFollow: true, lastName: 'hasan', status: true, username: 'mudassir hasan', userId: null
              },
              notifyMessage: 'tagges you in a post',
              receiverId: 'd241ffd6-9394-11ea-93ad-fa163eeeaebe',
              type: 'tagUser',
              post: {
                commentId: null, content: null, description: null, featuredImage: 'https:\/\/s3-ap-southeast-1.amazonaws.com\/airvting-media-prod\/image\/image-05b1ffe0-0f3b-11ea-8f24-d16c512066ad.jpg', mediaUrl: null, postId: '66453d34-a65f-11ea-93ad-fa163eeeaebe', type: 'stream'
              }
            }, {
              _id: '131088dd-a736-11ea-93ad-fa163eeeaebe',
              createdAt: '2020-06-05T14:08:47Z',
              isRead: false,
              notifier: {
                displayName: 'gheedylan ', featuredImage: '', firstName: 'gheedylan', isFollow: true, lastName: '', status: true, username: 'gheedylan', userId: null
              },
              notifyMessage: 'fallow you',
              receiverId: 'd241ffd6-9394-11ea-93ad-fa163eeeaebe',
              type: 'fallow'
            }, {
              _id: '19f5c4fe-a736-11ea-93ad-fa163eeeaebe',
              createdAt: '2020-06-05T14:08:59Z',
              isRead: false,
              notifier: {
                displayName: 'gheedylan ', featuredImage: '', firstName: 'gheedylan', isFollow: true, lastName: '', status: true, username: 'gheedylan', userId: null
              },
              notifyMessage: 'unfallow you',
              receiverId: 'd241ffd6-9394-11ea-93ad-fa163eeeaebe',
              type: 'Unfallow user'
            }, {
              _id: 'd8f46e47-aa3a-11ea-93ad-fa163eeeaebe',
              createdAt: '2020-06-09T10:20:31Z',
              isRead: false,
              notifier: {
                displayName: 'test qa', featuredImage: '', firstName: 'test', isFollow: true, lastName: 'qa', status: true, username: 'rock9', userId: null
              },
              notifyMessage: 'added a new comment',
              receiverId: 'd241ffd6-9394-11ea-93ad-fa163eeeaebe',
              type: 'comment',
              post: {
                commentId: null, content: null, description: null, featuredImage: 'https:\/\/s3-ap-southeast-1.amazonaws.com\/airvting-media-prod\/image\/image-05b1ffe0-0f3b-11ea-8f24-d16c512066ad.jpg', mediaUrl: null, postId: '0ee431b3-a974-11ea-93ad-fa163eeeaebe', type: 'stream'
              }
            }],
            pageCount: 1,
            pageNumber: 1,
            pageSize: '10',
            totalCount: 4
          }
        };

        if (!Utils.isUndefinedOrNullOrEmptyList(notifCall.data.items)) {
          yield put(updateNotification(notifCall.data));
          return;
        }
        yield put(updateNotification(dataObj.data));
        return;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* getMessageSaga() {
  try {
    const msgCall = yield call(api.getMessageData);
    if (msgCall.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(msgCall.data)) {
        const dataObj = {
          statusCode: 201,
          success: true,
          message: null,
          data: {
            items: [{
              _id: '76f37d75-a4ce-11ea-93ad-fa163eeeaebe',
              createdAt: '2020-06-02T12:42:05Z',
              isRead: false,
              message: { content: '{"height":0,"message":"Amazing","type":"text","width":0}', messageId: '76f219f8-a4ce-11ea-93ad-fa163eeeaebe' },
              notifier: {
                displayName: 'mudassir hasan', featuredImage: 'https://lh5.googleusercontent.com/-ryf1AMs6czc/AAAAAAAAAAI/AAAAAAAAC2w/AMZuucn1w6Y0RRmDLloGozXK-WG-q8PxKw/s96-c/photo.jpg', firstName: 'mudassir', isFollow: false, lastName: 'hasan', status: true, username: 'mudassir', userId: '1cc9048f-a0b9-11ea-93ad-fa163eeeaebe'
              },
              notifyMessage: 'posted a new reply',
              receiverId: 'd241ffd6-9394-11ea-93ad-fa163eeeaebe',
              type: 'message'
            }],
            pageCount: 1,
            pageNumber: 1,
            pageSize: '10',
            totalCount: 1
          }
        };

        if (!Utils.isUndefinedOrNullOrEmptyList(msgCall.data.items)) {
          yield put(updateMessage(msgCall.data));
          return;
        }
        yield put(updateMessage(dataObj.data));
        return;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchGetUsersSaga() {
  yield takeLatest(GET_USERS_SAGA, workerGetUsersSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_NOTIFICATION, getNotificationSaga);
  yield takeLatest(GET_MESSAGE, getMessageSaga);
}
