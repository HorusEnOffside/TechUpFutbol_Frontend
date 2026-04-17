import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_URL = (import.meta as ImportMeta & { env: { VITE_API_URL: string } }).env.VITE_API_URL;
const apiBaseUrl = `${API_URL}/api`;

// ─── Custom error class ───────────────────────────────────────────────────────
export class ApiError extends Error {
  type: 'network' | 'business' | 'unknown';
  statusCode?: number;

  constructor(
    message: string,
    type: 'network' | 'business' | 'unknown',
    statusCode?: number,
  ) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.statusCode = statusCode;
  }
}

// ─── Axios instance ───────────────────────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
});

// ─── Request interceptor — inject JWT token ───────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ─── Response interceptor — centralised error handling ───────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status as number;
        const backendMessage = (error.response.data as { message?: string })?.message;
        const message = backendMessage ?? getDefaultMessage(status);

        // Token expired / unauthorized — clear storage and redirect
        if (status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth';
        }

        return Promise.reject(new ApiError(message, 'business', status));
      }

      if (error.request) {
        const isTimeout = (error.code as string) === 'ECONNABORTED';
        const message = isTimeout
          ? 'La solicitud tardó demasiado. Verifica tu conexión.'
          : 'No hay respuesta del servidor. Verifica tu conexión a internet.';
        return Promise.reject(new ApiError(message, 'network'));
      }
    }

    return Promise.reject(
      new ApiError('Error inesperado al configurar la solicitud.', 'unknown'),
    );
  },
);

function getDefaultMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Solicitud inválida.',
    401: 'No autorizado. Por favor inicia sesión.',
    403: 'No tienes permiso para realizar esta acción.',
    404: 'El recurso solicitado no existe.',
    409: 'Conflicto con los datos existentes.',
    422: 'Los datos enviados no son válidos.',
    500: 'Error interno del servidor.',
    502: 'Servicio no disponible temporalmente.',
    503: 'Servicio en mantenimiento.',
  };
  return messages[status] ?? `Error ${status}.`;
}

export default apiClient;
