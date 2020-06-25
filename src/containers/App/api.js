
import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  getUserProfileDetails() {
    const token = cookie.get('token');
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(token) || Utils.isUndefinedOrNullOrEmpty(userId)) {
      return null;
    }
    const url = `api/v1/users/${userId}`;
    const header = {
      authorization: `Bearer ${token}`,
    };
    return Request.get(url, header);
  },

  updateNotification() {
    const token = cookie.get('token');
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(token) || Utils.isUndefinedOrNullOrEmpty(userId)) {
      return null;
    }
    return Request.get(`api/v1/users/${userId}/notifications?paginate=1&perPage=10&isMessage=false`);
  },

  getMessageData() {
    const token = cookie.get('token');
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(token) || Utils.isUndefinedOrNullOrEmpty(userId)) {
      return null;
    }
    return Request.get(`api/v1/users/${userId}/notifications?paginate=1&perPage=10&isMessage=true`);
  },

  verifyEmail() {
    const token = cookie.get('token');
    if (Utils.isUndefinedOrNullOrEmpty(token)) {
      return null;
    }
    return Request.post('api/v1/verify_email', {});
  },

  logout() {
    const token = cookie.get('token');
    if (Utils.isUndefinedOrNullOrEmpty(token)) {
      return null;
    }
    const header = {
      authorization: `Bearer ${token}`,
    };
    const response = Request.get('api/v1/signOut', header);
    Service.clearCredentials('token', 'userId');
    return response;
  },
  clearCredentials(token, userId) {
    cookie.expire(token);
    cookie.expire(userId);
  },
};
export default Service;
