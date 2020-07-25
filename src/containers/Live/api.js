import Request from '../../utils/request';

const Service = {
  getCategories() {
    return Request.get('api/v1/get_post_categories');
  },

  addPost(formData) {
    const url = 'api/v1/posts';
    return Request.post(url, formData);
  },

};
export default Service;
