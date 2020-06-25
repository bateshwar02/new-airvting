import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  addCart(formData) {
    const url = 'api/v1/paymentMethods';
    return Request.post(url, formData);
  },

  getGift() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = `api/v1/users/${userId}/gifts?paginate=1&perPage=10`;
    return Request.get(url);
  },

  getTrarnction() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = `api/v1/users/${userId}/transactions?paginate=1&perPage=10`;
    return Request.get(url);
  },


};
export default Service;
