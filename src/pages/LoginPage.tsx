import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth';
import { useLogin } from '../hooks/useAuth';
import type { LoginRequest } from '../types/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const { isLoading, error, login } = useLogin();

  async function handleLogin(credentials: LoginRequest) {
    const result = await login(credentials);
    if (result) {
      navigate('/', { replace: true });
    }
  }

  return (
    <main className="page page--centered">
      <div className="auth-card">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        <p className="auth-card__footer">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="link">
            Regístrate
          </a>
        </p>
      </div>
    </main>
  );
}
