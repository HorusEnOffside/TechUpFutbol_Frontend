import apiClient from './api';
import type { UUID } from '../types/common';
import type {
  TournamentResponseDTO,
  CreateTournamentDTO,
  ConfigureTournamentDTO,
  CreateHorarioDTO,
} from '../types/tournament';
import type { StandingsEntryDTO } from '../types/standings';

const TournamentService = {
  /** GET /tournaments — lista todos los torneos */
  getAllTournaments: async (): Promise<TournamentResponseDTO[]> => {
    const { data } = await apiClient.get<TournamentResponseDTO[]>('/tournaments');
    return data;
  },

  /** GET /tournaments/{id} — torneo por ID */
  getTournamentById: async (id: UUID): Promise<TournamentResponseDTO> => {
    const { data } = await apiClient.get<TournamentResponseDTO>(`/tournaments/${id}`);
    return data;
  },

  /**
   * GET /tournaments/active — torneo activo (REGISTRATION o ACTIVE).
   * Requiere autenticación. Lanza error si no hay torneo activo.
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
   * POST /tournaments — crea un nuevo torneo.
   * Requiere rol ORGANIZER.
   */
  createTournament: async (dto: CreateTournamentDTO): Promise<TournamentResponseDTO> => {
    const { data } = await apiClient.post<TournamentResponseDTO>('/tournaments', dto);
    return data;
  },

  /**
   * PUT /tournaments/{id}/configure — configura reglamento, sanciones y cierre.
   * Requiere rol ORGANIZER.
   */
  configureTournament: async (
    id: UUID,
    dto: ConfigureTournamentDTO,
  ): Promise<TournamentResponseDTO> => {
    const { data } = await apiClient.put<TournamentResponseDTO>(
      `/tournaments/${id}/configure`,
      dto,
    );
    return data;
  },

  /**
   * POST /tournaments/{id}/horarios — agrega un horario al torneo.
   * Requiere rol ORGANIZER.
   */
  addHorario: async (id: UUID, dto: CreateHorarioDTO): Promise<void> => {
    await apiClient.post(`/tournaments/${id}/horarios`, dto);
  },

  /**
   * GET /standings/{tournamentId} — tabla de posiciones de un torneo.
   * Requiere autenticación.
   */
  getStandings: async (tournamentId: UUID): Promise<StandingsEntryDTO[]> => {
    const { data } = await apiClient.get<StandingsEntryDTO[]>(`/standings/${tournamentId}`);
    return data;
  },
};

export default TournamentService;
