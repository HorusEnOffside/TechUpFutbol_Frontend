import { renderHook, act, waitFor } from '@testing-library/react';
import { useJugadores } from '../useJugadores';

describe('useJugadores', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in loading state', () => {
    const { result } = renderHook(() => useJugadores());
    expect(result.current.isLoading).toBe(true);
  });

  it('loads jugadores after fetch completes', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.jugadores.length).toBeGreaterThan(0);
  });

  it('filtered returns all jugadores when no filters applied', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    expect(result.current.filtered.length).toBe(result.current.jugadores.length);
  });

  it('filters by posicion', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.setFiltro('posicion', 'DL'));
    const all = result.current.jugadores;
    const dlPlayers = all.filter((j) => j.posicion === 'DL');
    expect(result.current.filtered.length).toBe(dlPlayers.length);
    result.current.filtered.forEach((j) => expect(j.posicion).toBe('DL'));
  });

  it('filters by genero', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.setFiltro('genero', 'F'));
    result.current.filtered.forEach((j) => expect(j.genero).toBe('F'));
  });

  it('filters by nombre (case-insensitive)', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.setFiltro('nombre', 'juan'));
    expect(result.current.filtered.length).toBeGreaterThan(0);
    result.current.filtered.forEach((j) =>
      expect(j.nombre.toLowerCase()).toContain('juan')
    );
  });

  it('returns empty filtered list when no match', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.setFiltro('nombre', 'XYZNOTFOUND'));
    expect(result.current.filtered.length).toBe(0);
  });

  it('resetFiltros restores all jugadores', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.setFiltro('nombre', 'XYZNOTFOUND'));
    expect(result.current.filtered.length).toBe(0);
    act(() => result.current.resetFiltros());
    expect(result.current.filtered.length).toBe(result.current.jugadores.length);
  });

  it('addJugador adds id to addedIds', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.addJugador(1));
    expect(result.current.addedIds).toContain(1);
  });

  it('addJugador toggles (removes if already added)', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.addJugador(1));
    act(() => result.current.addJugador(1));
    expect(result.current.addedIds).not.toContain(1);
  });

  it('selectJugador sets selected id', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.selectJugador(2));
    expect(result.current.selected).toBe(2);
  });

  it('selectJugador toggles (deselects if same id clicked)', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.selectJugador(2));
    act(() => result.current.selectJugador(2));
    expect(result.current.selected).toBeNull();
  });

  it('retry triggers a new fetch', async () => {
    const { result } = renderHook(() => useJugadores());
    await act(async () => { vi.advanceTimersByTime(900); });
    act(() => result.current.retry());
    expect(result.current.isLoading).toBe(true);
    await act(async () => { vi.advanceTimersByTime(900); });
    expect(result.current.isLoading).toBe(false);
  });
});
