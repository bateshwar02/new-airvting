import cookie from 'cookies-js';
import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  getHistoryData() {
    const url = 'api/v1/posts?filter=featured&paginate=1&perPage=10&maxId=null&typePost=video,stream&isShowAdver=false';
    return Request.get(url);
  },
  getBookMark() {
    const userId = cookie.get('userId');
    if (Utils.isUndefinedOrNullOrEmpty(userId)) {
      return false;
    }
    const url = `api/v1/users/${userId}/bookmark_posts?paginate=1&perPage=50&typePost=stream,video,image&bookmarks=1`;
    return Request.get(url);
  },
};
export default Service;
