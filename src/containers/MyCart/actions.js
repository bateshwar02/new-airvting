/*
 *
 * Store actions
 *
 */

import {
  UPDATE_CART, UPDATE_IN_PROCESS, GET_CART, REMOVE_CART, GET_TOKEN, GET_ADRESS, UPDATE_ADRESS, ADD_ADDRESS, ADD_ADDRESS_ACTION, UPDATE_STATE_ACTION, DELETE_ADDRESS, EDIT_ADDRESS, SELECT_ADDRESS_BY_ID, IS_EDIT_ACTION, SELECT_ADDRESS_FOR_SHIP, IS_SELECT_PAYMENT_METHOD, PAYMENT_METHOD, UPDATE_CHECKOUT_ARRAY, CHECKOUT_PRODUCT
} from './constants';

export function updateCart(cartData) {
  return {
    type: UPDATE_CART,
    cartData
  };
}

export function updateProcessAction(inProcess) {
  return {
    type: UPDATE_IN_PROCESS,
    inProcess
  };
}

export function getCart() {
  return {
    type: GET_CART,
  };
}

export function removeCart(id) {
  return {
    type: REMOVE_CART,
    id
  };
}

export function getToken() {
  return {
    type: GET_TOKEN,
  };
}

export function getAddress() {
  return {
    type: GET_ADRESS,
  };
}

export function updateAddress(addressList) {
  return {
    type: UPDATE_ADRESS,
    addressList
  };
}

export function addBiilingAddress(formData) {
  return {
    type: ADD_ADDRESS,
    formData
  };
}

export function updateAddAddressAction(isAddAddress) {
  return {
    type: ADD_ADDRESS_ACTION,
    isAddAddress
  };
}

export function updateStepAction(step) {
  return {
    type: UPDATE_STATE_ACTION,
    step
  };
}

export function editAddress(formData, id) {
  return {
    type: EDIT_ADDRESS,
    formData,
    id
  };
}

export function deleteAddress(id) {
  return {
    type: DELETE_ADDRESS,
    id
  };
}

export function updateAddressById(selectedAddressData) {
  return {
    type: SELECT_ADDRESS_BY_ID,
    selectedAddressData
  };
}

export function editAction(isEdit) {
  return {
    type: IS_EDIT_ACTION,
    isEdit
  };
}

export function updateShipAddress(selectAddressForShip) {
  return {
    type: SELECT_ADDRESS_FOR_SHIP,
    selectAddressForShip
  };
}

export function updateIsUpdateMethodAction(isPaymentMethodAction) {
  return {
    type: IS_SELECT_PAYMENT_METHOD,
    isPaymentMethodAction
  };
}

export function updatePaymentMethod(paymentType) {
  return {
    type: PAYMENT_METHOD,
    paymentType
  };
}

export function updateProdItem(checkoutProd, step, productList, count) {
  return {
    type: UPDATE_CHECKOUT_ARRAY,
    checkoutProd,
    step,
    productList,
    count
  };
}

export function checkOutProduct(prodData) {
  return {
    type: CHECKOUT_PRODUCT,
    prodData
  };
}
