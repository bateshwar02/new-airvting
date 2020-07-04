import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_CATEGORY, ADD_POST } from './constants';
import { updateInProcess, updateCatOption, updatePostAction } from './actions';

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
      yield put(updatePostAction(false));
      yield put(updateInProcess(false));
    }
    yield put(updateInProcess(false));
    return;
  } catch (e) {
    yield put(updateInProcess(false));
    console.log(e);
  }
}


export default function* liveSaga() {
  yield takeLatest(GET_CATEGORY, getConversationDeatils);
  yield takeLatest(ADD_POST, addPostSaga);
}
