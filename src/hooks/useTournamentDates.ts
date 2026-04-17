import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import TournamentService from '../services/tournament.service';

export function useTournamentDates() {
  const { isAuthenticated } = useAuth();
  const [dates, setDates] = useState<{ startDate: string; endDate: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    TournamentService.getActiveTournament()
      .then((t) => setDates({ startDate: t.startDate, endDate: t.endDate }))
      .catch(() => setError('No se pudo cargar las fechas del torneo.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { dates, loading, error };
}
