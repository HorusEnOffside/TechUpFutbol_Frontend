// ─── Simple auth store using React Context + useReducer ───────────────────────
// No external state library needed for this scale.

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { LoginResponse } from '../types/auth';

// ─── State ────────────────────────────────────────────────────────────────────

interface AuthStore {
  user: LoginResponse | null;
  isAuthenticated: boolean;
}

const initialState: AuthStore = {
  user: null,
  isAuthenticated: Boolean(localStorage.getItem('access_token')),
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
  | { type: 'LOGOUT' };

function authReducer(state: AuthStore, action: AuthAction): AuthStore {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AuthContextValue {
  state: AuthStore;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuthStore(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthStore must be used inside <AuthProvider>');
  }
  return ctx;
}
