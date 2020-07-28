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
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = `api/v1/users/${userId}/cart/products/delete`;
    return Request.post(url, { user_id: userId, _id: id });
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

  getAddress() {
    return Request.get('api/v1/address');
  },

  addAddress(formData) {
    return Request.post('api/v1/address', formData);
  },

  deleteAddress(id) {
    return Request.delete(`api/v1/address/${id}`, {});
  },

  editAddress(formData, id) {
    return Request.put(`api/v1/address/${id}`, formData);
  },

  checkOut(prodData) {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    return Request.post(`api/v1/users/${userId}/checkout`, prodData);
  }

};
export default Service;
