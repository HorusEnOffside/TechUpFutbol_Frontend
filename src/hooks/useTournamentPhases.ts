import { useState, useEffect } from 'react';
import { useApiQuery } from './useApiQuery';
import TournamentService from '../services/tournament.service';
import MatchService from '../services/match.service';
import StandingsService from '../services/standings.service';
import TeamService from '../services/team.service';
import BracketService from '../services/bracket.service';
import type { UUID } from '../types/common';
import type { TournamentResponseDTO } from '../types/tournament';
import type { StandingsEntryDTO } from '../types/standings';
import type { Match, EliminationBracket } from '../types/bracket';
import type { TeamFullInfoDTO } from '../types/standings';

// ─── useActiveTournament ──────────────────────────────────────────────────────

/**
 * Obtiene el torneo activo (IN_PROGRESS o ACTIVE).
 * Punto de entrada principal del módulo de fases.
 */
export function useActiveTournament(): {
  tournament: TournamentResponseDTO | null;
  loading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useApiQuery(
    () => TournamentService.getActiveTournament(),
  );
  return { tournament: data, loading: isLoading, error };
}

// ─── useGroupPhase ────────────────────────────────────────────────────────────

interface GroupPhaseState {
  standings: StandingsEntryDTO[] | null;
  matches: Match[] | null;
  teams: TeamFullInfoDTO[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * Carga en paralelo la tabla de posiciones, partidos y equipos de un torneo.
 * Usa Promise.all — las 3 peticiones son simultáneas.
 * Re-ejecuta cuando cambia tournamentId.
 */
export function useGroupPhase(tournamentId: UUID | undefined): GroupPhaseState {
  const [standings, setStandings] = useState<StandingsEntryDTO[] | null>(null);
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [teams, setTeams] = useState<TeamFullInfoDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tournamentId) return;

    setLoading(true);
    setError(null);

    Promise.all([
      StandingsService.getStandingsTable(tournamentId),
      MatchService.getGroupPhaseMatches(tournamentId),
      TeamService.getTeamsByTournament(tournamentId),
    ])
      .then(([standingsData, matchesData, teamsData]) => {
        setStandings(standingsData);
        setMatches(matchesData);
        setTeams(teamsData);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Error al cargar la fase de grupos');
      })
      .finally(() => setLoading(false));
  }, [tournamentId]);

  return { standings, matches, teams, loading, error };
}

// ─── useEliminationBracket ────────────────────────────────────────────────────

interface EliminationBracketState {
  bracket: EliminationBracket | null;
  /** true cuando el backend generó los brackets (204 → false, datos → true) */
  isReady: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Carga las llaves eliminatorias de un torneo.
 * - isReady = false → 204 No Content: partidos pendientes o equipos insuficientes
 * - isReady = true  → bracket tiene roundOf16/quarterFinals/semiFinals/finals
 * Re-ejecuta cuando cambia tournamentId.
 */
export function useEliminationBracket(
  tournamentId: UUID | undefined,
): EliminationBracketState {
  const result = useApiQuery(
    () => BracketService.getBrackets(tournamentId!),
    { immediate: false },
  );

  const { refetch } = result;
  useEffect(() => {
    if (tournamentId) void refetch();
  }, [tournamentId, refetch]);

  return {
    bracket: result.data,
    isReady: result.isSuccess && result.data !== null,
    loading: result.isLoading,
    error: result.error,
  };
}
