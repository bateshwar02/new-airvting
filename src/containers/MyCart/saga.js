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
        const data = {
          productDetail: [{
            price: 200,
            priceSale: 200,
            startedAt: '2020-05-28T00:00:00.0000Z',
            description: 'Hey buy this item',
            discount: 0,
            totalLike: 0,
            totalPhotos: 2,
            expiredAt: '2021-05-28T00:00:00.0000Z',
            condition: 'new',
            productCategories: [{ sid: 'afac8fcb-8ddf-11ea-a7e2-e8d0fcec03e2', title: 'Architecture & Arts', laravel_through_key: 42 }],
            createdAt: '2020-05-29T05:07:13.000000Z',
            priceWhenStream: {
              startedAt: '2019-11-28T23:11:15.965Z', expiredAt: '2019-11-28T23:13:15.965Z', discount: '30%', priceDiscount: 16.79299999999999926103555480949580669403076171875, isActive: false
            },
            _id: '4245729e-a16a-11ea-93ad-fa163eeeaebe',
            content: 'Hey buy this item',
            isLike: false,
            airToken: 0,
            displayName: 'new testing product for images',
            title: 'new testing product for images',
            featuredImages: [{ featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/products/1590728833385garahejam_plus.png' }, { featuredImage: 'https://vridhisoftech.co.in/sh/airvtingApis/public/products/1590728833549issue6.png' }]
          }]
        };
        // yield put(updateCart(apiData.data));
        yield put(updateCart(data));
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
    console.log('sign in error ====', e);
    yield put(notifyError(e));
  }
}

// function* getCardDetailsSaga({ id }) {
//   yield put(updateProcessAction(true));
//   try {
//     const apiData = yield call(api.getCardDetailsCall, id);
//     if (apiData.success) {
//       if (!Utils.isUndefinedOrNullOrEmptyObject(apiData.data)) {
//         yield put(updateCardDetails(apiData.data));
//         yield put(updateProcessAction(false));
//         yield put(isAddCard(true));
//         return;
//       }
//     }
//     yield put(updateProcessAction(false));
//     yield put(notifyError({ message: apiData.message }));
//   } catch (e) {
//     yield put(updateProcessAction(false));
//     console.log('sign in error ====', e);
//     yield put(notifyError(e));
//   }
// }


export default function* loginSaga() {
  yield takeLatest(GET_CART, getCartSaga);
  yield takeLatest(REMOVE_CART, removeCartSaga);
  yield takeLatest(GET_TOKEN, getTokenSaga);
//   yield takeLatest(GET_CARD_DETAILS, getCardDetailsSaga);
}
