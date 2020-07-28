import Request from '../../utils/request';

const Service = {
  getCategories() {
    return Request.get('api/v1/get_post_categories');
  },

  addPost(formData) {
    const url = 'api/v1/posts';
    return Request.post(url, formData);
  },
  getPostDataByUser(id) {
    const url = `api/v1/users/${id}/products?paginate=1&perPage=100&maxId=null`;
    return Request.get(url);
  },

};
export default Service;
