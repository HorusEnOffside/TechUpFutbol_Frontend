import apiClient from './api';
import type { UserDTO, UserResponseDTO } from '../types/user';

// Servicio de usuarios basado en UserController del backend
const UserService = {
  /**
   * Crear usuario administrador (requiere rol ADMIN)
   * @param user - Objeto UserDTO con los datos del usuario
   * @param profilePicture - Archivo de imagen opcional
   * @returns {Promise<UserResponseDTO>}
   */
  createAdminUser: async (user: UserDTO, profilePicture?: File): Promise<UserResponseDTO> => {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    const response = await apiClient.post<UserResponseDTO>('/users/admin', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Crear usuario organizador (requiere rol ADMIN)
   * @param user - Objeto UserDTO con los datos del usuario
   * @param profilePicture - Archivo de imagen opcional
   * @returns {Promise<UserResponseDTO>}
   */
  createOrganizerUser: async (user: UserDTO, profilePicture?: File): Promise<UserResponseDTO> => {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    const response = await apiClient.post<UserResponseDTO>('/users/organizer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Crear usuario árbitro (requiere rol ADMIN)
   * @param user - Objeto UserDTO con los datos del usuario
   * @param profilePicture - Archivo de imagen opcional
   * @returns {Promise<UserResponseDTO>}
   */
  createRefereeUser: async (user: UserDTO, profilePicture?: File): Promise<UserResponseDTO> => {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    const response = await apiClient.post<UserResponseDTO>('/users/referee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Obtener todos los usuarios (requiere rol ADMIN)
   * @returns {Promise<UserResponseDTO[]>}
   */
  getAllUsers: async (): Promise<UserResponseDTO[]> => {
    const response = await apiClient.get<UserResponseDTO[]>('/users');
    return response.data;
  },

  /**
   * Obtener usuario por ID (requiere rol ADMIN)
   * @param {string} id
   * @returns {Promise<UserResponseDTO>}
   */
  getUserById: async (id: string): Promise<UserResponseDTO> => {
    const response = await apiClient.get<UserResponseDTO>(`/users/${id}`);
    return response.data;
  },
};

export default UserService;
