import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  getCategories() {
    return Request.get('api/v1/get_post_categories');
  },

  addProduct(formData) {
    const url = 'api/v1/products';
    return Request.imgageUpload(url, formData);
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
    const url = `api/v1/users/${userId}/cart`;
    return Request.post(url, data);
  }

};
export default Service;
