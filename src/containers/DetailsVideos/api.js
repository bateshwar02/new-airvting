import Request from '../../utils/request';
import Utils from '../../utils/common';

const Service = {
  getVideoDetails(id) {
    if (Utils.isUndefinedOrNullOrEmpty(id)) {
      return false;
    }
    const url = `api/v1/posts/${id}`;
    return Request.get(url);
  },

  addComment(data, postId) {
    if (Utils.isUndefinedOrNullOrEmptyObject(data)) {
      return false;
    }
    const url = `api/v1/posts/${postId}/comments`;
    return Request.post(url, data);
  },

  getCommentData(id) {
    if (Utils.isUndefinedOrNullOrEmptyObject(id)) {
      return false;
    }
    const url = `api/v1/posts/${id}/comments?paginate=1&perPage=20&maxId=null`;
    return Request.get(url);
  },

  followUser(id) {
    if (Utils.isUndefinedOrNullOrEmptyObject(id)) {
      return false;
    }
    const url = `api/v1/users/${id}/fallow `;
    return Request.get(url);
  }

};
export default Service;
