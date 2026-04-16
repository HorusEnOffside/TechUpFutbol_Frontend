import { useEffect } from 'react';
import { useApiQuery } from './useApiQuery';
import StandingsService from '../services/standings.service';
import TeamService from '../services/team.service';

/**
 * Tabla de posiciones de un torneo.
 * Re-ejecuta automáticamente cuando cambia tournamentId.
 */
export function useStandingsTable(tournamentId: string | undefined) {
  const result = useApiQuery(
    () => StandingsService.getStandingsTable(tournamentId!),
    { immediate: false },
  );

  const { refetch } = result;
  useEffect(() => {
    if (tournamentId) void refetch();
  }, [tournamentId, refetch]);

  return result;
}

/**
 * Goleadores de un torneo.
 * Re-ejecuta automáticamente cuando cambia tournamentId.
 */
export function useTopScorers(tournamentId: string | undefined) {
  const result = useApiQuery(
    () => StandingsService.getTopScorers(tournamentId!),
    { immediate: false },
  );

  const { refetch } = result;
  useEffect(() => {
    if (tournamentId) void refetch();
  }, [tournamentId, refetch]);

  return result;
}

/**
 * Historial de tarjetas de un torneo.
 * Re-ejecuta cuando cambia tournamentId o playerOrTeamId.
 */
export function useCardsHistory(
  tournamentId: string | undefined,
  playerOrTeamId?: string | null,
) {
  const result = useApiQuery(
    () => StandingsService.getCardsHistory(tournamentId!, playerOrTeamId),
    { immediate: false },
  );

  const { refetch } = result;
  useEffect(() => {
    if (tournamentId) void refetch();
  }, [tournamentId, playerOrTeamId, refetch]);

  return result;
}

/**
 * Todos los equipos de un torneo con sus jugadores.
 * Re-ejecuta automáticamente cuando cambia tournamentId.
 */
export function useTeamsByTournament(tournamentId: string | undefined) {
  const result = useApiQuery(
    () => TeamService.getTeamsByTournament(tournamentId!),
    { immediate: false },
  );

  const { refetch } = result;
  useEffect(() => {
    if (tournamentId) void refetch();
  }, [tournamentId, refetch]);

  return result;
}
