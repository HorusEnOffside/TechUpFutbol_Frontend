import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

import type { TournamentStatus } from '../types/tournament';

export function useTournamentStatus() {
  const [status, setStatus] = useState<TournamentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentStatus()
      .then((data) => setStatus(data.status))
      .catch(() => setError('No se pudo cargar el estado del torneo.'))
      .finally(() => setLoading(false));
  }, []);

  return { status, loading, error };
}
