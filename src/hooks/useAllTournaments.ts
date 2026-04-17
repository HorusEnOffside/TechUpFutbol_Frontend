import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';
import type { TournamentResponseDTO } from '../types/tournament';

export function useAllTournaments() {
  const [tournaments, setTournaments] = useState<TournamentResponseDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getAllTournaments()
      .then(setTournaments)
      .catch(() => setError('No se pudo cargar la lista de torneos.'))
      .finally(() => setLoading(false));
  }, []);

  return { tournaments, loading, error };
}
