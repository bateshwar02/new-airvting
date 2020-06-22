import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import { notifyError, notifySuccess } from '../App/action';

import {
  GET_CONVERSATION_DATA, ADD_CONVERSATION, GET_CONVERSATION_BY_ID, ADD_CONVERSATION_REPLLY
} from './constants';
import {
  updateData, updateInProcess, updateConversationById, getConversationById, getConversation, addMessageAction, messageAction
} from './actions';
import api from './api';

function* getConversationDeatils() {
  try {
    const convData = yield call(api.getConversation);
    if (convData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(convData.data)) {
        yield put(updateData(convData.data));
      }
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
    const convData = yield call(api.getConversationById, id);
    if (convData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(convData.data)) {
        yield put(updateConversationById(convData.data));
      }
    }
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
    const addRep = yield call(api.addReply, formData, id);
    if (addRep.success) {
      yield put(getConversationById(id));
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    yield put(notifyError(e));
  }
}

function* addConversation({ formData }) {
  yield put(messageAction(true));
  try {
    const addConv = yield call(api.addConversation, formData);
    if (addConv.success) {
      yield put(notifySuccess('Conversation added successfully.'));
      yield put(getConversation());
      yield put(addMessageAction(false));
    }
    yield put(messageAction(false));
    return;
  } catch (e) {
    yield put(messageAction(false));
    yield put(notifyError(e));
  }
}


export default function* followingSaga() {
  yield takeLatest(GET_CONVERSATION_DATA, getConversationDeatils);
  yield takeLatest(GET_CONVERSATION_BY_ID, getConversationDeatilsById);
  yield takeLatest(ADD_CONVERSATION_REPLLY, addReply);
  yield takeLatest(ADD_CONVERSATION, addConversation);
}
