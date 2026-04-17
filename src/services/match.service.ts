import apiClient from './api';
import { ApiError } from './api';
import type { UUID } from '../types/common';
import type { MatchResponseDTO, MatchResultDTO } from '../types/match';
import type { TeamFullInfoDTO } from '../types/standings';

// GET /matches y GET /matches/{id} requieren rol ADMIN o REFEREE.
// Si el usuario tiene otro rol (ORGANIZER, PLAYER) el backend responde 403.
function handle(error: unknown): never {
  if (error instanceof ApiError && error.statusCode === 403) {
    throw new ApiError(
      'No tienes permiso para ver los partidos. Se requiere rol ADMIN o REFEREE.',
      'business',
      403,
    );
  }
  if (error instanceof Error) throw error;
  throw new Error('Error inesperado');
}

const MatchService = {
  getAllMatches: async (): Promise<MatchResponseDTO[]> => {
    try {
      const { data } = await apiClient.get<MatchResponseDTO[]>('/matches');
      return data;
    } catch (error) {
      handle(error);
    }
  },

  getMyMatches: async (): Promise<MatchResponseDTO[]> => {
    try {
      const { data } = await apiClient.get<MatchResponseDTO[]>('/matches/my-matches');
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },

  getMatch: async (id: UUID): Promise<MatchResponseDTO> => {
    try {
      const { data } = await apiClient.get<MatchResponseDTO>(`/matches/${id}`);
      return data;
    } catch (error) {
      handle(error);
    }
  },

  getMatchById: async (matchId: UUID): Promise<MatchResponseDTO> => {
    return MatchService.getMatch(matchId);
  },

  /**
   * Filtra partidos por torneo:
   * GET /teams/tournament/{id}/full  → obtiene teamIds del torneo
   * GET /matches                     → filtra por esos teamIds
   * (MatchResponseDTO.teamA/B solo tiene {id,name,uniformColor}, sin tournamentId)
   */
  getMatchesByTournament: async (tournamentId: UUID): Promise<MatchResponseDTO[]> => {
    try {
      const [matchesRes, teamsRes] = await Promise.all([
        apiClient.get<MatchResponseDTO[]>('/matches'),
        apiClient.get<TeamFullInfoDTO[]>(`/teams/tournament/${tournamentId}/full`),
      ]);
      const teamIds = new Set(teamsRes.data.map((t) => t.teamId));
      return matchesRes.data.filter(
        (m) => teamIds.has(m.teamA.id) || teamIds.has(m.teamB.id),
      );
    } catch (error) {
      handle(error);
    }
  },

  getGroupPhaseMatches: async (tournamentId: UUID): Promise<MatchResponseDTO[]> => {
    return MatchService.getMatchesByTournament(tournamentId);
  },

  createResult: async (id: UUID, result: MatchResultDTO): Promise<MatchResponseDTO> => {
    try {
      const { data } = await apiClient.post<MatchResponseDTO>(`/matches/${id}/result`, result);
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
};

export default MatchService;
