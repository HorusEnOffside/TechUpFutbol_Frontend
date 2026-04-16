// ─── Standings ────────────────────────────────────────────────────────────────

export interface StandingsEntryDTO {
  id: string;
  name: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

// ─── Top Scorers ──────────────────────────────────────────────────────────────

export interface TopScorerDTO {
  userId: string;
  name: string;
  goals: number;
  teamId: string;
}

// ─── Cards History ────────────────────────────────────────────────────────────

export type CardType = 'YELLOW' | 'RED';

export interface CardEventDTO {
  id: string;
  type: CardType;
  playerId: string;
  teamId: string;
  matchId: string;
  minute: number;
}

// ─── Team Full Info ───────────────────────────────────────────────────────────

export interface TeamPlayerInfoDTO {
  userId: string;
  name: string;
  position: string;
  dorsalNumber: number;
}

export interface TeamFullInfoDTO {
  id: string;
  name: string;
  uniformColor: string;
  logo: string | null;
  formation: string | null;
  players: TeamPlayerInfoDTO[];
}

// ─── Player Search ────────────────────────────────────────────────────────────

export interface PlayerSearchParams {
  position?: string;
  semester?: number;
  age?: number;
  gender?: string;
  name?: string;
}
