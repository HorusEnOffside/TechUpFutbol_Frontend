import { RouterProvider } from 'react-router';
import { router } from './routes/routes';
import { AuthProvider } from './store/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}