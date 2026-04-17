import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import AuthService from '../services/auth.service';
import type { LoginRequest, LoginResponse } from '../types/auth';

interface AuthContextType {
  user: LoginResponse | null;
  loading: boolean;
  initializing: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as LoginResponse);
    }
    setInitializing(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);
    try {
      // AuthService.login also stores the token in localStorage
      const data = await AuthService.login(credentials);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de autenticación';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    AuthService.logout(); // limpia localStorage; no hay endpoint de logout en el backend
  };

  /**
   * Refresca el JWT para que roles nuevos (ej: CAPTAIN tras createTeam)
   * queden reflejados en el token antes de llamar endpoints protegidos.
   */
  const refreshSession = async (): Promise<void> => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) return;
    const data = await AuthService.refresh(currentToken);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const isAuthenticated = !!user;
  const hasRole = (role: string) => user?.roles.includes(role) ?? false;

  return (
    <AuthContext.Provider value={{ user, loading, initializing, error, login, logout, refreshSession, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
