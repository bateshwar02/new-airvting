import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_CATEGORY, ADD_POST, GET_PRODUCT_LIST } from './constants';
import {
  updateInProcess, updateCatOption, updatePostAction, updatePostData, updateProduct
} from './actions';
import Utils from '../../utils/common';
import api from './api';

function* getConversationDeatils() {
  try {
    const catData = yield call(api.getCategories);
    if (catData.success) {
      const catArr = catData.data.categoriesDetail.map(item => ({ value: item._id, label: item.title }));
      yield put(updateCatOption(catArr));
    }
  } catch (e) {
    console.log(e);
  }
}

function* addPostSaga({ formData }) {
  yield put(updateInProcess(true));
  try {
    const addConv = yield call(api.addPost, formData);
    if (addConv.success) {
      const { data: { postDetail } } = addConv;
      if (!Utils.isUndefinedOrNullOrEmptyObject(postDetail)) {
        yield put(updatePostData(postDetail));
      }
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    console.log(e);
  }
}

function* getProductSaga({ id }) {
  try {
    const postData = yield call(api.getPostDataByUser, id);
    if (postData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(postData.data)) {
        const { data: { productDetail } } = postData;
        console.log('productDetail === ', productDetail);
        yield put(updateProduct(productDetail));
      }
    }
  } catch (e) {
    console.log(e);
  }
}


export default function* liveSaga() {
  yield takeLatest(GET_CATEGORY, getConversationDeatils);
  yield takeLatest(ADD_POST, addPostSaga);
  yield takeLatest(GET_PRODUCT_LIST, getProductSaga);
}
