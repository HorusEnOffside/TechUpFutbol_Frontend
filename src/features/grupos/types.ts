export interface Team {
  id: string;
  name: string;
  logo: string;
  points: number;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
}

export interface Group {
  id: string;
  name: string; // e.g. "Grupo A"
  teams: Team[];
}

export interface Match {
  id: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  date: string;      // e.g. "Miercoles 10 de Marzo"
  time: string;      // e.g. "11:30 am"
  subLabel?: string; // group label shown above the row, e.g. "Octavos de final 1"
  winner?: string;   // Final only — name of the winning team
}

export interface Bracket {
  id: string;
  stage: string;  // e.g. "Octavos de final 1"
  matches: Match[];
}

export type GruposTab = 'GRUPOS' | 'LLAVES';
