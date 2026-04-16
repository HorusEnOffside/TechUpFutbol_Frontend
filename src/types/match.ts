export interface MatchPlayerDTO {
  playerId: string;
  playerName: string;
  dorsalNumber: number;
  teamId: string;
  teamName: string;
}

export interface MatchDTO {
  id: string;
  localTeamId: string;
  localTeamName: string;
  visitorTeamId: string;
  visitorTeamName: string;
  players: MatchPlayerDTO[];
  date: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED';
}

export interface PlayerMatchStats {
  playerId: string;
  yellowCards: number;
  redCards: number;
  goals: number;
}

export interface MatchResultDTO {
  localScore: number;
  visitorScore: number;
  playerStats: PlayerMatchStats[];
}
