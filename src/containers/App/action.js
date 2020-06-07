import { toast } from 'react-toastify';
import {
  NOTIFICATION_SUCCESS, NOTIFICATION_ERROR, NOTIFICATION_WARN, IN_PROCESS_ACTION, UPDATE_USER_DATA, GET_USERS_SAGA, UPDATE_VIDEO_OBJ
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

export function updateInProcess({ inProcess }) {
  return {
    type: IN_PROCESS_ACTION,
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
