
export type UserRole = 'ADMIN' | 'ORGANIZER' | 'REFEREE' | 'PLAYER' | 'OTHER';

export interface UserResponseDTO {
  name: string;
  mail: string;
  dateOfBirth: string; // ISO string, e.g. '2000-01-01'
  gender: Gender;
  roles: UserRole[];
}
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface UserDTO {
  name: string;
  mail: string;
  dateOfBirth: string; // ISO string, e.g. '2000-01-01'
  gender: Gender;
  password: string;
}
