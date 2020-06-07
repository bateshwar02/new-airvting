import Request from '../../utils/request';

const Service = {
  getLikedVideosData() {
    const url = 'api/v1/posts?filter=followed&paginate=1&perPage=10&maxId=null&typePost=video,stream&isShowAdver=false';
    return Request.get(url);
  },
};
export default Service;
