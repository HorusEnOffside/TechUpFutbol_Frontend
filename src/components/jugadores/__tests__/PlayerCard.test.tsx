import { render, screen, fireEvent } from '@testing-library/react';
import { PlayerCard } from '../PlayerCard';
import type { Jugador } from '../../../types/jugador';

const mockJugador: Jugador = {
  id: 1,
  nombre: 'Juan David',
  carrera: 'Ing. Sistemas',
  posicion: 'DL',
  semestre: 6,
  edad: 21,
  genero: 'M',
  identificacion: '1001234567',
  foto: 'player.png',
};

describe('PlayerCard', () => {
  it('renders the player name and career', () => {
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={false}
        onClick={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    expect(screen.getByText('Juan David')).toBeInTheDocument();
    expect(screen.getByText('Ing. Sistemas')).toBeInTheDocument();
  });

  it('renders the position badge', () => {
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={false}
        onClick={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    expect(screen.getByText('DL')).toBeInTheDocument();
  });

  it('renders back-face player details', () => {
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={false}
        onClick={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    expect(screen.getByText('21 años')).toBeInTheDocument();
    expect(screen.getByText('6º')).toBeInTheDocument();
    expect(screen.getByText('Masculino')).toBeInTheDocument();
  });

  it('shows last 4 digits of identificacion on back face', () => {
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={false}
        onClick={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    expect(screen.getByText('4567')).toBeInTheDocument();
  });

  it('applies selected border style when selected=true', () => {
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={true}
        onClick={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    // The front face wraps the player photo — use its parent to check border-width
    const frontFace = screen.getByAltText('Juan David').parentElement!;
    expect(frontFace).toHaveStyle({ borderWidth: '3px' });
  });

  it('calls onClick when front face is clicked', () => {
    const onClick = vi.fn();
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={false}
        onClick={onClick}
        onAdd={vi.fn()}
      />
    );
    // Click the front face (first absolute div inside the flip container)
    fireEvent.click(screen.getByText('Juan David'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onAdd when Añadir button is clicked', () => {
    const onAdd = vi.fn();
    render(
      <PlayerCard
        jugador={mockJugador}
        selected={false}
        onClick={vi.fn()}
        onAdd={onAdd}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
