import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentStatus() {
  const [status, setStatus] = useState<'OPEN' | 'CLOSED' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentStatus()
      .then((data) => setStatus(data.status))
      .catch(() => setError('No se pudo cargar el estado de inscripciones.'))
      .finally(() => setLoading(false));
  }, []);

  return { status, loading, error };
}
