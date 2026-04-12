import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { AppError, ApiError, NetworkError } from '../types/api.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request interceptor — inject auth token ──────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response interceptor — normalize errors (no alerts) ─────────────────────

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const appError = buildAppError(error);
    return Promise.reject(appError);
  },
);

function buildAppError(
  error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>,
): AppError {
  if (!error.response) {
    const networkError: NetworkError = {
      message: error.message || 'No se pudo conectar con el servidor.',
      isNetworkError: true,
    };
    return networkError;
  }

  const { status, data } = error.response;

  if (status === 401) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  const apiError: ApiError = {
    message: data?.message ?? 'Ha ocurrido un error inesperado.',
    statusCode: status,
    errors: data?.errors,
  };
  return apiError;
}

export default apiClient;
