import apiClient from './api';
import type { LoginRequest, LoginResponse } from '../types/auth';

const AuthService = {
  // POST /auth/login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    const data = response.data;
    localStorage.setItem('access_token', data.token);
    return data;
  },

  // POST /auth/refresh
  refresh: async (token: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    localStorage.setItem('access_token', data.token);
    return data;
  },

  // DELETE /auth/logout
  logout: (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

export default AuthService;
