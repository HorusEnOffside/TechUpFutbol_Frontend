import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentTeamCost() {
  const [teamCost, setTeamCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentTeamCost()
      .then((data) => setTeamCost(data.teamCost))
      .catch(() => setError('No se pudo cargar el costo por equipo.'))
      .finally(() => setLoading(false));
  }, []);

  return { teamCost, loading, error };
}
