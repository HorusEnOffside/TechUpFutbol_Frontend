import { useState, useEffect, useMemo } from 'react';
import type { Jugador, FiltrosJugador, Posicion, Genero } from '../types/jugador';
import { FILTROS_INICIAL } from '../types/jugador';
import type { PlayerResponseDTO, Position } from '../types/player';
import PlayerService from '../services/player.service';

import placeholder from '../assets/sj_player1.png';

// ── Mapping backend → frontend ────────────────────────────────────────────────
const POS_MAP: Record<Position, Posicion> = {
  GOALKEEPER: 'AR',
  DEFENDER:   'DF',
  MIDFIELDER: 'MD',
  FORWARD:    'DL',
};

const GEN_MAP: Record<string, Genero> = {
  MALE:   'M',
  FEMALE: 'F',
  OTHER:  'M',
};

function calcEdad(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;
  return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
}

function mapPlayer(p: PlayerResponseDTO): Jugador {
  return {
    id:             p.id,
    nombre:         p.name,
    carrera:        '',                          // no disponible en backend
    posicion:       POS_MAP[p.position] ?? 'MD',
    semestre:       0,                           // no disponible en backend
    edad:           calcEdad(p.dateOfBirth),
    genero:         GEN_MAP[p.gender] ?? 'M',
    identificacion: p.mail,                      // mail como identificador
    foto:           placeholder,                 // sin URL de foto en backend
  };
}

// ─────────────────────────────────────────────────────────────────────────────

interface UseJugadoresReturn {
  jugadores:  Jugador[];
  filtered:   Jugador[];
  selected:   string | null;
  addedIds:   string[];
  isLoading:  boolean;
  error:      string | null;
  filtros:    FiltrosJugador;
  setFiltro:  <K extends keyof FiltrosJugador>(key: K, value: FiltrosJugador[K]) => void;
  resetFiltros: () => void;
  selectJugador: (id: string) => void;
  addJugador:    (id: string) => void;
  retry: () => void;
}

export function useJugadores(): UseJugadoresReturn {
  const [jugadores,  setJugadores]  = useState<Jugador[]>([]);
  const [isLoading,  setIsLoading]  = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [selected,   setSelected]   = useState<string | null>(null);
  const [addedIds,   setAddedIds]   = useState<string[]>([]);
  const [filtros,    setFiltros]    = useState<FiltrosJugador>(FILTROS_INICIAL);
  const [fetchKey,   setFetchKey]   = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    PlayerService.getAllPlayers()
      .then((players) => {
        if (cancelled) return;
        setJugadores(players.map(mapPlayer));
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message ?? 'Error al cargar jugadores');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
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

  const selectJugador = (id: string) =>
    setSelected((prev) => (prev === id ? null : id));

  const addJugador = (id: string) => {
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
