import apiClient from './api';
import type { TournamentResponseDTO, StandingRowDTO } from '../types/tournament';
const TournamentService = {

/**
     * Obtener el número de equipos inscritos en el torneo actual
     * GET /tournament/registered-teams
     * Retorna: { registeredTeams: number }
     */
    getCurrentTournamentRegisteredTeams: async (): Promise<{ registeredTeams: number }> => {
      const response = await apiClient.get<{ registeredTeams: number }>(`/tournament/registered-teams`);
      return response.data;
    },

    /**
     * Obtener el número máximo de equipos permitidos en el torneo actual
     * GET /tournament/max-teams
     * Retorna: { maxTeams: number }
     */
    getCurrentTournamentMaxTeams: async (): Promise<{ maxTeams: number }> => {
      const response = await apiClient.get<{ maxTeams: number }>(`/tournament/max-teams`);
      return response.data;
    },


    /**
     * Obtener el estado del torneo actual
     * GET /tournament/status
     * Retorna: { status: 'DRAFT' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED' }
     */
    getCurrentTournamentStatus: async (): Promise<{ status: 'DRAFT' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED' }> => {
      const response = await apiClient.get<{ status: 'DRAFT' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED' }>(`/tournament/status`);
      return response.data;
    },

    /**
     * Obtener el periodo (term) del torneo actual
     * GET /tournament/term
     * Retorna: { term: string }
     */
    getCurrentTournamentTerm: async (): Promise<{ term: string }> => {
      const response = await apiClient.get<{ term: string }>(`/tournament/term`);
      return response.data;
    },

    /**
     * Obtener fechas de inicio y fin del torneo actual
     * GET /tournament/dates
     * Retorna: { startDate: string, endDate: string }
     */
    getCurrentTournamentDates: async (): Promise<{ startDate: string, endDate: string }> => {
      const response = await apiClient.get<{ startDate: string, endDate: string }>(`/tournament/dates`);
      return response.data;
    },

    /**
     * Obtener el costo por equipo del torneo actual
     * GET /tournament/team-cost
     * Retorna: { teamCost: number }
     */
    getCurrentTournamentTeamCost: async (): Promise<{ teamCost: number }> => {
      const response = await apiClient.get<{ teamCost: number }>(`/tournament/team-cost`);
      return response.data;
    },

    /**
     * Obtener lista de fechas importantes del torneo actual
     * GET /tournament/important-dates
     * Retorna: Array<{ date: string, description: string }>
     */
    getCurrentTournamentImportantDates: async (): Promise<Array<{ date: string, description: string }>> => {
      const response = await apiClient.get<Array<{ date: string, description: string }>>(`/tournament/important-dates`);
      return response.data;
    },
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
   * Obtener torneo activo (status IN_PROGRESS o ACTIVE)
   * GET /tournaments/active  — requiere autenticación
   * Punto de entrada principal del módulo de fases.
   */
  getActiveTournament: async (): Promise<TournamentResponseDTO> => {
    try {
      const response = await apiClient.get<TournamentResponseDTO>('/tournaments/active');
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
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
