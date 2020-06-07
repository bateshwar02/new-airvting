/* eslint-disable import/prefer-default-export */
import Request from '../utils/request';

export async function addBookMark(id) {
  const url = `api/v1/posts/${id}/bookmark `;
  const response = await Request.get(url);
  return response;
}
