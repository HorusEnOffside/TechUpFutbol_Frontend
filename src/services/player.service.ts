import apiClient from './api';
import type { UUID } from '../types/common';
import type {
  PlayerResponseDTO,
  PlayerDTO,
  StudentPlayerDTO,
} from '../types/player';
import type { PlayerSearchParams, PlayerSearchResultDTO } from '../types/standings';

const PlayerService = {
  /** POST /players/students/sports-profile — multipart/form-data */
  createSportsProfileStudent: async (
    player: StudentPlayerDTO,
    profilePicture?: File | null,
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/students/sports-profile', formData);
    return data;
  },

  /** POST /players/teachers/sports-profile — multipart/form-data */
  createSportsProfileTeacher: async (
    player: PlayerDTO,
    profilePicture?: File | null,
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/teachers/sports-profile', formData);
    return data;
  },

  /** POST /players/familiars/sports-profile — multipart/form-data */
  createSportsProfileFamiliar: async (
    player: PlayerDTO,
    profilePicture?: File | null,
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/familiars/sports-profile', formData);
    return data;
  },

  /** POST /players/graduates/sports-profile — multipart/form-data */
  createSportsProfileGraduate: async (
    player: PlayerDTO,
    profilePicture?: File | null,
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/graduates/sports-profile', formData);
    return data;
  },

  /** GET /players — requiere autenticación */
  getAllPlayers: async (): Promise<PlayerResponseDTO[]> => {
    const { data } = await apiClient.get<PlayerResponseDTO[]>('/players');
    return data;
  },

  /** GET /players/{userId} — requiere autenticación */
  getPlayerByUserId: async (userId: UUID): Promise<PlayerResponseDTO> => {
    const { data } = await apiClient.get<PlayerResponseDTO>(`/players/${userId}`);
    return data;
  },

  /** POST /players/link — vincula perfil deportivo a usuario existente */
  linkSportsProfile: async (
    userId: UUID,
    position: string,
    dorsalNumber: number,
  ): Promise<PlayerResponseDTO> => {
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/link', {
      userId,
      position,
      dorsalNumber,
    });
    return data;
  },

  /** PATCH /players/{userId}/status?status=... */
  updateStatus: async (
    userId: UUID,
    status: 'AVAILABLE' | 'INJURED' | 'NOT_AVAILABLE',
  ): Promise<PlayerResponseDTO> => {
    const { data } = await apiClient.patch<PlayerResponseDTO>(
      `/players/${userId}/status`,
      null,
      { params: { status } },
    );
    return data;
  },

  /**
   * GET /players/search — requiere rol CAPTAIN, ADMIN u ORGANIZER
   * Retorna PlayerSearchResultDTO[] (no PlayerResponseDTO)
   */
  searchPlayers: async (params: PlayerSearchParams = {}): Promise<PlayerSearchResultDTO[]> => {
    try {
      const { data } = await apiClient.get<PlayerSearchResultDTO[]>('/players/search', { params });
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
};

export default PlayerService;
