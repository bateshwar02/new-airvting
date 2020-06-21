/*
 *
 * MyChannel actions
 *
 */

import {
  UPDATE_DATA, UPDATE_IN_PROCESS, GET_CONVERSATION_DATA, ADD_CONVERSATION, UPDATE_CONVERSATION, GET_CONVERSATION_BY_ID
} from './constants';

export function updateData(messageData) {
  return {
    type: UPDATE_DATA,
    messageData
  };
}

export function updateInProcess(inProcess) {
  return {
    type: UPDATE_IN_PROCESS,
    inProcess
  };
}

export function getConversation() {
  return {
    type: GET_CONVERSATION_DATA,
  };
}

export function addReply(formData, id) {
  return {
    type: ADD_CONVERSATION,
    formData,
    id
  };
}

export function updateConversationById(conversionDataById) {
  return {
    type: UPDATE_CONVERSATION,
    conversionDataById
  };
}

export function getConversationById(id) {
  return {
    type: GET_CONVERSATION_BY_ID,
    id
  };
}
