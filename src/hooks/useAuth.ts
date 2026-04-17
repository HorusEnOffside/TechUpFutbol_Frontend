import { useState } from 'react';
import AuthService from '../services/auth.service';
import type { LoginResponse } from '../types/auth';

/**
 * Hook para refrescar el token JWT manualmente.
 * Para login/logout usa useAuth() de AuthContext.
 */
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo refrescar el token';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { tokenData, loading, error, refresh };
}
