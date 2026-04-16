import apiClient from './api';
import type { TeamFullInfoDTO } from '../types/standings';

export interface TeamResponseDTO {
  id: string;
  name: string;
  uniformColor: string;
  logo: string | null;
  formation: string | null;
  captain: unknown;
  payment: unknown | null;
}

const TeamService = {
  /**
   * Crear un equipo (capitán)
   * POST /teams  multipart/form-data: name, uniformColors, captainUserId, logo?
   */
  createTeam: async (
    name: string,
    uniformColors: string,
    captainUserId: string,
    logo?: File | null,
  ): Promise<TeamResponseDTO> => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('uniformColors', uniformColors);
    formData.append('captainUserId', captainUserId);
    if (logo) formData.append('logo', logo);

    // No fijar Content-Type manualmente: axios lo setea con el boundary correcto
    const { data } = await apiClient.post<TeamResponseDTO>('/teams', formData);
    return data;
  },

  /**
   * Invitar un jugador al equipo
   * POST /teams/{teamId}/invite/{playerId}?message=...
   */
  invitePlayer: async (
    teamId: string,
    playerId: string,
    message?: string,
  ): Promise<void> => {
    await apiClient.post(
      `/teams/${teamId}/invite/${playerId}`,
      null,
      { params: message ? { message } : undefined },
    );
  },

  /**
   * Información completa de un equipo con jugadores
   * GET /teams/{teamId}/full  — requiere autenticación
   */
  getTeamFullInfo: async (teamId: string): Promise<TeamFullInfoDTO> => {
    try {
      const { data } = await apiClient.get<TeamFullInfoDTO>(`/teams/${teamId}/full`);
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },

  /**
   * Todos los equipos de un torneo con jugadores incluidos
   * GET /teams/tournament/{tournamentId}/full  — requiere autenticación
   */
  getTeamsByTournament: async (tournamentId: string): Promise<TeamFullInfoDTO[]> => {
    try {
      const { data } = await apiClient.get<TeamFullInfoDTO[]>(
        `/teams/tournament/${tournamentId}/full`,
      );
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
};

export default TeamService;
