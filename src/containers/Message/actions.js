/*
 *
 * MyChannel actions
 *
 */

import {
  UPDATE_DATA, UPDATE_IN_PROCESS, GET_CONVERSATION_DATA, ADD_CONVERSATION, ADD_CONVERSATION_REPLLY, UPDATE_CONVERSATION, GET_CONVERSATION_BY_ID, IS_ADD_MESSAGE, ADD_MESSAGE_ACTION, UPDATE_NOTIFICATIONS, GET_NOTIFICATION
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
    type: ADD_CONVERSATION_REPLLY,
    formData,
    id
  };
}

export function addConversation(formData) {
  return {
    type: ADD_CONVERSATION,
    formData,
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

export function addMessageAction(isAddMessage) {
  return {
    type: IS_ADD_MESSAGE,
    isAddMessage
  };
}

export function messageAction(actionInProcess) {
  return {
    type: ADD_MESSAGE_ACTION,
    actionInProcess
  };
}

export function updateNotifications(notificationData) {
  return {
    type: UPDATE_NOTIFICATIONS,
    notificationData
  };
}

export function getNotification(status) {
  return {
    type: GET_NOTIFICATION,
    status
  };
}
