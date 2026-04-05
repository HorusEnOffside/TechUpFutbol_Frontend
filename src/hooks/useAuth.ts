import { useState } from 'react';
import AuthService from '../services/auth.service';
import type { LoginRequest, LoginResponse } from '../types/auth';

// Hook para login de usuario
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [businessError, setBusinessError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    setNetworkError(null);
    setBusinessError(null);
    try {
      const data = await AuthService.login(credentials);
      setUser(data);
      return data;
    } catch (err: any) {
      // Axios error: err.response = error de negocio, err.request = error de red
      if (err.response) {
        setBusinessError(err.response.data?.message || 'Error de negocio');
        setError(err.response.data?.message || 'Error de negocio');
      } else if (err.request) {
        setNetworkError('No hay respuesta del servidor');
        setError('No hay respuesta del servidor');
      } else {
        setError('Error desconocido');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, networkError, businessError, login };
}

// Hook para refrescar el token JWT
export function useRefreshToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<LoginResponse | null>(null);

  const refresh = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.refresh(token);
      setTokenData(data);
      return data;
    } catch (err) {
      setError('No se pudo refrescar el token');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { tokenData, loading, error, refresh };
}
