import apiClient from './api';
import type { MatchDTO, MatchResultDTO } from '../types/match';
import type { Match } from '../types/bracket';

const MatchService = {
  /**
   * Obtener todos los partidos
   * GET /matches  — requiere rol: USER, ADMIN o REFEREE
   */
  getAllMatches: async (): Promise<MatchDTO[]> => {
    try {
      const { data } = await apiClient.get<MatchDTO[]>('/matches');
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
  /**
   * Obtener partidos que arbitra el usuario autenticado (árbitro)
   * GET /matches/my-matches — requiere rol: REFEREE
   */
  getMyMatches: async (): Promise<Match[]> => {
    try {
      const { data } = await apiClient.get<Match[]>("/matches/my-matches");
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error inesperado");
    }
  },
  /**
   * Obtener partido por ID
   * GET /matches/{id}
   */
  getMatch: async (id: string): Promise<MatchDTO> => {
    const { data } = await apiClient.get<MatchDTO>(`/matches/${id}`);
    return data;
  },

  /** Alias semántico de getMatch para uso en estadísticas */
  getMatchById: async (matchId: string): Promise<MatchDTO> => {
    try {
      const { data } = await apiClient.get<MatchDTO>(`/matches/${matchId}`);
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },

  /**
   * Partidos de un torneo específico.
   * GET /matches — el backend devuelve todos; filtramos por torneoId en frontend.
   * Requiere rol: USER, ADMIN o REFEREE.
   */
  getMatchesByTournament: async (tournamentId: string): Promise<Match[]> => {
    try {
      const { data } = await apiClient.get<Match[]>('/matches');
      return data.filter(
        (m) =>
          m.teamA?.tournament?.id === tournamentId ||
          m.teamB?.tournament?.id === tournamentId,
      );
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },

  /**
   * Partidos de fase de grupos de un torneo (PENDING y FINISHED).
   * Retorna todos los partidos del torneo — el componente usa el status
   * para mostrar el estado actual de cada partido en la vista de grupo.
   */
  getGroupPhaseMatches: async (tournamentId: string): Promise<Match[]> => {
    return MatchService.getMatchesByTournament(tournamentId);
  },

  /**
   * Registrar resultado de un partido
   * POST /matches/{id}/result
   */
  createResult: async (id: string, result: MatchResultDTO): Promise<void> => {
    await apiClient.post(`/matches/${id}/result`, result);
  },
};

export default MatchService;
