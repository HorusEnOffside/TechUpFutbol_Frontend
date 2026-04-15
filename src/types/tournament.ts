// torneo
export type TournamentStatus = 'DRAFT' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED';

export interface TournamentResponseDTO {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  teamsAmount: number;
  teamCost: number;
  status: TournamentStatus;
}

// tabla de posiciones
export interface StandingRowDTO {
  position: number;
  teamId: string;
  teamName: string;
  teamLogo?: string;
  matchesPlayed: number;  // PJ
  wins: number;           // G
  draws: number;          // E
  losses: number;         // P
  goalsFor: number;       // GF
  goalsAgainst: number;   // GC
  goalDifference: number; // DG
  points: number;         // PTS
}
