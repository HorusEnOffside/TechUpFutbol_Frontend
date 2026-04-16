import apiClient from './api';
import type { StandingsEntryDTO, TopScorerDTO, CardEventDTO } from '../types/standings';

// El interceptor de api.ts ya convierte errores de axios en ApiError (instanceof Error).
// Si el error ya es una instancia de Error, lo re-lanzamos para no perder su mensaje.
function rethrow(error: unknown): never {
  if (error instanceof Error) throw error;
  throw new Error('Error inesperado');
}

const StandingsService = {
  /**
   * Tabla de posiciones del torneo
   * GET /standings/{tournamentId}
   */
  getStandingsTable: async (tournamentId: string): Promise<StandingsEntryDTO[]> => {
    try {
      const { data } = await apiClient.get<StandingsEntryDTO[]>(`/standings/${tournamentId}`);
      return data;
    } catch (error) {
      rethrow(error);
    }
  },

  /**
   * Goleadores del torneo
   * GET /standings/{tournamentId}/top-scorers
   */
  getTopScorers: async (tournamentId: string): Promise<TopScorerDTO[]> => {
    try {
      const { data } = await apiClient.get<TopScorerDTO[]>(
        `/standings/${tournamentId}/top-scorers`,
      );
      return data;
    } catch (error) {
      rethrow(error);
    }
  },

  /**
   * Historial de tarjetas del torneo (filtrable por jugador o equipo)
   * GET /standings/{tournamentId}/cards-history?playerOrTeamId={id}
   */
  getCardsHistory: async (
    tournamentId: string,
    playerOrTeamId?: string | null,
  ): Promise<CardEventDTO[]> => {
    try {
      const { data } = await apiClient.get<CardEventDTO[]>(
        `/standings/${tournamentId}/cards-history`,
        { params: playerOrTeamId ? { playerOrTeamId } : undefined },
      );
      return data;
    } catch (error) {
      rethrow(error);
    }
  },
};

export default StandingsService;
