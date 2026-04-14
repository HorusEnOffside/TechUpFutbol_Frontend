import { useState } from 'react';
import AuthService from '../services/auth.service';
import { ApiError } from '../services/api';
import type { RegisterPayload, LoginResponse } from '../types/auth';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [data, setData] = useState<LoginResponse | null>(null);

  const handleRegister = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    setNetworkError(null);
    try {
      const result = await AuthService.register(payload);
      setData(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.type === 'network') {
          setNetworkError(err.message);
        }
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al registrarse');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, networkError, handleRegister };
}
