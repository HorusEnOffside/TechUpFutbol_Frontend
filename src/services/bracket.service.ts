import apiClient from './api';
import type { UUID } from '../types/common';
import type { EliminationBracket } from '../types/bracket';

const BracketService = {
  /**
   * Llaves eliminatorias de un torneo.
   * GET /brackets/{tournamentId}
   *
   * Retorna:
   *   - EliminationBracket  → cuando todos los partidos de grupo finalizaron
   *   - null                → 204 No Content (partidos pendientes o equipos insuficientes)
   */
  getBrackets: async (tournamentId: UUID): Promise<EliminationBracket | null> => {
    try {
      const response = await apiClient.get<EliminationBracket>(`/brackets/${tournamentId}`);
      // 204 No Content: axios devuelve data vacía
      if (response.status === 204 || !response.data) return null;
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
};

export default BracketService;
