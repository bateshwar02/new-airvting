import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError } from '../App/action';

import { GET_CONVERSATION_DATA, ADD_CONVERSATION, GET_CONVERSATION_BY_ID } from './constants';
import { updateData, updateInProcess, updateConversationById } from './actions';
import api from './api';

function* getConversationDeatils() {
  try {
    const convData = yield call(api.getConversation);
    if (convData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(convData.data)) {
        yield put(updateData(convData.data));
      }
    } else {
      const arrData = {
        totalPages: 1,
        conversationsDetail: [{
          unReadCount: 4,
          _id: '17a292b5-9749-11ea-b93c-e8d0fcec03e2',
          receiver: {
            _id: '30cef825-9131-11ea-93ad-fa163eeeaebe', createdAt: null, displayName: 'Ajay Yadav', featuredImage: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1385679231618530&height=200&width=200&ext=1591537103&hash=AeRmxTNuRzgJMg7R', firstName: 'Ajay', isLive: false, lastName: 'Yadav', username: 'Ajay'
          },
          title: 'Free For Coffee?',
          messages: [{
            content: '{"height":0,"message":"hi, how are you","type":"text","width":0}', isRead: true, updatedAt: '2020-05-16T01:45:09.000000Z', createdAt: '2020-05-16T01:45:09.000000Z', senderId: '3f8be896-9133-11ea-93ad-fa163eeeaebe'
          }, {
            content: '{"height":0,"message":"Hello","type":"text","width":0}', isRead: true, updatedAt: '2020-05-18T13:30:09.000000Z', createdAt: '2020-05-18T13:30:09.000000Z', senderId: '1e7cdfa9-9136-11ea-93ad-fa163eeeaebe'
          }, {
            content: '{"height":0,"message":"How are you. ","type":"text","width":0}', isRead: true, updatedAt: '2020-05-18T13:35:12.000000Z', createdAt: '2020-05-18T13:35:12.000000Z', senderId: '1e7cdfa9-9136-11ea-93ad-fa163eeeaebe'
          }, {
            content: '{"height":0,"message":"Good","type":"text","width":0}', isRead: true, updatedAt: '2020-05-18T13:40:37.000000Z', createdAt: '2020-05-18T13:40:37.000000Z', senderId: '1e7cdfa9-9136-11ea-93ad-fa163eeeaebe'
          }],
          sender: {
            _id: '30cef825-9131-11ea-93ad-fa163eeeaebe', createdAt: null, displayName: 'Ajay Yadav', featuredImage: 'https://s3-ap-southeast-1.amazonaws.com/airvting-media-prod/image/image-05b1ffe0-0f3b-11ea-8f24-d16c512066ad.jpg', firstName: 'Ajay', isLive: false, lastName: 'Yadav', username: 'Ajay'
          },
          updatedAt: '2020-05-18T00:36:30.000000Z'
        }]
      };

      yield put(updateData(arrData));
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* getConversationDeatilsById({ id }) {
  yield put(updateInProcess(true));
  try {
    // const convData = yield call(api.getConversationById, id);
    // if (convData.success) {
    //   if (!Utils.isUndefinedOrNullOrEmptyObject(convData.data)) {
    //     yield put(updateConversationById(convData.data));
    //   }
    // } else {
    const arrData = {
      totalPages: 1,
      conversationsDetail: {
        _id: '17a292b5-9749-11ea-b93c-e8d0fcec03e2',
        receiver: {
          _id: '30cef825-9131-11ea-93ad-fa163eeeaebe', createdAt: null, displayName: 'Ajay Yadav', featuredImage: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1385679231618530&height=200&width=200&ext=1591537103&hash=AeRmxTNuRzgJMg7R', firstName: 'Ajay', isLive: false, lastName: 'Yadav', username: 'Ajay'
        },
        messages: [{
          content: '{"height":0,"message":"hi, how are you","type":"text","width":0}', isRead: false, updatedAt: '2020-05-16T01:45:09.000000Z', createdAt: '2020-05-16T01:45:09.000000Z', senderId: '3f8be896-9133-11ea-93ad-fa163eeeaebe'
        }, {
          content: '{"height":0,"message":"Hello","type":"text","width":0}', isRead: false, updatedAt: '2020-05-18T13:30:09.000000Z', createdAt: '2020-05-18T13:30:09.000000Z', senderId: '1e7cdfa9-9136-11ea-93ad-fa163eeeaebe'
        }, {
          content: '{"height":0,"message":"How are you. ","type":"text","width":0}', isRead: false, updatedAt: '2020-05-18T13:35:12.000000Z', createdAt: '2020-05-18T13:35:12.000000Z', senderId: '1e7cdfa9-9136-11ea-93ad-fa163eeeaebe'
        }, {
          content: '{"height":0,"message":"Good","type":"text","width":0}', isRead: false, updatedAt: '2020-05-18T13:40:37.000000Z', createdAt: '2020-05-18T13:40:37.000000Z', senderId: '1e7cdfa9-9136-11ea-93ad-fa163eeeaebe'
        }],
        sender: {
          _id: '30cef825-9131-11ea-93ad-fa163eeeaebe', createdAt: null, displayName: 'Ajay Yadav', featuredImage: 'https://s3-ap-southeast-1.amazonaws.com/airvting-media-prod/image/image-05b1ffe0-0f3b-11ea-8f24-d16c512066ad.jpg', firstName: 'Ajay', isLive: false, lastName: 'Yadav', username: 'Ajay'
        },
        updatedAt: '2020-05-18T00:36:30.000000Z'
      }
    };

    yield put(updateConversationById(arrData));
    // }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}


function* addReply({ formData, id }) {
  yield put(updateInProcess(true));
  try {
    yield call(api.addReply, formData, id);
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

export default function* followingSaga() {
  yield takeLatest(GET_CONVERSATION_DATA, getConversationDeatils);
  yield takeLatest(GET_CONVERSATION_BY_ID, getConversationDeatilsById);
  yield takeLatest(ADD_CONVERSATION, addReply);
}
