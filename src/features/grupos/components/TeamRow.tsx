import type { Team } from '../types';

interface TeamRowProps {
  team: Team;
  index: number;
}

export function TeamRow({ team }: TeamRowProps) {
  return (
    <div className="grupos-team-row">
      <div className="grupos-team-info">
        <img
          src={team.logo}
          alt={team.name}
          className="grupos-team-logo"
        />
        <span className="grupos-team-name">{team.name}</span>
      </div>
      <span className="grupos-team-points">{team.points}</span>
    </div>
  );
}
