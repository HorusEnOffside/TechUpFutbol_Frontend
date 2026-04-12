import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when isLoading=true', () => {
    render(<Button isLoading>Cargando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled=true', () => {
    render(<Button disabled>Deshabilitado</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies danger variant class', () => {
    render(<Button variant="danger">Eliminar</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });
});
