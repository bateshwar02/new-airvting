import Request from '../../utils/request';

const Service = {
  getCategory() {
    const url = '/api/v1/get_post_categories';
    return Request.get(url);
  },

  getDataByCategory(id) {
    const url = `api/v1/get_post_categories/${id}/posts?typePost=video,stream&paginate=1&perPage=10&maxId=null`;
    return Request.get(url);
  },

};
export default Service;
