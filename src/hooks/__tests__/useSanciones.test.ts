import { renderHook, act } from '@testing-library/react';
import { useSanciones } from '../useSanciones';
import type { BuscarFn } from '../useSanciones';

// ── Mocks de búsqueda ─────────────────────────────────────────────────────────
const buscarEncontrado: BuscarFn = async (_tipo, nombre) => ({
  id:     'uuid-123',
  nombre: nombre.trim(),
});

const buscarNoEncontrado: BuscarFn = async () => null;

// Mock de SancionService.crearSancion para que aceptar() no llame al backend real
vi.mock('../../services/sancion.service', () => ({
  default: {
    buscarEquipo:  vi.fn(),
    buscarJugador: vi.fn(),
    crearSancion:  vi.fn().mockResolvedValue({ id: 'sancion-uuid' }),
  },
}));

describe('useSanciones', () => {
  // ── Estado inicial ─────────────────────────────────────────────────────────
  it('starts with equipo tab active and empty fields', () => {
    const { result } = renderHook(() => useSanciones(buscarNoEncontrado));
    expect(result.current.tabActivo).toBe('equipo');
    expect(result.current.query).toBe('');
    expect(result.current.buscando).toBe(false);
    expect(result.current.noEncontrado).toBe(false);
    expect(result.current.seleccionado).toBeNull();
    expect(result.current.motivo).toBe('');
    expect(result.current.fecha).toBe('');
    expect(result.current.enviando).toBe(false);
    expect(result.current.exito).toBe(false);
  });

  it('puedeAceptar is false when nothing is selected', () => {
    const { result } = renderHook(() => useSanciones(buscarNoEncontrado));
    expect(result.current.puedeAceptar).toBe(false);
  });

  // ── cambiarTab ─────────────────────────────────────────────────────────────
  it('cambiarTab switches to jugador and clears state', () => {
    const { result } = renderHook(() => useSanciones(buscarNoEncontrado));

    act(() => result.current.setQuery('Tigres'));
    act(() => result.current.cambiarTab('jugador'));

    expect(result.current.tabActivo).toBe('jugador');
    expect(result.current.query).toBe('');
    expect(result.current.seleccionado).toBeNull();
  });

  it('cambiarTab back to equipo resets all fields', () => {
    const { result } = renderHook(() => useSanciones(buscarNoEncontrado));

    act(() => result.current.cambiarTab('jugador'));
    act(() => result.current.setQuery('Carlos'));
    act(() => result.current.cambiarTab('equipo'));

    expect(result.current.tabActivo).toBe('equipo');
    expect(result.current.query).toBe('');
  });

  // ── setQuery ───────────────────────────────────────────────────────────────
  it('setQuery updates query and clears seleccionado / noEncontrado', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());
    expect(result.current.seleccionado).not.toBeNull();

    act(() => result.current.setQuery('Algo nuevo'));
    expect(result.current.query).toBe('Algo nuevo');
    expect(result.current.seleccionado).toBeNull();
    expect(result.current.noEncontrado).toBe(false);
  });

  // ── buscar — no encontrado ─────────────────────────────────────────────────
  it('buscar sets noEncontrado when BuscarFn returns null', async () => {
    const { result } = renderHook(() => useSanciones(buscarNoEncontrado));

    act(() => result.current.setQuery('Desconocido'));
    await act(async () => result.current.buscar());

    expect(result.current.noEncontrado).toBe(true);
    expect(result.current.seleccionado).toBeNull();
    expect(result.current.buscando).toBe(false);
  });

  it('buscar does nothing when query is empty', async () => {
    const buscarSpy = vi.fn(async () => null) as BuscarFn;
    const { result } = renderHook(() => useSanciones(buscarSpy));

    await act(async () => result.current.buscar());

    expect(buscarSpy).not.toHaveBeenCalled();
    expect(result.current.buscando).toBe(false);
  });

  // ── buscar — encontrado ────────────────────────────────────────────────────
  it('buscar sets seleccionado when BuscarFn returns a result', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres FC'));
    await act(async () => result.current.buscar());

    expect(result.current.seleccionado).toEqual({
      id:     'uuid-123',
      tipo:   'equipo',
      nombre: 'Tigres FC',
    });
    expect(result.current.noEncontrado).toBe(false);
    expect(result.current.buscando).toBe(false);
  });

  it('buscar trims whitespace from query before storing', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('  Leones  '));
    await act(async () => result.current.buscar());

    expect(result.current.seleccionado?.nombre).toBe('Leones');
  });

  it('buscar uses the active tab type for seleccionado', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.cambiarTab('jugador'));
    act(() => result.current.setQuery('Carlos'));
    await act(async () => result.current.buscar());

    expect(result.current.seleccionado?.tipo).toBe('jugador');
  });

  it('seleccionado includes the id returned by BuscarFn', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());

    expect(result.current.seleccionado?.id).toBe('uuid-123');
  });

  // ── puedeAceptar ───────────────────────────────────────────────────────────
  it('puedeAceptar is false when seleccionado but motivo is empty', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());
    act(() => result.current.setFecha('2026-05-01'));

    expect(result.current.puedeAceptar).toBe(false);
  });

  it('puedeAceptar is false when seleccionado but fecha is empty', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());
    act(() => result.current.setMotivo('Conducta inapropiada'));

    expect(result.current.puedeAceptar).toBe(false);
  });

  it('puedeAceptar is false when motivo is only whitespace', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());
    act(() => result.current.setMotivo('   '));
    act(() => result.current.setFecha('2026-05-01'));

    expect(result.current.puedeAceptar).toBe(false);
  });

  it('puedeAceptar is true when seleccionado, motivo, and fecha are all set', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());
    act(() => result.current.setMotivo('Conducta inapropiada'));
    act(() => result.current.setFecha('2026-05-01'));

    expect(result.current.puedeAceptar).toBe(true);
  });

  // ── limpiar ────────────────────────────────────────────────────────────────
  it('limpiar resets all fields without changing tab', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.cambiarTab('jugador'));
    act(() => result.current.setQuery('Carlos'));
    await act(async () => result.current.buscar());
    act(() => result.current.setMotivo('Falta grave'));
    act(() => result.current.setFecha('2026-05-01'));
    act(() => result.current.limpiar());

    expect(result.current.query).toBe('');
    expect(result.current.seleccionado).toBeNull();
    expect(result.current.noEncontrado).toBe(false);
    expect(result.current.motivo).toBe('');
    expect(result.current.fecha).toBe('');
    expect(result.current.exito).toBe(false);
    expect(result.current.tabActivo).toBe('jugador'); // tab no cambia
  });

  // ── aceptar ────────────────────────────────────────────────────────────────
  it('aceptar does nothing when puedeAceptar is false', async () => {
    const { result } = renderHook(() => useSanciones(buscarEncontrado));
    await act(async () => result.current.aceptar());
    expect(result.current.enviando).toBe(false);
    expect(result.current.exito).toBe(false);
  });

  it('aceptar sets exito to true after resolving', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Tigres'));
    await act(async () => result.current.buscar());
    act(() => result.current.setMotivo('Conducta inapropiada'));
    act(() => result.current.setFecha('2026-05-01'));

    let promise: Promise<void>;
    act(() => { promise = result.current.aceptar(); });
    expect(result.current.enviando).toBe(true);

    await act(async () => { await promise!; });

    expect(result.current.exito).toBe(true);
    expect(result.current.enviando).toBe(false);

    vi.useRealTimers();
  });

  it('aceptar clears form after 2 seconds of exito', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSanciones(buscarEncontrado));

    act(() => result.current.setQuery('Leones'));
    await act(async () => result.current.buscar());
    act(() => result.current.setMotivo('Falta grave'));
    act(() => result.current.setFecha('2026-05-01'));

    let promise: Promise<void>;
    act(() => { promise = result.current.aceptar(); });
    await act(async () => { await promise!; });

    await act(async () => { vi.advanceTimersByTime(2000); });

    expect(result.current.seleccionado).toBeNull();
    expect(result.current.motivo).toBe('');
    expect(result.current.exito).toBe(false);

    vi.useRealTimers();
  });
});
