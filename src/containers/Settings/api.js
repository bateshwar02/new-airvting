import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  updateUserData(userData, id) {
    const url = `api/v1/users/${id}`;
    return Request.imgageUpload(url, userData);
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
  },

  changePassword(data) {
    const url = 'api/v1/change_password';
    return Request.post(url, data);
  },

  deActivateAccount() {
    const url = 'api/v1/users/deActive';
    return Request.post(url, {});
  }

};
export default Service;
