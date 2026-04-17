import apiClient from './api';
import type { TournamentResponseDTO } from '../types/tournament';
import type { StandingsEntryDTO } from '../types/standings';

const TournamentService = {
  /** GET /tournaments — lista todos los torneos */
  getAllTournaments: async (): Promise<TournamentResponseDTO[]> => {
    const { data } = await apiClient.get<TournamentResponseDTO[]>('/tournaments');
    return data;
  },

  /** GET /tournaments/{id} — torneo por ID */
  getTournamentById: async (id: string): Promise<TournamentResponseDTO> => {
    const { data } = await apiClient.get<TournamentResponseDTO>(`/tournaments/${id}`);
    return data;
  },

  /**
   * GET /tournaments/active — torneo activo (REGISTRATION o ACTIVE).
   * Requiere autenticación.
   */
  getActiveTournament: async (): Promise<TournamentResponseDTO> => {
    try {
      const { data } = await apiClient.get<TournamentResponseDTO>('/tournaments/active');
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },

  /**
   * GET /standings/{tournamentId} — tabla de posiciones de un torneo.
   * Requiere autenticación.
   */
  getStandings: async (tournamentId: string): Promise<StandingsEntryDTO[]> => {
    const { data } = await apiClient.get<StandingsEntryDTO[]>(`/standings/${tournamentId}`);
    return data;
  },
};

export default TournamentService;
