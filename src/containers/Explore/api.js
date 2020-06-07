import Request from '../../utils/request';

const Service = {
  getExploreData(type) {
    const url = `api/v1/posts?filter=${type}&typePost=video,stream&paginate=1&perPage=20&isShowAdver=false`;
    return Request.get(url);
  },
};
export default Service;
