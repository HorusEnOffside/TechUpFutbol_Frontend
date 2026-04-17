// El backend no expone un conteo de equipos inscritos en /tournaments/active.
// Este hook devuelve null para que los componentes muestren "No disponible".
export function useTournamentRegisteredTeams() {
  return { registeredTeams: null as number | null, loading: false, error: null };
}
