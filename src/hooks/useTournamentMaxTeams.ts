import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import TournamentService from '../services/tournament.service';

export function useTournamentMaxTeams() {
  const { isAuthenticated } = useAuth();
  const [maxTeams, setMaxTeams] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    TournamentService.getActiveTournament()
      .then((t) => setMaxTeams(t.teamsMaxAmount))
      .catch(() => setError('No se pudo cargar el número máximo de equipos.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { maxTeams, loading, error };
}
