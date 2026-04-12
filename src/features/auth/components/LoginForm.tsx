import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { validateEmail, validatePassword } from '../../../utils/validators';
import type { LoginRequest } from '../../../types/auth';

export interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm({ onSubmit, isLoading = false, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errors: FormErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setFieldErrors(errors);
    return !errors.email && !errors.password;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ email: email.trim(), password });
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <h1 className="auth-form__title">Iniciar sesión</h1>

      {error && <ErrorMessage error={error} />}

      <Input
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
        disabled={isLoading}
        required
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="current-password"
        disabled={isLoading}
        required
      />

      <Button type="submit" isLoading={isLoading} className="auth-form__submit">
        Entrar
      </Button>
    </form>
  );
}
