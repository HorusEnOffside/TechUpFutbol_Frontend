import apiClient from './api';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

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
   * POST /users/admin — registra un nuevo usuario.
   * El backend espera multipart/form-data:
   *   - "user": Blob JSON con los datos del usuario (@RequestPart)
   *   - "profilePicture": archivo de imagen opcional
   */
  register: async (userData: RegisterRequest, profilePicture?: File | null): Promise<void> => {
    const formData = new FormData();
    formData.append(
      'user',
      new Blob([JSON.stringify(userData)], { type: 'application/json' }),
      'user.json',
    );
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    await apiClient.post('/users/admin', formData);
  },

  /**
   * Cierra la sesión limpiando localStorage.
   * El backend no expone un endpoint de logout.
   */
  logout: (): void => {
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
export const { login, register, logout, refresh } = AuthService;

export default AuthService;
