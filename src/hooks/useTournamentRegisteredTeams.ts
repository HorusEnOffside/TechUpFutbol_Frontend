import { useEffect, useState } from 'react';
import TournamentService from '../services/tournament.service';

export function useTournamentRegisteredTeams() {
  const [registeredTeams, setRegisteredTeams] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    TournamentService.getCurrentTournamentRegisteredTeams()
      .then((data) => setRegisteredTeams(data.registeredTeams))
      .catch(() => setError('No se pudo cargar el número de equipos inscritos.'))
      .finally(() => setLoading(false));
  }, []);

  return { registeredTeams, loading, error };
}
