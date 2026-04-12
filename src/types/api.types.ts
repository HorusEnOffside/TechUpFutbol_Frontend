// ─── Generic API Response wrapper ───────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Error shapes ─────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface NetworkError {
  message: string;
  isNetworkError: true;
}

export type AppError = ApiError | NetworkError;

// ─── Request state ────────────────────────────────────────────────────────────

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: RequestStatus;
  error: AppError | null;
}
