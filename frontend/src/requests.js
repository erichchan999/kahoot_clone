const BACKEND_PORT = '5005';

/**
 * Make a get request.
 * @param {string} path e.g. 'job/feed'
 * @param {Object} body message body e.g. {id: '123211'}
 * @param {string} token can also be excluded
 * @returns Promise containing the response payload
 */
export function getReq (path, body = {}, token = null) {
  return apiCall(path, 'GET', body, token);
}

/**
 * Make a post request.
 * @param {string} path e.g. 'job/feed'
 * @param {Object} body message body e.g. {id: '123211'}
 * @param {string} token can also be excluded
 * @returns Promise containing the response payload
 */
export function postReq (path, body = {}, token = null) {
  return apiCall(path, 'POST', body, token);
}

/**
 * Make a put request.
 * @param {string} path e.g. 'job/feed'
 * @param {Object} body message body e.g. {id: '123211'}
 * @param {string} token can also be excluded
 * @returns Promise containing the response payload
 */
export function putReq (path, body = {}, token = null) {
  return apiCall(path, 'PUT', body, token);
}

/**
 * Make a delete request.
 * @param {string} path e.g. 'job/feed'
 * @param {Object} body message body e.g. {id: '123211'}
 * @param {string} token can also be excluded
 * @returns Promise containing the response payload
 */
export function deleteReq (path, body = {}, token = null) {
  return apiCall(path, 'DELETE', body, token);
}

/**
 * API call main handler
 * @param {string} path e.g. 'job/feed'
 * @param {string} method e.g. 'POST', 'PUT', 'GET'
 * @param {Object} body message body e.g. {id: '123211'}
 * @param {string} token can also be excluded
 * @returns Promise containing the response payload
 */
const apiCall = (path, method, body = {}, token = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: { 'Content-type': 'application/json' },
    }

    if (token !== null) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    if (method === 'GET') {
      path += '?'
      for (const variable in body) {
        const value = body[variable];
        path += `${variable}=${value}&`;
      }
      path = path.substring(0, path.length - 1);
    } else {
      options.body = JSON.stringify(body);
    }

    fetch('http://localhost:' + BACKEND_PORT + '/' + path, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
