import Request from '../../utils/request';

const Service = {
  updateUserData(userData, id) {
    const url = `api/v1/users/${id}`;
    return Request.imageUpload(url, userData, 'multipart/form-data');
  },

  updatePass(passData, id) {
    const url = `api/v1/users/changePass/${id}`;
    return Request.post(url, passData);
  },

  resetPass(passData){
    const url ='api/v1/reset_password';
    return Request.post(url, passData);
  }
};
export default Service;
