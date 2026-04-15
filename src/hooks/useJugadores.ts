import { useState, useEffect, useMemo } from 'react';
import type { Jugador, FiltrosJugador, Posicion, Genero } from '../types/jugador';
import { FILTROS_INICIAL } from '../types/jugador';

// Mock data — reemplazar con llamada a PlayerService cuando el backend esté listo
import p1 from '../assets/sj_player1.png';
import p2 from '../assets/sj_player2.png';
import p3 from '../assets/sj_player3.png';
import p4 from '../assets/sj_player4.png';
import p5 from '../assets/sj_player5.png';
import p6 from '../assets/sj_player6.png';

const MOCK_JUGADORES: Jugador[] = [
  { id: 1, nombre: 'Juan David', carrera: 'Ing. Sistemas',    posicion: 'DL', semestre: 6, edad: 21, genero: 'M', identificacion: '1001234567', foto: p1 },
  { id: 2, nombre: 'Manuel',     carrera: 'Ing. Sistemas',    posicion: 'DF', semestre: 4, edad: 20, genero: 'M', identificacion: '1002345678', foto: p2 },
  { id: 3, nombre: 'Daniel',     carrera: 'Ing. Sistemas',    posicion: 'MD', semestre: 8, edad: 23, genero: 'M', identificacion: '1003456789', foto: p3 },
  { id: 4, nombre: 'Mariana',    carrera: 'Ing. Estadística', posicion: 'DL', semestre: 5, edad: 22, genero: 'F', identificacion: '1004567890', foto: p4 },
  { id: 5, nombre: 'Tatiana',    carrera: 'Ing. Estadística', posicion: 'AR', semestre: 3, edad: 19, genero: 'F', identificacion: '1005678901', foto: p5 },
  { id: 6, nombre: 'Marcos',     carrera: 'Ing. Sistemas',    posicion: 'DF', semestre: 7, edad: 24, genero: 'M', identificacion: '1006789012', foto: p6 },
  { id: 7, nombre: 'Marcos',     carrera: 'Ing. Sistemas',    posicion: 'DF', semestre: 7, edad: 24, genero: 'M', identificacion: '1006789012', foto: p6 },
];

interface UseJugadoresReturn {
  // Data
  jugadores: Jugador[];
  filtered: Jugador[];
  selected: number | null;
  addedIds: number[];
  // States
  isLoading: boolean;
  error: string | null;
  // Filters
  filtros: FiltrosJugador;
  setFiltro: <K extends keyof FiltrosJugador>(key: K, value: FiltrosJugador[K]) => void;
  resetFiltros: () => void;
  // Actions
  selectJugador: (id: number) => void;
  addJugador: (id: number) => void;
  retry: () => void;
}

export function useJugadores(): UseJugadoresReturn {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [filtros, setFiltros] = useState<FiltrosJugador>(FILTROS_INICIAL);
  const [fetchKey, setFetchKey] = useState(0);

  // Simula fetch al backend — reemplazar por PlayerService.getAllPlayers()
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (cancelled) return;
      // Simular error aleatorio para probar el estado de error:
      // if (Math.random() < 0.3) { setError('Error al cargar jugadores'); setIsLoading(false); return; }
      setJugadores(MOCK_JUGADORES);
      setIsLoading(false);
    }, 900);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchKey]);

  const filtered = useMemo(() => {
    return jugadores.filter((j) => {
      if (filtros.posicion && j.posicion !== (filtros.posicion as Posicion)) return false;
      if (filtros.semestre && j.semestre !== Number(filtros.semestre))        return false;
      if (filtros.edad     && j.edad     !== Number(filtros.edad))            return false;
      if (filtros.genero   && j.genero   !== (filtros.genero as Genero))      return false;
      if (filtros.nombre   && !j.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) return false;
      if (filtros.identificacion && !j.identificacion.includes(filtros.identificacion))        return false;
      return true;
    });
  }, [jugadores, filtros]);

  const setFiltro = <K extends keyof FiltrosJugador>(key: K, value: FiltrosJugador[K]) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  const resetFiltros = () => setFiltros(FILTROS_INICIAL);

  const selectJugador = (id: number) =>
    setSelected((prev) => (prev === id ? null : id));

  const addJugador = (id: number) => {
    setAddedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setSelected(null);
  };

  const retry = () => setFetchKey((k) => k + 1);

  return {
    jugadores, filtered, selected, addedIds,
    isLoading, error,
    filtros, setFiltro, resetFiltros,
    selectJugador, addJugador, retry,
  };
}
