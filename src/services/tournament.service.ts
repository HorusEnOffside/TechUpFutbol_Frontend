import apiClient from './api';
import type { TournamentResponseDTO, StandingRowDTO } from '../types/tournament';

const TournamentService = {
  /**
   * Obtener todos los torneos
   * GET /tournaments
   */
  getAllTournaments: async (): Promise<TournamentResponseDTO[]> => {
    const response = await apiClient.get<TournamentResponseDTO[]>('/tournaments');
    return response.data;
  },

  /**
   * Obtener torneo por ID
   * GET /tournaments/{id}
   */
  getTournamentById: async (id: string): Promise<TournamentResponseDTO> => {
    const response = await apiClient.get<TournamentResponseDTO>(`/tournaments/${id}`);
    return response.data;
  },

  /**
   * Obtener tabla de posiciones de un torneo
   * GET /tournaments/{id}/standings
   */
  getStandings: async (tournamentId: string): Promise<StandingRowDTO[]> => {
    const response = await apiClient.get<StandingRowDTO[]>(
      `/tournaments/${tournamentId}/standings`
    );
    return response.data;
  },
};

export default TournamentService;
