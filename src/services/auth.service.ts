import apiClient from './api';
import type { LoginRequest, LoginResponse } from '../types/auth';

const AuthService = {
  /**
   * Inicia sesión con email y password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Refresca el token JWT
   */
  refresh: async (token: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default AuthService;
