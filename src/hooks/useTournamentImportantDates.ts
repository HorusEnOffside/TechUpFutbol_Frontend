import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import TournamentService from '../services/tournament.service';

// Se mapean los horarios del torneo (HorarioResponseDTO) al formato { date, description }
export function useTournamentImportantDates() {
  const { isAuthenticated } = useAuth();
  const [dates, setDates] = useState<Array<{ date: string; description: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    TournamentService.getActiveTournament()
      .then((t) =>
        setDates(
          (t.horarios ?? []).map((h) => ({ date: h.fecha, description: h.descripcion })),
        ),
      )
      .catch(() => setError('No se pudo cargar las fechas importantes.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { dates, loading, error };
}
