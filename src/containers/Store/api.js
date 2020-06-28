import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  getAirToken() {
    return Request.get('api/v1/airTokens?paginate=1&perPage=10');
  },

  buyAirToken(formData) {
    const url = 'api/v1/airTokens/buy';
    return Request.post(url, formData);
  },

  getProductDetails(id) {
    const url = `api/v1/products/${id}`;
    return Request.get(url);
  },

  addToCart(data) {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return null;
    }
    const url = `api/v1/users/${userId}/cart `;
    return Request.post(url, data);
  }

};
export default Service;
