import Request from '../../utils/request';

const Service = {
  getCategories() {
    return Request.get('api/v1/get_post_categories');
  },
  addProduct(formData) {
    const url = 'api/v1/products';
    return Request.imageUpload(url, formData, 'multipart/form-data');
  },
};
export default Service;
