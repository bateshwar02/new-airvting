/*
 *
 * Store reducer
 *
 */

import {
  UPDATE_CART, UPDATE_IN_PROCESS, UPDATE_ADRESS, ADD_ADDRESS_ACTION, UPDATE_STATE_ACTION, SELECT_ADDRESS_BY_ID, IS_EDIT_ACTION, SELECT_ADDRESS_FOR_SHIP, IS_SELECT_PAYMENT_METHOD, PAYMENT_METHOD, UPDATE_CHECKOUT_ARRAY
} from './constants';

export const initialState = {
  cartData: {}, inProcess: true, addressList: [], isAddAddress: false, step: 1, isEdit: false, selectedAddressData: {}, selectAddressForShip: {}, isPaymentMethodAction: false, checkoutProd: [], count: {}, productList: []
};

/* eslint-disable default-case, no-param-reassign */
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        cartData: action.cartData
      };
    case UPDATE_IN_PROCESS:
      return {
        ...state,
        inProcess: action.inProcess
      };
    case UPDATE_ADRESS:
      return {
        ...state,
        addressList: action.addressList
      };

    case ADD_ADDRESS_ACTION:
      return {
        ...state,
        isAddAddress: action.isAddAddress
      };
    case UPDATE_STATE_ACTION:
      return {
        ...state,
        step: action.step
      };
    case SELECT_ADDRESS_BY_ID:
      return {
        ...state,
        selectedAddressData: action.selectedAddressData
      };
    case IS_EDIT_ACTION:
      return {
        ...state,
        isEdit: action.isEdit,
      };
    case SELECT_ADDRESS_FOR_SHIP:
      return {
        ...state,
        selectAddressForShip: action.selectAddressForShip
      };
    case IS_SELECT_PAYMENT_METHOD:
      return {
        ...state,
        isPaymentMethodAction: action.isPaymentMethodAction
      };
    case PAYMENT_METHOD:
      return {
        ...state,
        paymentType: action.paymentType
      };
    case UPDATE_CHECKOUT_ARRAY:
      return {
        ...state,
        checkoutProd: action.checkoutProd,
        step: action.step,
        productList: action.productList,
        count: action.count
      };
    default:
      return state;
  }
}
