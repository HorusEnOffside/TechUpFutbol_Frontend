import type { UUID } from './common';

// ─── Tournament Status ────────────────────────────────────────────────────────
// Valores reales del backend (TournamentStatus enum en Java)
export type TournamentStatus = 'DRAFT' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED';

// ─── Supporting types ─────────────────────────────────────────────────────────

export interface CanchaResponseDTO {
  id: UUID;
  tipo: string;
  nombre: string | null;
  fotoUrl: string | null;
}

export interface HorarioResponseDTO {
  id: UUID;
  fecha: string;        // LocalDate → ISO string "YYYY-MM-DD"
  descripcion: string;
}

// ─── Tournament ───────────────────────────────────────────────────────────────

export interface TournamentResponseDTO {
  id: UUID;
  startDate: string;        // LocalDateTime → ISO string
  endDate: string;
  closingDate: string | null;
  teamsMaxAmount: number;   // backend field name
  teamCost: number;
  status: TournamentStatus;
  reglamento: string | null;
  sanciones: string | null;
  canchas: CanchaResponseDTO[];
  horarios: HorarioResponseDTO[];
}

// ─── Create / Configure DTOs ─────────────────────────────────────────────────

export interface CreateTournamentDTO {
  startDate: string;       // ISO datetime
  endDate: string;         // ISO datetime
  teamsMaxAmount: number;
  teamCost: number;
  status: TournamentStatus;
  organizerId: UUID;
}

export interface ConfigureTournamentDTO {
  reglamento?: string | null;
  sanciones?: string | null;
  closingDate?: string | null;  // ISO datetime
}

export interface CreateHorarioDTO {
  fecha: string;        // "YYYY-MM-DD"
  descripcion: string;
}

// ─── Standings row (legacy — mantenido por compatibilidad) ───────────────────
export interface StandingRowDTO {
  position: number;
  teamId: UUID;
  teamName: string;
  teamLogo?: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}
