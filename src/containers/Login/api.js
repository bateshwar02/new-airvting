import cookie from 'cookies-js';
import Request from '../../utils/request';

const Service = {
  signUp(formData) {
    const url = 'api/v1/signUp';
    return Request.post(url, formData);
  },

  signIn(formData) {
    const url = 'api/v1/signIn';
    return Request.post(url, formData);
  },

  setCredential(ofbToken, userId) {
    if (ofbToken) {
      cookie.set('token', ofbToken, { expires: Infinity });
    }
    if (userId) {
      cookie.set('userId', userId, { expires: Infinity });
    }
  },

  logout() {
    return Service.clearCredentials('auth-token', 'organisationId');
  },

  clearCredentials(key, organisationKey) {
    cookie.expire(key);
    cookie.expire(organisationKey);
  },
};
export default Service;
