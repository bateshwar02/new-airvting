
import cookie from 'cookies-js';
import Request from '../utils/request';
import Utils from '../utils/common';

// export async function getUsers() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   return response.json();
// }

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

  bookMarkApiAction(id) {
    const url = `api/v1/posts/${id}/bookmark `;
    return Request.get(url);
  },
};
export default Service;
