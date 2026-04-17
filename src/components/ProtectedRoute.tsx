import { Navigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  role?: string;
  children: ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, initializing } = useAuth();

  // Wait for localStorage hydration before making any redirect decision
  if (initializing) return null;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (role && !hasRole(role)) return <Navigate to="/auth" replace />;

  return <>{children}</>;
}
