import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentDates() {
  const [dates, setDates] = useState<{ startDate: string; endDate: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentDates()
      .then((data) => setDates(data))
      .catch(() => setError('No se pudo cargar las fechas del torneo.'))
      .finally(() => setLoading(false));
  }, []);

  return { dates, loading, error };
}
