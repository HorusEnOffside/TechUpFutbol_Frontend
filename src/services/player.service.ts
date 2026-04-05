
import apiClient from './api';
import type {
  PlayerResponseDTO,
  PlayerDTO,
  StudentPlayerDTO,
} from '../types/player';

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
    formData.append('player', JSON.stringify(player));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>(
      '/players/students/sports-profile',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
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
    formData.append('player', JSON.stringify(player));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>(
      '/players/teachers/sports-profile',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
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
    formData.append('player', JSON.stringify(player));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>(
      '/players/familiars/sports-profile',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
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
    formData.append('player', JSON.stringify(player));
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<PlayerResponseDTO>(
      '/players/graduates/sports-profile',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
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
};

export default PlayerService;
