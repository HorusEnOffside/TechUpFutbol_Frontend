import { Navigate, Outlet } from 'react-router-dom';
import { getStoredToken } from '../utils/helpers';

export function PrivateRoute() {
  const token = getStoredToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
