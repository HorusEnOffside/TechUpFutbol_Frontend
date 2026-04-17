import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import TournamentService from '../services/tournament.service';
import type { TournamentStatus } from '../types/tournament';

export function useTournamentStatus() {
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<TournamentStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    TournamentService.getActiveTournament()
      .then((t) => setStatus(t.status))
      .catch(() => setError('No se pudo cargar el estado del torneo.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { status, loading, error };
}
