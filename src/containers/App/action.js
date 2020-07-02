import { toast } from 'react-toastify';
import {
  NOTIFICATION_SUCCESS, NOTIFICATION_ERROR, NOTIFICATION_WARN, UPDATE_USER_DATA, GET_USERS_SAGA, UPDATE_VIDEO_OBJ, LOGOUT, IS_ADD_PRODUCT, GET_NOTIFICATION, UPDATE_NOTIFICATION, UPDATE_MESSAGE, GET_MESSAGE, UPDATE_IN_PROCCESS, VERIFY_EMAIL, UPDATE_SEARCH
} from './constants';


export function notifySuccess(msg = 'Success') {
  toast.success(msg);
  return {
    type: NOTIFICATION_SUCCESS,
  };
}

export function notifyError(msg = { message: 'Error' }) {
  toast.error(msg.message);
  return {
    type: NOTIFICATION_ERROR,
  };
}

export function notifyWarn(msg = 'Warning') {
  toast.warn(msg);
  return {
    type: NOTIFICATION_WARN,
  };
}

export function updateInProcess(inProcess) {
  return {
    type: UPDATE_IN_PROCCESS,
    inProcess,
  };
}

export function updateUserData({ userData }) {
  return {
    type: UPDATE_USER_DATA,
    userData,
  };
}

export function getUserData() {
  return {
    type: GET_USERS_SAGA,
  };
}

export function updateMediaObj({ mediaObj }) {
  return {
    type: UPDATE_VIDEO_OBJ,
    mediaObj,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function addProductAction(isAddProduct) {
  return {
    type: IS_ADD_PRODUCT,
    isAddProduct
  };
}

export function getNotification() {
  return {
    type: GET_NOTIFICATION,
  };
}

export function updateNotification(notification) {
  return {
    type: UPDATE_NOTIFICATION,
    notification,
  };
}

export function getMessage() {
  return {
    type: GET_MESSAGE,
  };
}

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message,
  };
}

export function verfyEmail() {
  return {
    type: VERIFY_EMAIL
  };
}

export function updateSearch(isSearch) {
  return {
    type: UPDATE_SEARCH,
    isSearch
  };
}
