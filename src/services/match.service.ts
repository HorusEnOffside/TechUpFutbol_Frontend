import apiClient from './api';
import type { MatchDTO, MatchResultDTO } from '../types/match';

const MatchService = {
  /**
<<<<<<< HEAD
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
=======
>>>>>>> 644e3b6f447b7c3a68722e7412088ed6c273d44e
   * Obtener partido por ID
   * GET /matches/{id}
   */
  getMatch: async (id: string): Promise<MatchDTO> => {
    const { data } = await apiClient.get<MatchDTO>(`/matches/${id}`);
    return data;
  },

<<<<<<< HEAD
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

=======
>>>>>>> 644e3b6f447b7c3a68722e7412088ed6c273d44e
  /**
   * Registrar resultado de un partido
   * POST /matches/{id}/result
   */
  createResult: async (id: string, result: MatchResultDTO): Promise<void> => {
    await apiClient.post(`/matches/${id}/result`, result);
  },
};

export default MatchService;
