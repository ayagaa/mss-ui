import {format} from 'url';

import axios from 'axios';

function buildUrl(url, query) {
    return url + (query ? format({query}) : '');
  }

export function get(url, query) {
  return axios.get(buildUrl(url, query)).then(response => response.data);
}

export function post(url, query, data) {
  return axios.post(buildUrl(url, query), data).then(response => response.data);
}

export function put(url, query, data) {
  return axios.put(buildUrl(url, query), data).then(response => response.data);
}

export function del(url, query) {
  return axios.delete(buildUrl(url, query)).then(response => response.data);
}
  
  // export function get(url, query) {
  //   return fetch(buildUrl(url, query)).then((response) => response.json());
  // }
  
  // export function post(url, query, data) {
  //   return fetch(buildUrl(url, query), {
  //     method: 'POST',
  //     body: data,
  //     // mode: 'no-cors'
  //   }).then((response) => response.json());
  // }
  
  // export function put(url, query, data) {
  //   return fetch(buildUrl(url, query), {
  //     method: 'PUT',
  //     body: data,
  //     // mode: 'no-cors'
  //   }).then((response) => response.json());
  // }
  
  // export function del(url, query) {
  //   return fetch(buildUrl(url, query), {
  //     method: 'DELETE',
  //     // mode: 'no-cors'
  //   }).then((response) => response.json());
  // }