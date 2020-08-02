import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import {
  notifySuccess, notifyError
} from '../App/action';
import {
  GET_CARDS_DETAILS, ADD_CARDS_DETAILS, DELETE_CARD, GET_CARD_DETAILS
} from './constants';
import {
  updateCards, updateProcessAction, gertCards, updateCardDetails, isAddCard
} from './actions';
import api from './api';

function* addCardSaga({ formData }) {
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

function* getCardSaga() {
  try {
    const apiData = yield call(api.getCards);
    if (apiData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
        yield put(updateCards(apiData.data));
        yield put(updateProcessAction(false));
        return;
      }
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: apiData.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    yield put(notifyError(e));
  }
}

function* deleteCardSaga({ id }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.deleteCard, id);
    if (apiData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
        yield put(gertCards());
        yield put(notifySuccess('Your card details has been deleted successfully.'));
        return;
      }
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: apiData.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    yield put(notifyError(e));
  }
}

function* getCardDetailsSaga({ id }) {
  yield put(updateProcessAction(true));
  try {
    const apiData = yield call(api.getCardDetailsCall, id);
    if (apiData.success) {
      if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
        yield put(updateCardDetails(apiData.data));
        yield put(updateProcessAction(false));
        yield put(isAddCard(true));
        return;
      }
    }
    yield put(updateProcessAction(false));
    yield put(notifyError({ message: apiData.message }));
  } catch (e) {
    yield put(updateProcessAction(false));
    yield put(notifyError(e));
  }
}


export default function* loginSaga() {
  yield takeLatest(ADD_CARDS_DETAILS, addCardSaga);
  yield takeLatest(GET_CARDS_DETAILS, getCardSaga);
  yield takeLatest(DELETE_CARD, deleteCardSaga);
  yield takeLatest(GET_CARD_DETAILS, getCardDetailsSaga);
}
