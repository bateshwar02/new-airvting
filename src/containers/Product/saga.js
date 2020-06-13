// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import { notifyError, notifySuccess, addProductAction } from '../App/action';

import { ADD_PRODUCT_DATA, GET_PRODUCT_CATEGORY_OPTION, CLOSE_MODAL } from './constants';
import { updateInProcess, updateProductCategoryOption } from './actions';
import api from './api';

function* addProduct({ formData }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const addProd = yield call(api.addProduct, formData);
    if (addProd.success) {
      yield put(notifySuccess('Product added successfully.'));
      yield put(addProductAction(false));
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    yield put(notifyError(e));
  }
}

function* getProductCategoryOption() {
  try {
    const catData = yield call(api.getCategories);
    if (catData.success) {
      const catArr = catData.data.categoriesDetail.map(item => ({ value: item._id, label: item.title }));
      yield put(updateProductCategoryOption(catArr));
    }
  } catch (e) {
    yield put(notifyError(e));
  }
}

function* closeModal() {
  try {
    yield put(addProductAction(false));
  } catch (e) {
    yield put(notifyError(e));
  }
}

export default function* productSaga() {
  yield takeLatest(ADD_PRODUCT_DATA, addProduct);
  yield takeLatest(GET_PRODUCT_CATEGORY_OPTION, getProductCategoryOption);
  yield takeLatest(CLOSE_MODAL, closeModal);
}
