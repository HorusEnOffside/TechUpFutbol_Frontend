import apiClient from './api';
import type { UUID } from '../types/common';
import type { StandingsEntryDTO, TopScorerDTO, CardEventDTO } from '../types/standings';

function rethrow(error: unknown): never {
  if (error instanceof Error) throw error;
  throw new Error('Error inesperado');
}

const StandingsService = {
  /**
   * Tabla de posiciones del torneo
   * GET /standings/{tournamentId}
   */
  getStandingsTable: async (tournamentId: UUID): Promise<StandingsEntryDTO[]> => {
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
  getTopScorers: async (tournamentId: UUID): Promise<TopScorerDTO[]> => {
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
    tournamentId: UUID,
    playerOrTeamId?: UUID | null,
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
