/*
 *
 * Live actions
 *
 */

import {
  UPDATE_IN_PROCESS, GET_CATEGORY, ADD_POST, UPDATE_POST_ACTION, UPDATE_CATEGORY_OPTION, UPDATE_POST_DATA, GET_PRODUCT_LIST, UPDATE_PRODUCT_OPTION
} from './constants';

export function updateInProcess(inProcess) {
  return {
    type: UPDATE_IN_PROCESS,
    inProcess
  };
}

export function getCategoryOp() {
  return {
    type: GET_CATEGORY
  };
}

export function addPost(formData) {
  return {
    type: ADD_POST,
    formData
  };
}

export function updatePostAction(isAddPost) {
  return {
    type: UPDATE_POST_ACTION,
    isAddPost
  };
}

export function updateCatOption(catOption) {
  return {
    type: UPDATE_CATEGORY_OPTION,
    catOption
  };
}

export function updatePostData(postData, isAddPost = false) {
  return {
    type: UPDATE_POST_DATA,
    postData,
    isAddPost
  };
}

export function getProductList(id) {
  return {
    type: GET_PRODUCT_LIST,
    id
  };
}

export function updateProduct(porductData) {
  return {
    type: UPDATE_PRODUCT_OPTION,
    porductData
  };
}
