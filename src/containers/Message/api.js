import Request from '../../utils/request';

const Service = {
  getConversation() {
    const url = 'api/v1/conversations?paginate=1&perPage=10&maxId=0';
    return Request.get(url);
  },

  getConversationById(id) {
    const url = `api/v1/conversations/${id}?paginate=1&perPage=20&maxId=0`;
    return Request.get(url);
  },

  addReply(replyData, id) {
    const url = `api/v1/conversations/${id}/messages`;
    return Request.post(url, replyData);
  },

  searchUser(userName) {
    const url = `api/v1/users?username=${userName}&paginate=1&perPage=20&maxId=null`;
    return Request.post(url, {});
  },

  addConversation(convData) {
    const url = 'api/v1/conversations';
    return Request.post(url, convData);
  }


};
export default Service;
