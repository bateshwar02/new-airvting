
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

  logout() {
    Service.clearCredentials('token', 'userId');
    return Request.get('api/v1/signOut');
  },
  clearCredentials(token, userId) {
    cookie.expire(token);
    cookie.expire(userId);
  },
};
export default Service;