import Request from '../../utils/request';

const Service = {
    getHistoryData() {
        const url = 'api/v1/posts?filter=featured&paginate=1&perPage=10&maxId=null&typePost=video,stream&isShowAdver=false';
        return Request.get(url);
    },
};
export default Service;
