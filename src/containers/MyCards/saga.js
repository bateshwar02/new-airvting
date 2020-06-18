import { takeLatest, call, put } from 'redux-saga/effects';
import Utils from '../../utils/common';
import {
  notifySuccess, notifyError, updateUserData
} from '../App/action';
import { GET_CARDS_DETAILS, ADD_CARDS_DETAILS, } from './constants';
import { updateCards, updateProcessAction } from './actions';
import api from './api';
import Navigation from '../../utils/navigation';


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
      console.log('sign in error ====', e);
      yield put(notifyError(e));
    }
  }
  
  
  export default function* loginSaga() {
    yield takeLatest(ADD_CARDS_DETAILS, addCardSaga);
    yield takeLatest(GET_CARDS_DETAILS, getCardSaga);
  }
  