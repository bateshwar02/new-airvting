import Request from '../../utils/request';

const Service = {
  contactUs(data) {
    const url = 'api/v1/contact';
    return Request.post(url, data);
  },
};
export default Service;
