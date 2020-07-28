import Request from '../../utils/request';

const Service = {
  getUserData(id) {
    const url = `api/v1/users/${id}`;
    return Request.get(url);
  },
  getPostDataByUser(id) {
    const url = `api/v1/users/${id}/posts?paginate=1&perPage=100&typePost=video,image&typePost=&bookmarks=0`;
    return Request.get(url);
  },
};
export default Service;
