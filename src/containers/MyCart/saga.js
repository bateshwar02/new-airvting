import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import {
  notifySuccess, notifyError
} from '../App/action';
import {
  GET_CART, REMOVE_CART, GET_TOKEN, GET_ADRESS, ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, CHECKOUT_PRODUCT
} from './constants';
import {
  updateCart, updateProcessAction, getCart, updateAddress, getAddress, updateAddAddressAction, editAction
} from './actions';
import api from './api';
import Navigation from '../../utils/navigation';

function* getTokenSaga({ formData }) {
  yield put(updateProcessAction(true));
  try {
    const signUp = yield call(api.signUp, formData);
    if (signUp.success) {
      yield put(notifySuccess('User sign-up successfully'));
      if (!Utils.isUndefinedOrNullOrEmptyObject(signUp.data)) {
        yield put(updateProcessAction(false));
      }
      return;
    }
    yield put(notifyError({ message: signUp.message }));
    yield put(updateProcessAction(false));
  } catch (e) {
    yield put(updateProcessAction(false));
    yield put(notifyError(e));
  }
}

function* getCartSaga() {
  try {
    const apiData = yield call(api.getCarts);
    if (apiData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
        yield put(updateCart(apiData.data));
        yield put(updateProcessAction(false));
        return;
      }
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: apiData.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}

function* removeCartSaga({ id }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.deleteCart, id);
    if (apiData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
        yield put(getCart());
        yield put(notifySuccess('Remove from cart.'));
        return;
      }
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: apiData.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}

function* getAddressSaga() {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.getAddress);
    if (apiData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
        yield put(updateAddress(apiData.data.address));
      }
    }
    yield put(updateProcessAction(false));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}

function* addAddressSaga({ formData }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.addAddress, formData);
    if (apiData.success) {
      yield put(updateAddAddressAction(false));
      yield put(getAddress());
    }
    yield put(updateProcessAction(false));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}

function* editAddressSaga({ formData, id }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.editAddress, formData, id);
    if (apiData.success) {
      yield put(editAction(false));
      yield put(getAddress());
    }
    yield put(updateProcessAction(false));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}

function* deleteAddressSaga({ id }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.deleteAddress, id);
    if (apiData.success) {
      yield put(updateAddAddressAction(false));
      yield put(getAddress());
    }
    yield put(updateProcessAction(false));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}

function* checkOutProductSaga({ prodData }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.checkOut, prodData);
    if (apiData.success) {
      yield put(notifySuccess(apiData.message));
      Navigation.push('/sh/airvtingweb/');
      yield put(updateProcessAction(false));
      return;
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: apiData.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    console.log(e);
  }
}


export default function* loginSaga() {
  yield takeLatest(GET_CART, getCartSaga);
  yield takeLatest(REMOVE_CART, removeCartSaga);
  yield takeLatest(GET_TOKEN, getTokenSaga);
  yield takeLatest(GET_ADRESS, getAddressSaga);
  yield takeLatest(ADD_ADDRESS, addAddressSaga);
  yield takeLatest(EDIT_ADDRESS, editAddressSaga);
  yield takeLatest(DELETE_ADDRESS, deleteAddressSaga);
  yield takeLatest(CHECKOUT_PRODUCT, checkOutProductSaga);
}
