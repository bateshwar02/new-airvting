import {
  USER_DATA, DATA_BY_CATEGORY, BOOKMARK_ACTION, GET_CATEGORY, Is_PROCESS_ACTION, UPDATE_CATEGORY_DATA, UPDATE_DATA_BY_CATEGORY, UPDATE_VIDEO
} from './constatnt';

export function updateUserData({ userData }) {
  return {
    type: USER_DATA,
    userData,
  };
}

export function getDataByCategory({ categoryId }) {
  return {
    type: DATA_BY_CATEGORY,
    categoryId,
  };
}

export function addBookMark({ id }) {
  return {
    type: BOOKMARK_ACTION,
    id,
  };
}

export function getCategoryData() {
  return {
    type: GET_CATEGORY,
  };
}

export function updateInProcess(data) {
  return {
    type: Is_PROCESS_ACTION,
    inProcess: data,
  };
}

export function updateCategoryData({ categoryData, inProcess = false }) {
  return {
    type: UPDATE_CATEGORY_DATA,
    categoryData,
    inProcess,
  };
}

export function updateDataByCategory(data) {
  return {
    type: UPDATE_DATA_BY_CATEGORY,
    inProcess: data,
  };
}

export function updateVideosObj(data) {
  return {
    type: UPDATE_VIDEO,
    mediaObj: data,
  };
}
