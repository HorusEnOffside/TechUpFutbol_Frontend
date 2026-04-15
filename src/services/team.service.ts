import apiClient from './api';

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
};

export default TeamService;
