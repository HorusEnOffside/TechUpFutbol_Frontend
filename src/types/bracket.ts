import type { TournamentStatus } from './tournament';

// ─── Tournament (full shape used in phases module) ────────────────────────────

export interface Tournament {
  id: string;
  startDate: string;
  endDate: string;
  closingDate: string;
  teamsMaxAmount: number;
  teamCost: number;
  status: TournamentStatus;
  reglamento: string | null;
  canchas: string | null;
  horarios: string | null;
  sanciones: string | null;
}

// ─── Match (full shape from GET /matches) ────────────────────────────────────

export type MatchStatus = 'PENDING' | 'FINISHED';

export interface MatchTeamRef {
  id: string;
  name: string;
  uniformColor: string;
  formation: string | null;
  tournament: { id: string };
}

export interface MatchEvent {
  id: string;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | string;
  playerId: string;
  teamId: string;
  minute: number;
}

export interface Match {
  id: string;
  dateTime: string;
  teamA: MatchTeamRef;
  teamB: MatchTeamRef;
  referee: string | null;
  soccerField: string | null;
  events: MatchEvent[];
  status: MatchStatus;
}

// ─── Elimination Bracket ──────────────────────────────────────────────────────

export interface BracketTeam {
  id: string;
  name: string;
  uniformColor: string;
  formation: string | null;
  players: BracketPlayer[];
}

export interface BracketPlayer {
  userId: string;
  name: string;
  position: string;
  dorsalNumber: number;
}

export interface MatchPair {
  team1: BracketTeam;
  team2: BracketTeam;
}

export interface EliminationBracket {
  roundOf16?: MatchPair[];
  quarterFinals?: MatchPair[];
  semiFinals?: MatchPair[];
  finals?: MatchPair[];
}

export interface BracketResponse {
  eliminationBrackets: EliminationBracket | null;
  message: string;
}
