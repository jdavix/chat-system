import {API_URL, DEFAULT_PARAMS} from './constants';
import axios from 'axios';

export function saveGroupChat(params) {
  return axios({
    method: 'post',
    url: API_URL + '/api/v1/group_chats',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    data: {
      ...params,
      ...DEFAULT_PARAMS,
    },
  });
}