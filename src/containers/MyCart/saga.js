import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import {
  notifySuccess, notifyError
} from '../App/action';
import {
  GET_CART, REMOVE_CART, GET_TOKEN
} from './constants';
import {
  updateCart, updateProcessAction, getCart
} from './actions';
import api from './api';

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
    const apiData = yield call(api.deleteCard, id);
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


export default function* loginSaga() {
  yield takeLatest(GET_CART, getCartSaga);
  yield takeLatest(REMOVE_CART, removeCartSaga);
  yield takeLatest(GET_TOKEN, getTokenSaga);
}
