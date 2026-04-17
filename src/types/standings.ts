// ─── Standings (GET /standings/{tournamentId}) ────────────────────────────────

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

// ─── Top Scorers (GET /standings/{tournamentId}/top-scorers) ──────────────────

export interface TopScorerDTO {
  userId: string;
  name: string;
  goals: number;
  teamId: string;
}

// ─── Cards History (GET /standings/{tournamentId}/cards-history) ──────────────

export type CardType = 'YELLOW' | 'RED';

export interface CardEventDTO {
  id: string;
  type: CardType;
  playerId: string;
  teamId: string;
  matchId: string;
  minute: number;
}

// ─── Team Full Info (GET /teams/{id}/full) ────────────────────────────────────

export interface TeamPlayerInfoDTO {
  playerId: string;
  name: string;
  mail: string;
  position: string;
  dorsalNumber: number;
  isCaptain: boolean;
}

export interface TeamMatchInfoDTO {
  matchId: string;
  dateTime: string;
  opponentName: string;
  goalsFor: number;
  goalsAgainst: number;
  result: 'WIN' | 'LOSS' | 'DRAW' | 'PENDING';
}

export interface TeamStatsDTO {
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface TeamFullInfoDTO {
  teamId: string;           // backend usa teamId, no id
  name: string;
  uniformColor: string;
  tournamentId: string;
  tournamentName: string;
  captainName: string;
  players: TeamPlayerInfoDTO[];
  matches: TeamMatchInfoDTO[];
  stats: TeamStatsDTO;
}

// ─── Player Search (GET /players/search) ─────────────────────────────────────

export interface PlayerSearchParams {
  position?: string;
  semester?: number;
  age?: number;
  gender?: string;
  name?: string;
  playerId?: string;
}

export interface PlayerSearchResultDTO {
  playerId: string;
  name: string;
  mail: string;
  position: string;
  dorsalNumber: number;
  gender: string;
  status: string;
  teamName: string | null;
}
