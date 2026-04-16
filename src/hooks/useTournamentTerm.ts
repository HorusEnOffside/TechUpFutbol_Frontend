import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentTerm() {
  const [term, setTerm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentTerm()
      .then((data) => setTerm(data.term))
      .catch(() => setError('No se pudo cargar el periodo del torneo.'))
      .finally(() => setLoading(false));
  }, []);

  return { term, loading, error };
}
