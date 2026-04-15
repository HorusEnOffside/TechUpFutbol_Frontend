import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentImportantDates() {
  const [dates, setDates] = useState<Array<{ date: string; description: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentImportantDates()
      .then((data) => setDates(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudo cargar las fechas importantes.'))
      .finally(() => setLoading(false));
  }, []);

  return { dates, loading, error };
}
