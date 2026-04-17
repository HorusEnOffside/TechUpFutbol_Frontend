// ─── Tournament Status ────────────────────────────────────────────────────────
// Valores reales del backend (TournamentStatus enum en Java)
export type TournamentStatus = 'PLANNING' | 'REGISTRATION' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';

// ─── Supporting types ─────────────────────────────────────────────────────────

export interface CanchaResponseDTO {
  id: string;
  tipo: string;
  nombre: string | null;
  fotoUrl: string | null;
}

export interface HorarioResponseDTO {
  id: string;
  fecha: string;        // LocalDate → ISO string "YYYY-MM-DD"
  descripcion: string;
}

// ─── Tournament ───────────────────────────────────────────────────────────────

export interface TournamentResponseDTO {
  id: string;
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

// ─── Standings row (GET /tournaments/{id}/standings — si existe) ──────────────
export interface StandingRowDTO {
  position: number;
  teamId: string;
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
