/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const NOTIFICATION_SUCCESS = 'app/App/NOTIFICATION_SUCCESS';
export const NOTIFICATION_ERROR = 'app/App/NOTIFICATION_ERROR';
export const NOTIFICATION_WARN = 'app/App/NOTIFICATION_WARN';
export const PAGE_INFO = 'app/App/PAGE_INFO';
export const IN_PROCESS_ACTION = 'app/App/IN_PROCESS_ACTION';
export const USER_DATA = 'app/App/USER_DATA';
export const UPDATE_USER_DATA = 'app/App/UPDATE_USER_DATA';
export const GET_USERS_SAGA = 'app/App/GET_USERS_SAGA';
export const UPDATE_VIDEO_OBJ = 'app/App/UPDATE_VIDEO_OBJ';
export const LOGOUT = 'app/App/LOGOUT';
export const IS_ADD_PRODUCT = 'app/App/IS_ADD_PRODUCT';
export const GET_NOTIFICATION = 'app/App/GET_NOTIFICATION';
export const UPDATE_NOTIFICATION = 'app/App/UPDATE_NOTIFICATION';
export const GET_MESSAGE = 'app/App/GET_MESSAGE';
export const UPDATE_MESSAGE = 'app/App/UPDATE_MESSAGE';
export const UPDATE_IN_PROCCESS = 'app/App/UPDATE_IN_PROCCESS';
export const VERIFY_EMAIL = 'app/App/VERIFY_EMAIL';
