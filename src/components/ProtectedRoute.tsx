import { Navigate } from 'react-router';
import { useAuth } from '../store/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  role: string;
  children: ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole(role))    return <Navigate to="/login" replace />;

  return <>{children}</>;
}
