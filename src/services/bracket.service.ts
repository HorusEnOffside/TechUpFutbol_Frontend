import apiClient from './api';
import type { BracketResponse } from '../types/bracket';

const BracketService = {
  /**
   * Llaves eliminatorias de un torneo.
   * GET /brackets/{tournamentId}
   *
   * No tiene @PreAuthorize — el interceptor adjunta el token si existe.
   *
   * Retorna la respuesta completa sin lanzar error cuando
   * eliminationBrackets es null (partidos pendientes o equipos insuficientes).
   * El componente decide qué mostrar según bracket.eliminationBrackets.
   */
  getBrackets: async (tournamentId: string): Promise<BracketResponse> => {
    try {
      const { data } = await apiClient.get<BracketResponse>(`/brackets/${tournamentId}`);
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
};

export default BracketService;
