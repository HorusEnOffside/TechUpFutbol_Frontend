import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(await screen.findByText(/correo es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/contraseña es requerida/i)).toBeInTheDocument();
  });

  it('shows email format error for invalid email', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByLabelText(/correo/i), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(await screen.findByText(/correo válido/i)).toBeInTheDocument();
  });

  it('calls onSubmit with credentials when form is valid', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/correo/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'secretPass1');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'secretPass1',
      });
    });
  });

  it('displays server error when error prop is set', () => {
    render(<LoginForm onSubmit={vi.fn()} error="Credenciales inválidas" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Credenciales inválidas');
  });

  it('disables inputs while loading', () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByLabelText(/correo/i)).toBeDisabled();
    expect(screen.getByLabelText(/contraseña/i)).toBeDisabled();
  });
});
