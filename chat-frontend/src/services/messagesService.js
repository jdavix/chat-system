import {API_URL, DEFAULT_PARAMS} from './constants';
import axios from 'axios';

export function fetchMessages(params) {
  console.log("C PS: ", params);
  return axios({
    method: 'get',
    url: API_URL + '/api/v1/messages',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    params: {
      ...params,
      ...DEFAULT_PARAMS,
    },
  });
}