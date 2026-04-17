import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import TournamentService from '../services/tournament.service';

// El backend no expone un campo "term". Se deriva del año y mes de startDate.
function deriveTerm(startDate: string): string {
  const date = new Date(startDate);
  const year = date.getFullYear();
  const semester = date.getMonth() < 6 ? 1 : 2;
  return `${year}-${semester}`;
}

export function useTournamentTerm() {
  const { isAuthenticated } = useAuth();
  const [term, setTerm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    TournamentService.getActiveTournament()
      .then((t) => setTerm(deriveTerm(t.startDate)))
      .catch(() => setError('No se pudo cargar el periodo del torneo.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { term, loading, error };
}
