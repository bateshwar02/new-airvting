import cookie from 'cookies-js';
import $ from 'jquery';
import Utils from './common';


const getBaseUrl = () => 'https://vridhisoftech.co.in/sh/airvtingApis/';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  try {
    return response.json();
  } catch (e) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  return response;
  // if (response.success) {
  //     return response;
  // }
  // const error = new Error(response.errorMessage);
  // error.response = response;
  // throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options)
    .then(parseJSON)
    .then(checkStatus);
}

const getHeaders = (header, contentType) => {
  const headers = {};
  headers['Content-type'] = contentType || 'application/json';
  if (!Utils.isUndefinedOrNullOrEmpty(cookie.get('token'))) {
    headers.authorization = `Bearer ${cookie.get('token')}`;
  }

  return headers;
};

const getDocHeaders = (header) => {
  let headers = {};
  // headers['X-REFERRER-DOMAIN'] = '{_domain}';
  if (header) {
    headers = Object.assign(headers, header);
  }
  return headers;
};

export default {
  get(url, header) {
    return request(getBaseUrl() + url, { method: 'GET', headers: getHeaders(header) });
  },
  post(url, data, contentType, header) {
    let body = data;
    if (contentType !== 'application/octet-stream') {
      body = JSON.stringify(data);
    }
    return request(getBaseUrl() + url, { method: 'POST', headers: getHeaders(header), body });
  },
  imageUpload(url, data, contentType, header) {
    const body = data;
    return request(getBaseUrl() + url, { method: 'POST', headers: getHeaders(header, contentType), body });
  },
  put(url, data, header) {
    return request(getBaseUrl() + url, { method: 'PUT', headers: getHeaders(header), body: JSON.stringify(data) });
  },
  patch(url, data, header) {
    return request(getBaseUrl() + url, { method: 'PATCH', headers: getHeaders(header), body: JSON.stringify(data) });
  },
  delete(url, data, header) {
    return request(getBaseUrl() + url, { method: 'DELETE', headers: getHeaders(header), body: JSON.stringify(data) });
  },
  upload(url, data, progressCallback, headers = {}) {
    return request(getBaseUrl() + url, { method: 'POST', headers: getDocHeaders(headers), body: data });
  },
  imgageUpload(url, data) {
    const headers = {};
    if (!Utils.isUndefinedOrNullOrEmpty(cookie.get('token'))) {
      headers.authorization = `Bearer ${cookie.get('token')}`;
    }
    return new Promise((resolve, reject) => {
      $.ajax({
        url: getBaseUrl() + url,
        type: 'POST',
        processData: false,
        headers,
        contentType: false,
        mimeType: 'multipart/form-data',
        data,
        success: response => resolve(response),
        error: (error) => {
          if (Utils.isUndefinedOrNullOrEmpty(error.response)) {
            reject(error);
          } else {
            reject(JSON.parse(error.response));
          }
        },
      });
    });
  }
};
