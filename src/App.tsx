import { AuthProvider } from './store';
import { AppRouter } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
