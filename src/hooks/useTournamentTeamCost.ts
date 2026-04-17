import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import TournamentService from '../services/tournament.service';

export function useTournamentTeamCost() {
  const { isAuthenticated } = useAuth();
  const [teamCost, setTeamCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    TournamentService.getActiveTournament()
      .then((t) => setTeamCost(t.teamCost))
      .catch(() => setError('No se pudo cargar el costo por equipo.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { teamCost, loading, error };
}
