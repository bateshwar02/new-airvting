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

  socialLogin(formData) {
    const url = 'api/v1/socialSignIn';
    return Request.post(url, formData);
  },

  emailToResetPass(formData) {
    const url = 'api/v1/forgotPassword';
    return Request.post(url, formData);
  }

};
export default Service;
