import { useState, useCallback } from 'react';
import AuthService from '../services/auth.service';
import type { LoginRequest, LoginResponse } from '../types/auth';
import type { AppError } from '../types/api.types';

interface UseLoginReturn {
  user: LoginResponse | null;
  isLoading: boolean;
  error: string | null;
  isNetworkError: boolean;
  login: (credentials: LoginRequest) => Promise<LoginResponse | null>;
  logout: () => void;
  reset: () => void;
}

// ─── useLogin ─────────────────────────────────────────────────────────────────

export function useLogin(): UseLoginReturn {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNetworkError, setIsNetworkError] = useState(false);

  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    setIsLoading(true);
    setError(null);
    setIsNetworkError(false);

    try {
      const data = await AuthService.login(credentials);
      setUser(data);
      return data;
    } catch (err) {
      const appError = err as AppError;
      if ('isNetworkError' in appError) {
        setIsNetworkError(true);
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        setError(appError.message ?? 'Error al iniciar sesión.');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    setError(null);
    setIsNetworkError(false);
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setIsNetworkError(false);
  }, []);

  return { user, isLoading, error, isNetworkError, login, logout, reset };
}

// ─── useRefreshToken ──────────────────────────────────────────────────────────

interface UseRefreshTokenReturn {
  tokenData: LoginResponse | null;
  isLoading: boolean;
  error: string | null;
  refresh: (token: string) => Promise<LoginResponse | null>;
}

export function useRefreshToken(): UseRefreshTokenReturn {
  const [tokenData, setTokenData] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (token: string): Promise<LoginResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await AuthService.refresh(token);
      setTokenData(data);
      return data;
    } catch {
      setError('No se pudo refrescar la sesión.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { tokenData, isLoading, error, refresh };
}
