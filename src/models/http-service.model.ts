import axios from 'axios';

export class HttpService {
  get(url) {
    return axios.get(url).then(res => res.data);
  }
}
