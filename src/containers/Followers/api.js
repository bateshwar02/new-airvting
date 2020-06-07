import cookie from 'cookies-js';
import Request from '../../utils/request';

const Service = {
  followersData() {
    const headers = {};
    headers.authorization = `Bearer ${cookie.get('token')}`;
    const url = `api/v1/users/relationships?paginate=1&perPage=20&userId=${cookie.get('userId')}&type=fallowers`;
    return Request.get(url);
  },
};
export default Service;
