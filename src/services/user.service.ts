import apiClient from './api';
import type { UUID } from '../types/common';
import type { UserDTO, UserResponseDTO } from '../types/user';

function userBlob(dto: UserDTO): Blob {
  return new Blob([JSON.stringify(dto)], { type: 'application/json' });
}

const UserService = {
  /**
   * Crear usuario administrador (requiere rol ADMIN)
   * POST /users/admin — multipart/form-data
   */
  createAdminUser: async (user: UserDTO, profilePicture?: File): Promise<UserResponseDTO> => {
    const formData = new FormData();
    formData.append('user', userBlob(user), 'user.json');
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<UserResponseDTO>('/users/admin', formData);
    return data;
  },

  /**
   * Crear usuario organizador (requiere rol ADMIN)
   * POST /users/organizer — multipart/form-data
   */
  createOrganizerUser: async (user: UserDTO, profilePicture?: File): Promise<UserResponseDTO> => {
    const formData = new FormData();
    formData.append('user', userBlob(user), 'user.json');
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<UserResponseDTO>('/users/organizer', formData);
    return data;
  },

  /**
   * Crear usuario árbitro (requiere rol ADMIN)
   * POST /users/referee — multipart/form-data
   */
  createRefereeUser: async (user: UserDTO, profilePicture?: File): Promise<UserResponseDTO> => {
    const formData = new FormData();
    formData.append('user', userBlob(user), 'user.json');
    if (profilePicture) formData.append('profilePicture', profilePicture);
    const { data } = await apiClient.post<UserResponseDTO>('/users/referee', formData);
    return data;
  },

  /** GET /users — requiere rol ADMIN */
  getAllUsers: async (): Promise<UserResponseDTO[]> => {
    const { data } = await apiClient.get<UserResponseDTO[]>('/users');
    return data;
  },

  /** GET /users/{id} — requiere rol ADMIN */
  getUserById: async (id: UUID): Promise<UserResponseDTO> => {
    const { data } = await apiClient.get<UserResponseDTO>(`/users/${id}`);
    return data;
  },
};

export default UserService;
