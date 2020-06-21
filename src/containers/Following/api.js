import cookie from 'cookies-js';
import Request from '../../utils/request';

const Service = {
  followingData() {
    const headers = {};
    headers.authorization = `Bearer ${cookie.get('token')}`;
    const url = `api/v1/users/relationships?paginate=1&perPage=20&userId=${cookie.get('userId')}&type=fallowing`;
    return Request.get(url);
  },
};
export default Service;
