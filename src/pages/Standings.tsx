import { useEffect, useState } from "react";
import { Trophy, Clock, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import TournamentService from "../services/tournament.service";
import StandingsService from "../services/standings.service";
import { ApiError } from "../services/api";
import type { StandingsEntryDTO } from "../types/standings";
import canchaImg from "../assets/cancha.png";

const LEGEND = [
  { key: "PJ",  label: "Partidos Jugados"  },
  { key: "G",   label: "Ganados"           },
  { key: "E",   label: "Empatados"         },
  { key: "P",   label: "Perdidos"          },
  { key: "GF",  label: "Goles a Favor"     },
  { key: "GC",  label: "Goles en Contra"   },
  { key: "DG",  label: "Diferencia de Gol" },
  { key: "PTS", label: "Puntos"            },
];

function posBadgeClass(pos: number): string {
  if (pos === 1) return "bg-[#39D17D] text-[#071F4A]";
  if (pos === 2) return "bg-[#17A65B] text-white";
  if (pos === 3) return "bg-[#144C9F] text-white";
  return "bg-white/10 text-white/70";
}

function dgClass(dg: number): string {
  if (dg > 0) return "text-[#39D17D]";
  if (dg === 0) return "text-white/50";
  return "text-red-400";
}

export default function Standings() {
  const [standings, setStandings] = useState<StandingsEntryDTO[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    TournamentService.getActiveTournament()
      .then((tournament) => StandingsService.getStandingsTable(tournament.id))
      .then((data) => setStandings(Array.isArray(data) ? data : []))
      .catch((err: unknown) => {
        if (err instanceof ApiError) {
          if (err.statusCode === 404) {
            // No hay torneo activo — mostrar tabla vacía sin error
            setStandings([]);
          } else if (err.statusCode === 401 || err.statusCode === 403) {
            setError("Debes iniciar sesión para ver la tabla de posiciones.");
          } else {
            setError(err.message ?? "No se pudo cargar la tabla de posiciones.");
          }
        } else if (err instanceof Error && err.message.includes('conexión')) {
          setError("No hay conexión con el servidor. Verifica que el backend esté activo.");
        } else {
          setError("No se pudo cargar la tabla de posiciones.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050d1a]">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${canchaImg})`,
          filter: "blur(3px) brightness(0.35)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,13,26,0.92) 0%, rgba(7,31,74,0.75) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 85% 55%, rgba(23,166,91,0.22) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <NavBarTransparent />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Badge estado */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 bg-[#17A65B]/20 border border-[#39D17D]/40 text-[#39D17D] px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#39D17D] rounded-full animate-pulse" aria-hidden="true" />
            Torneo Activo · 2026-1
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            Actualizado en tiempo real
          </span>
        </div>

        {/* Tarjeta */}
        <div
          className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: "rgba(5, 13, 26, 0.70)", backdropFilter: "blur(16px)" }}
        >
          {/* Encabezado */}
          <div
            className="px-6 sm:px-8 py-5 flex items-center gap-3"
            style={{ background: "linear-gradient(90deg, #144C9F 0%, #17A65B 100%)" }}
          >
            <Trophy className="w-6 h-6 text-[#39D17D] shrink-0" aria-hidden="true" />
            <h1
              className="text-white text-2xl sm:text-3xl tracking-wide"
              style={{ fontFamily: "'Russo One', sans-serif" }}
            >
              Tabla de Posiciones
            </h1>
          </div>

          {/* Cargando */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50">
              <Loader2 className="w-8 h-8 animate-spin text-[#39D17D]" />
              <p className="text-sm">Cargando posiciones…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Sin datos */}
          {!loading && !error && standings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50">
              <Trophy className="w-8 h-8" />
              <p className="text-sm">No hay torneo activo o aún no hay equipos en la tabla.</p>
            </div>
          )}

          {/* Tabla */}
          {!loading && !error && standings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full" aria-label="Tabla de posiciones del torneo">
                <thead>
                  <tr
                    className="border-b border-white/10 text-white/60 text-xs uppercase tracking-widest"
                    style={{ background: "rgba(7, 31, 74, 0.55)" }}
                  >
                    {(["No", "Equipo", "PJ", "G", "E", "P", "GF", "GC", "DG", "PTS"] as const).map(
                      (col) => (
                        <th
                          key={col}
                          scope="col"
                          className={`py-4 font-semibold select-none ${
                            col === "Equipo"
                              ? "text-left px-5 sm:px-6"
                              : col === "No"
                              ? "text-left pl-5 sm:pl-6 pr-2"
                              : "text-center px-2 sm:px-3"
                          }`}
                          style={{ fontFamily: "'Russo One', sans-serif" }}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {standings.map((entry, idx) => {
                    const pos = idx + 1;
                    return (
                      <tr
                        key={entry.id}
                        className={`border-b border-white/5 transition-colors duration-150 ${
                          idx % 2 === 0 ? "bg-white/[0.04]" : "bg-transparent"
                        } hover:bg-white/[0.09]`}
                      >
                        {/* Posición */}
                        <td className="pl-5 sm:pl-6 pr-2 py-4">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${posBadgeClass(pos)}`}
                            style={{ fontFamily: "'Russo One', sans-serif" }}
                          >
                            {pos}
                          </div>
                        </td>

                        {/* Equipo */}
                        <td className="px-5 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            {pos <= 3 && (
                              <TrendingUp className="w-3.5 h-3.5 text-[#39D17D] shrink-0" aria-hidden="true" />
                            )}
                            <span
                              className="text-white font-semibold text-sm sm:text-base"
                              style={{ fontFamily: "'Russo One', sans-serif" }}
                            >
                              {entry.name}
                            </span>
                          </div>
                        </td>

                        {/* Estadísticas */}
                        {([entry.matchesPlayed, entry.wins, entry.draws, entry.losses, entry.goalsFor, entry.goalsAgainst] as number[]).map(
                          (val, i) => (
                            <td
                              key={i}
                              className="px-2 sm:px-3 py-4 text-center text-white/75 text-sm"
                              style={{ fontFamily: "'Russo One', sans-serif" }}
                            >
                              {val}
                            </td>
                          )
                        )}

                        {/* DG */}
                        <td className="px-2 sm:px-3 py-4 text-center">
                          <span
                            className={`text-sm font-bold ${dgClass(entry.goalDiff)}`}
                            style={{ fontFamily: "'Russo One', sans-serif" }}
                          >
                            {entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}
                          </span>
                        </td>

                        {/* PTS */}
                        <td className="px-2 sm:px-3 py-4 text-center">
                          <span
                            className="text-[#39D17D] font-bold text-base sm:text-lg"
                            style={{ fontFamily: "'Russo One', sans-serif" }}
                          >
                            {entry.points}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Leyenda */}
          <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-black/20">
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/40">
              {LEGEND.map(({ key, label }) => (
                <span key={key}>
                  <b className="text-white/60">{key}</b> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-white/30 text-xs text-center">
          Los 3 primeros equipos clasifican a las llaves eliminatorias
        </p>
      </main>
    </div>
  );
}
