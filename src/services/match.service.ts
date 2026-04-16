import apiClient from './api';
import type { MatchDTO, MatchResultDTO } from '../types/match';

const MatchService = {
  /**
   * Obtener partido por ID
   * GET /matches/{id}
   */
  getMatch: async (id: string): Promise<MatchDTO> => {
    const { data } = await apiClient.get<MatchDTO>(`/matches/${id}`);
    return data;
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
