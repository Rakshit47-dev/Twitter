
import axios from 'axios';

const api = axios.create({
  baseURL: baseURL: import.meta.env.VITE_API_URL,
, 
  withCredentials: true, 
});

export default api;
