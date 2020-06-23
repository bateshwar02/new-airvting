import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  updateUserData(userData, id) {
    const url = `api/v1/users/${id}`;
    return Request.imgageUpload(url, userData);
  },

  updatePass(passData, id) {
    const url = `api/v1/users/changePass/${id}`;
    return Request.post(url, passData);
  },

  resetPass(passData) {
    const url = 'api/v1/reset_password';
    return Request.post(url, passData);
  },

  verfyEmail(token) {
    const url = 'api/v1/users/verify_email_action';
    return Request.post(url, token);
  },

  getGift() {
    const id = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(id)) {
      return null;
    }
    const url = `api/v1/users/${id}/gifts?paginate=1&perPage=10`;
    return Request.get(url);
  }
};
export default Service;
