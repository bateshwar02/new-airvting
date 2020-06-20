import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  addCart(formData) {
    const url = 'api/v1/paymentMethods';
    return Request.post(url, formData);
  },

  updateCart(formData, id) {
    const url = `api/v1/paymentMethods/${id}`;
    return Request.post(url, formData);
  },

  getCarts() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = `api/v1/users/${userId}/cart`;
    return Request.get(url);
  },

  deleteCart(id) {
    const url = `api/v1/paymentMethods/${id}`;
    return Request.get(url);
  },

  getCartDetailsCall(id) {
    const url = `api/v1/users/${id}/paymentMethods?paginate=1&perPage=20`;
    return Request.get(url);
  },

  getToken() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = 'api/v1/airTokens?paginate=1&perPage=10';
    return Request.get(url);
  },

};
export default Service;
