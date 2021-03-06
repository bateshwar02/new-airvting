import {
  USER_DATA, DATA_BY_CATEGORY, BOOKMARK_ACTION, GET_CATEGORY, Is_PROCESS_ACTION, UPDATE_CATEGORY_DATA, UPDATE_DATA_BY_CATEGORY, UPDATE_VIDEO, IS_SHARE, SHARE_URL, GET_SEARCH_DATA, UPDATE_SEARCH_DATA, UPDATE_CURRENT_POST, GET_CURRENT_POST, UPDATE_SEARCH, UPDATE_SEARCH_VALUE
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

export function updateShare(isShare) {
  return {
    type: IS_SHARE,
    isShare
  };
}

export function updateShareUrl(url) {
  return {
    type: SHARE_URL,
    url
  };
}

export function getSearchData(keyword) {
  return {
    type: GET_SEARCH_DATA,
    keyword
  };
}

export function updateCurrentPost(currentPost) {
  return {
    type: UPDATE_CURRENT_POST,
    currentPost
  };
}

export function updateSearchData(searchData, isSearch = false, searchValue = '') {
  return {
    type: UPDATE_SEARCH_DATA,
    searchData,
    searchValue,
    isSearch
  };
}

export function getCurrentPost() {
  return {
    type: GET_CURRENT_POST
  };
}

export function updateSearch(isSearch) {
  return {
    type: UPDATE_SEARCH,
    isSearch
  };
}

export function updateSearchValue(searchValue) {
  return {
    type: UPDATE_SEARCH_VALUE,
    searchValue
  };
}
