import {API_URL, DEFAULT_PARAMS} from './constants';
import axios from 'axios';

export function saveGroupChat(params, token = null) {
  return axios({
    method: 'post',
    url: API_URL + '/api/v1/group_chats',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'x-access-token': token},
    data: {
      ...params,
      ...DEFAULT_PARAMS,
    },
  });
}

export function fetchChat(id, token = null) {
  return axios({
    method: 'get',
    url: API_URL + `/api/v1/group_chats/${id}`,
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'x-access-token': token},
    params: {
      ...DEFAULT_PARAMS,
    },
  });
}

export function fetchChats(params, token = null) {
  return axios({
    method: 'get',
    url: API_URL + '/api/v1/group_chats',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'x-access-token': token},
    params: {
      ...params,
      ...DEFAULT_PARAMS,
    },
  });
}