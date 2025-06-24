
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.62.71.215:3000/api/v1/', 
  withCredentials: true, 
});

export default api;
