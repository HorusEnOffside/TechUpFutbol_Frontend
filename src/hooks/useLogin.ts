import { useState } from 'react';
import AuthService from '../services/auth.service';
import { ApiError } from '../services/api';
import type { LoginPayload, LoginResponse } from '../types/auth';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [businessError, setBusinessError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    setNetworkError(null);
    setBusinessError(null);
    try {
      const data = await AuthService.login(payload);
      setUser(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.type === 'network') {
          setNetworkError(err.message);
        } else {
          setBusinessError(err.message);
        }
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, networkError, businessError, handleLogin };
}
