import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  getExploreData(type) {
    const url = `api/v1/posts?filter=${type}&typePost=video,stream&paginate=1&perPage=100&isShowAdver=false`;
    return Request.get(url);
  },

  getPeopleData(type) {
    const url = `api/v1/users/explore?paginate=1&perPage=100&type=${type}`;
    return Request.get(url);
  },

  followUser(id) {
    if (Utils.isUndefinedOrNullOrEmptyObject(id)) {
      return false;
    }
    const url = `api/v1/users/${id}/fallow `;
    return Request.get(url);
  },

  productList() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return null;
    }
    return Request.get(`api/v1/users/${userId}/products?paginate=1&perPage=100&maxId=null`);
  },

  productListByCat(id) {
    return Request.get(`api/v1/users/${id}/products?paginate=1&perPage=100&maxId=null`);
  },

  getProductCategoryData(id) {
    const url = `api/v1/categories/${id}/products`;
    return Request.get(url);
  },

  productLikedAction(id) {
    const url = `api/v1/products/${id}/like`;
    return Request.get(url);
  }


};
export default Service;
