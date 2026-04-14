import apiClient from './api';
import type { LoginRequest, LoginResponse, RegisterRequest, UserProfile } from '../types/auth';

const AuthService = {
  /**
   * POST /auth/login — autentica al usuario y guarda el token en localStorage
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * POST /auth/register — registra un nuevo usuario
   */
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },

  /**
   * GET /auth/profile — obtiene el perfil del usuario autenticado
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>('/auth/profile');
    return response.data;
  },

  /**
   * PATCH /auth/profile — actualiza el perfil del usuario autenticado
   */
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.patch<UserProfile>('/auth/profile', data);
    return response.data;
  },

  /**
   * POST /auth/logout — cierra la sesión y limpia localStorage
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * POST /auth/refresh — refresca el token JWT
   */
  refresh: async (token: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

// Named exports for hooks that import functions directly
export const { login, register, getProfile, updateProfile, logout, refresh } = AuthService;

export default AuthService;
