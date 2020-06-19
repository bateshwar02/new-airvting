import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  addCard(formData) {
    const url = 'api/v1/paymentMethods';
    return Request.post(url, formData);
  },

  updateCard(formData, id) {
    const url = `api/v1/paymentMethods/${id}`;
    return Request.post(url, formData);
  },

  getCards() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = `api/v1/users/${userId}/paymentMethods?paginate=1&perPage=20`;
    return Request.get(url);
  },

  deleteCard(id) {
    const url = `api/v1/paymentMethods/${id}`;
    return Request.get(url);
  },

  getCardDetailsCall(id) {
    const url = `api/v1/users/${id}/paymentMethods?paginate=1&perPage=20`;
    return Request.get(url);
  }

};
export default Service;
