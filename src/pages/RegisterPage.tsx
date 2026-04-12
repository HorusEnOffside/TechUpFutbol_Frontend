import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth';
import type { RegisterFormData } from '../features/auth';
import { useState } from 'react';
import AuthService from '../services/auth.service';
import type { AppError } from '../types/api.types';

export function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(data: RegisterFormData) {
    setIsLoading(true);
    setError(null);
    try {
      // Replace this with your RegisterService when available
      await AuthService.login({ email: data.email, password: data.password });
      navigate('/', { replace: true });
    } catch (err) {
      const appError = err as AppError;
      setError(appError.message ?? 'Error al crear la cuenta.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page page--centered">
      <div className="auth-card">
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
        <p className="auth-card__footer">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="link">
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  );
}
