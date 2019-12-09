import {API_URL, DEFAULT_PARAMS} from './constants';
import axios from 'axios';

export function signin(params) {
  return axios({
    method: 'post',
    url: API_URL + '/api/v1/users/signin',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    data: {
      ...params,
      ...DEFAULT_PARAMS,
    },
  });
}

export function signup(params) {
  return axios({
    method: 'post',
    url: API_URL + '/api/v1/users',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    data: {
      ...params,
      ...DEFAULT_PARAMS,
    },
  });
}

export function fetchMe(token) {
  return axios({
    method: 'get',
    url: API_URL + '/api/v1/users/me',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'x-access-token': token},
    data: {
      ...DEFAULT_PARAMS,
    },
  });
}