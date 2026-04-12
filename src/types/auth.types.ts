// ─── Auth Request DTOs ────────────────────────────────────────────────────────

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

// ─── Auth Response DTOs ───────────────────────────────────────────────────────

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponseDTO {
  user: UserDTO;
  tokens: AuthTokensDTO;
}

export interface RegisterResponseDTO {
  user: UserDTO;
  tokens: AuthTokensDTO;
}

// ─── Domain enums ─────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'user' | 'guest';

// ─── Auth store state ─────────────────────────────────────────────────────────

export interface AuthState {
  user: UserDTO | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
