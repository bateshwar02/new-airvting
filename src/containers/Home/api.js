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

  getSearchData(keyword) {
    const url = `api/v1/search?type=post&keyword=${keyword}&paginate=1&perPage=20&maxId=0`;
    return Request.get(url);
  },

  getCurrentData() {
    const url = 'api/v1/posts?filter=new&paginate=1&perPage=5&maxId=null&typePost=video,stream&isShowAdver=false';
    return Request.get(url);
  }

};
export default Service;
