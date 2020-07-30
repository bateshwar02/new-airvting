// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, call, put } from 'redux-saga/effects';
import { notifySuccess, addProductAction } from '../App/action';

import {
  ADD_PRODUCT_DATA, GET_PRODUCT_CATEGORY_OPTION, CLOSE_MODAL, GET_PRODUCT_DETAILS, ADD_TO_CART
} from './constants';
import { updateInProcess, updateProductCategoryOption, updateProductDetails } from './actions';
import { getCart } from '../MyCart/actions';
import api from './api';

function* addProduct({ formData }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const addProdApi = yield call(api.addProduct, formData);
    const addProd = JSON.parse(addProdApi);
    if (addProd.success) {
      yield put(notifySuccess(addProd.message));
      yield put(addProductAction(false));
    }
    yield put(updateInProcess({ inProcess: false }));
    return;
  } catch (e) {
    yield put(updateInProcess({ inProcess: false }));
    console.log(e);
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
    console.log(e);
  }
}

function* getProductDetails({ id }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const apiData = yield call(api.getProductDetails, id);
    if (apiData.success) {
      const { productDetail } = apiData.data;
      yield put(updateProductDetails(productDetail));
    }
    yield put(updateInProcess({ inProcess: false }));
  } catch (e) {
    console.log(e);
    yield put(updateInProcess({ inProcess: false }));
  }
}

function* closeModal() {
  try {
    yield put(addProductAction(false));
  } catch (e) {
    console.log(e);
  }
}

function* addTocartSaga({ formData }) {
  yield put(updateInProcess({ inProcess: true }));
  try {
    const apiData = yield call(api.addToCart, formData);
    if (apiData.success) {
      yield put(notifySuccess('Product added to cart successfully.'));
      yield put(getCart());
    }
    yield put(updateInProcess({ inProcess: false }));
  } catch (e) {
    console.log(e);
    yield put(updateInProcess({ inProcess: false }));
  }
}

export default function* productSaga() {
  yield takeLatest(ADD_PRODUCT_DATA, addProduct);
  yield takeLatest(GET_PRODUCT_CATEGORY_OPTION, getProductCategoryOption);
  yield takeLatest(CLOSE_MODAL, closeModal);
  yield takeLatest(GET_PRODUCT_DETAILS, getProductDetails);
  yield takeLatest(ADD_TO_CART, addTocartSaga);
}
