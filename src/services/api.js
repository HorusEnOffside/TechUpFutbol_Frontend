import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8443/swagger-ui.html',
});

export default api;