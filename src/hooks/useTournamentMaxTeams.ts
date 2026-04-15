import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentMaxTeams() {
  const [maxTeams, setMaxTeams] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentMaxTeams()
      .then((data) => setMaxTeams(data.maxTeams))
      .catch(() => setError('No se pudo cargar el número máximo de equipos.'))
      .finally(() => setLoading(false));
  }, []);

  return { maxTeams, loading, error };
}
