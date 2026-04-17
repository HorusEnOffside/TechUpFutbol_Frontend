import apiClient from './api';
import type {
  PlayerResponseDTO,
  PlayerDTO,
  StudentPlayerDTO,
} from '../types/player';
import type { PlayerSearchParams, PlayerSearchResultDTO } from '../types/standings';

// Servicio de jugadores basado en PlayerController del backend

const PlayerService = {
  /**
   * Crear perfil deportivo de estudiante
   * @param {StudentPlayerDTO} player - Datos del estudiante
   * @param {File | null} profilePicture - Imagen de perfil opcional
   * @returns {Promise<PlayerResponseDTO>}
   */
  createSportsProfileStudent: async (
    player: StudentPlayerDTO,
    profilePicture?: File | null
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/students/sports-profile', formData);
    return data;
  },

  /**
   * Crear perfil deportivo de profesor
   * @param {PlayerDTO} player - Datos del profesor
   * @param {File | null} profilePicture - Imagen de perfil opcional
   * @returns {Promise<PlayerResponseDTO>}
   */
  createSportsProfileTeacher: async (
    player: PlayerDTO,
    profilePicture?: File | null
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/teachers/sports-profile', formData);
    return data;
  },

  /**
   * Crear perfil deportivo de familiar
   * @param {PlayerDTO} player - Datos del familiar
   * @param {File | null} profilePicture - Imagen de perfil opcional
   * @returns {Promise<PlayerResponseDTO>}
   */
  createSportsProfileFamiliar: async (
    player: PlayerDTO,
    profilePicture?: File | null
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/familiars/sports-profile', formData);
    return data;
  },

  /**
   * Crear perfil deportivo de egresado
   * @param {PlayerDTO} player - Datos del egresado
   * @param {File | null} profilePicture - Imagen de perfil opcional
   * @returns {Promise<PlayerResponseDTO>}
   */
  createSportsProfileGraduate: async (
    player: PlayerDTO,
    profilePicture?: File | null
  ): Promise<PlayerResponseDTO> => {
    const formData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>('/players/graduates/sports-profile', formData);
    return data;
  },

  /**
   * Obtener todos los jugadores (requiere autenticación)
   * @returns {Promise<PlayerResponseDTO[]>}
   */
  getAllPlayers: async (): Promise<PlayerResponseDTO[]> => {
    const { data } = await apiClient.get<PlayerResponseDTO[]>('/players');
    return data;
  },

  /**
   * Obtener jugador por userId (requiere autenticación)
   * @param {string} userId
   * @returns {Promise<PlayerResponseDTO>}
   */
  getPlayerByUserId: async (userId: string): Promise<PlayerResponseDTO> => {
    const { data } = await apiClient.get<PlayerResponseDTO>(`/players/${userId}`);
    return data;
  },

  /**
   * Buscar jugadores por filtros opcionales
   * GET /players/search  — requiere rol: CAPTAIN, ADMIN u ORGANIZER
   * @param {PlayerSearchParams} params - Filtros opcionales (position, semester, age, gender, name)
   */
  /**
   * Buscar jugadores por filtros opcionales
   * GET /players/search  — requiere rol: CAPTAIN, ADMIN u ORGANIZER
   * Retorna PlayerSearchResultDTO[] (no PlayerResponseDTO)
   */
  /**
   * Actualizar disponibilidad del jugador
   * PATCH /players/{userId}/status?status=AVAILABLE|INJURED|NOT_AVAILABLE
   */
  updateStatus: async (userId: string, status: 'AVAILABLE' | 'INJURED' | 'NOT_AVAILABLE'): Promise<PlayerResponseDTO> => {
    const { data } = await apiClient.patch<PlayerResponseDTO>(`/players/${userId}/status`, null, { params: { status } });
    return data;
  },

  searchPlayers: async (params: PlayerSearchParams = {}): Promise<PlayerSearchResultDTO[]> => {
    try {
      const { data } = await apiClient.get<PlayerSearchResultDTO[]>('/players/search', {
        params,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Error inesperado');
    }
  },
};

export default PlayerService;
