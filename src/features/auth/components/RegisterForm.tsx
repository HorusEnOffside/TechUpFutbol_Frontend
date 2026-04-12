import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateConfirmPassword,
} from '../../../utils/validators';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterForm({ onSubmit, isLoading = false, error }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errors: FormErrors = {
      name: validateRequired(name, 'El nombre'),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setFieldErrors(errors);
    return Object.values(errors).every((v) => !v);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ name: name.trim(), email: email.trim(), password });
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <h1 className="auth-form__title">Crear cuenta</h1>

      {error && <ErrorMessage error={error} />}

      <Input
        label="Nombre completo"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
        autoComplete="name"
        disabled={isLoading}
        required
      />

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
        hint="Mínimo 8 caracteres."
        autoComplete="new-password"
        disabled={isLoading}
        required
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={fieldErrors.confirmPassword}
        autoComplete="new-password"
        disabled={isLoading}
        required
      />

      <Button type="submit" isLoading={isLoading} className="auth-form__submit">
        Registrarse
      </Button>
    </form>
  );
}
