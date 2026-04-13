import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { AxiosResponse } from 'axios';

const apiBaseUrl = (import.meta as ImportMeta & { env: { VITE_API_BASE_URL: string } }).env.VITE_API_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;


// Interceptor de request para inyectar token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Interceptor de response para manejo centralizado de errores
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // No normaliza aquí, para mantener el tipado
  (error) => {
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else if (error.response) {
      alert('Error de servidor');
    } else if (error.request) {
      alert('No hay respuesta del servidor');
    } else {
      alert('Error al configurar la petición');
    }
    return Promise.reject(error);
  }
);
