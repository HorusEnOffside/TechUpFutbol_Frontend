export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: string;
  mail: string;
  roles: string[];
}

export interface RegisterRequest {
  name: string;
  mail: string;
  password: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dorsalNumber?: number;
  position?: 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';
  semester?: number;
  career?: 'ENGINEERING' | 'DATA_SCIENCE' | 'OTHER';
}

export interface UserProfile {
  id: string;
  name: string;
  mail: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  roles: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// Aliases for backwards compatibility with existing hooks
export type LoginPayload = LoginRequest;
export type RegisterPayload = RegisterRequest;
