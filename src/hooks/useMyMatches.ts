import { useEffect, useState } from 'react';
import MatchService from '../services/match.service';
import type { Match } from '../types/bracket';

/**
 * Hook para obtener los partidos que arbitra el usuario autenticado (árbitro)
 */
export function useMyMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    MatchService.getMyMatches()
      .then((data) => setMatches(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudo cargar la lista de partidos.'))
      .finally(() => setLoading(false));
  }, []);

  return { matches, loading, error };
}