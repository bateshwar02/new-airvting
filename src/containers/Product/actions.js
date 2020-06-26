/*
 *
 * Featured actions
 *
 */

import {
  UPDATE_ACTION, IS_PROCESS_ACTION, ADD_PRODUCT_DATA, GET_PRODUCT_CATEGORY_OPTION, UPDATE_PRODUCT_CATEGORY_OPTION, CLOSE_MODAL, UPDATE_PRODUCT_DETAILS, GET_PRODUCT_DETAILS, ADD_TO_CART
} from './constants';

export function updateData({ featuredData, inProcess = false }) {
  return {
    type: UPDATE_ACTION,
    featuredData,
    inProcess
  };
}

export function addProduct(formData) {
  return {
    type: ADD_PRODUCT_DATA,
    formData
  };
}

export function updateProductCategoryOption(categoryOption) {
  return {
    type: UPDATE_PRODUCT_CATEGORY_OPTION,
    categoryOption,
  };
}

export function getProductCategoryOption() {
  return {
    type: GET_PRODUCT_CATEGORY_OPTION,
  };
}

export function updateInProcess({ inProcess }) {
  return {
    type: IS_PROCESS_ACTION,
    inProcess,
  };
}

export function closeAddProductModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function updateProductDetails(productDetails) {
  return {
    type: UPDATE_PRODUCT_DETAILS,
    productDetails
  };
}

export function getProductDetails(id) {
  return {
    type: GET_PRODUCT_DETAILS,
    id
  };
}

export function addToCart(formData) {
  return {
    type: ADD_TO_CART,
    formData
  };
}
