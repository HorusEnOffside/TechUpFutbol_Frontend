import { useState } from "react";
import { Search, Trophy, Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import MatchService from "../services/match.service";
import type { MatchDTO, PlayerMatchStats } from "../types/match";
import matchBg from "../assets/cancha.png";

// confirmar
function ConfirmModal({
  localName,
  visitorName,
  localScore,
  visitorScore,
  onConfirm,
  onCancel,
  loading,
}: {
  localName: string;
  visitorName: string;
  localScore: number;
  visitorScore: number;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col gap-5"
        style={{ background: "rgba(7,31,74,0.95)" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Russo One', sans-serif" }}>
            Confirmar resultado
          </h2>
          <button onClick={onCancel} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-white/60 text-sm">
          ¿Estás seguro de que deseas registrar el siguiente resultado?
        </p>

        <div className="flex items-center justify-center gap-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-center">
            <p className="text-white/50 text-xs mb-1">{localName}</p>
            <p className="text-[#39D17D] text-3xl font-bold" style={{ fontFamily: "'Russo One', sans-serif" }}>
              {localScore}
            </p>
          </div>
          <span className="text-white/30 text-2xl font-bold">—</span>
          <div className="text-center">
            <p className="text-white/50 text-xs mb-1">{visitorName}</p>
            <p className="text-[#39D17D] text-3xl font-bold" style={{ fontFamily: "'Russo One', sans-serif" }}>
              {visitorScore}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/20 text-white/70 text-sm hover:bg-white/10 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#17A65B] text-white text-sm font-bold hover:bg-[#39D17D] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            {loading ? "Guardando…" : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// página principal
export default function MatchManagementPage() {
  const [matchId, setMatchId]         = useState("");
  const [match, setMatch]             = useState<MatchDTO | null>(null);
  const [searching, setSearching]     = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [localScore, setLocalScore]     = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);

  const [stats, setStats] = useState<Record<string, PlayerMatchStats>>({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [success, setSuccess]         = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // para probar sin back
  const MOCK_MATCH: MatchDTO = {
    id: "3",
    localTeamId: "t1",
    localTeamName: "Sistemas FC",
    visitorTeamId: "t2",
    visitorTeamName: "IA United",
    date: "2026-04-15",
    status: "SCHEDULED",
    players: [
      { playerId: "p1", playerName: "Carlos Pérez",   dorsalNumber: 10, teamId: "t1", teamName: "Sistemas FC" },
      { playerId: "p2", playerName: "Andrés López",   dorsalNumber:  7, teamId: "t1", teamName: "Sistemas FC" },
      { playerId: "p3", playerName: "Miguel Torres",  dorsalNumber:  4, teamId: "t1", teamName: "Sistemas FC" },
      { playerId: "p4", playerName: "Juan Ramírez",   dorsalNumber:  9, teamId: "t2", teamName: "IA United"   },
      { playerId: "p5", playerName: "Sebastián Mora", dorsalNumber: 11, teamId: "t2", teamName: "IA United"   },
      { playerId: "p6", playerName: "Felipe Castro",  dorsalNumber:  3, teamId: "t2", teamName: "IA United"   },
    ],
  };

  // buscar partido
  function handleSearch() {
    if (!matchId.trim()) return;
    setSearching(true);
    setSearchError(null);
    setMatch(null);
    setStats({});
    setSuccess(false);

    // Mock para ID "3"
    if (matchId.trim() === "3") {
      setTimeout(() => {
        setMatch(MOCK_MATCH);
        const initial: Record<string, PlayerMatchStats> = {};
        MOCK_MATCH.players.forEach((p) => {
          initial[p.playerId] = { playerId: p.playerId, yellowCards: 0, redCards: 0, goals: 0 };
        });
        setStats(initial);
        setSearching(false);
      }, 400);
      return;
    }

    MatchService.getMatch(matchId.trim())
      .then((data) => {
        setMatch(data);
        const initial: Record<string, PlayerMatchStats> = {};
        data.players.forEach((p) => {
          initial[p.playerId] = { playerId: p.playerId, yellowCards: 0, redCards: 0, goals: 0 };
        });
        setStats(initial);
      })
      .catch(() => setSearchError("No se encontró un partido con ese ID."))
      .finally(() => setSearching(false));
  }

  // actualizar estadísticas de jugador
  function updateStat(playerId: string, field: keyof Omit<PlayerMatchStats, "playerId">, value: number) {
    setStats((prev) => ({
      ...prev,
      [playerId]: { ...prev[playerId], [field]: Math.max(0, value) },
    }));
  }

  // enviar resultado
  function handleSubmit() {
    setShowConfirm(false);
    setSubmitting(true);
    setSubmitError(null);

    MatchService.createResult(matchId.trim(), {
      localScore,
      visitorScore,
      playerStats: Object.values(stats),
    })
      .then(() => setSuccess(true))
      .catch(() => setSubmitError("No se pudo registrar el resultado. Intenta de nuevo."))
      .finally(() => setSubmitting(false));
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050d1a]">

      {/* ── Fondo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${matchBg})`,
          filter: "blur(3px) brightness(0.30)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,13,26,0.90) 0%, rgba(7,31,74,0.70) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(23,166,91,0.20) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <NavBarTransparent />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Tarjeta principal */}
        <div
          className="w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: "rgba(5,13,26,0.75)", backdropFilter: "blur(16px)" }}
        >
          {/* Encabezado */}
          <div
            className="px-6 sm:px-8 py-5 flex items-center gap-3"
            style={{ background: "linear-gradient(90deg, #144C9F 0%, #17A65B 100%)" }}
          >
            <Trophy className="w-6 h-6 text-white shrink-0" aria-hidden="true" />
            <h1
              className="text-white text-2xl sm:text-3xl tracking-wide"
              style={{ fontFamily: "'Russo One', sans-serif" }}
            >
              Resultado Partido
            </h1>
          </div>

          <div className="px-6 sm:px-8 py-8 flex flex-col gap-6">

            {/* ── Búsqueda por ID ── */}
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-sm font-semibold uppercase tracking-widest">
                Id Partido
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Ej: 1"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#39D17D] transition-colors"
                />
                <button
                  onClick={handleSearch}
                  disabled={searching || !matchId.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#144C9F] text-white text-sm font-bold hover:bg-[#1a5fc7] transition-all disabled:opacity-50"
                >
                  {searching
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Search className="w-4 h-4" />}
                  Buscar
                </button>
              </div>
              {searchError && (
                <p className="flex items-center gap-2 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {searchError}
                </p>
              )}
            </div>

            {/* ── Formulario (aparece tras encontrar el partido) ── */}
            {match && (
              <>
                {/* Marcadores */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: `Marcador Local (${match.localTeamName})`, value: localScore, set: setLocalScore },
                    { label: `Marcador Visitante (${match.visitorTeamName})`, value: visitorScore, set: setVisitorScore },
                  ].map(({ label, value, set }) => (
                    <div key={label} className="flex flex-col gap-2">
                      <label className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                        {label}
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={value}
                        onChange={(e) => set(Math.max(0, Number(e.target.value)))}
                        className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#39D17D] transition-colors text-center text-xl font-bold"
                        style={{ fontFamily: "'Russo One', sans-serif" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Tabla de jugadores */}
                {match.players.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="text-white/50 text-xs uppercase tracking-widest border-b border-white/10"
                          style={{ background: "rgba(7,31,74,0.55)" }}
                        >
                          <th className="text-left px-4 py-3 font-semibold">Jugador</th>
                          <th className="text-left px-3 py-3 font-semibold text-xs">Equipo</th>
                          <th className="text-center px-3 py-3 font-semibold">🟡 Amarillas</th>
                          <th className="text-center px-3 py-3 font-semibold">🔴 Rojas</th>
                          <th className="text-center px-3 py-3 font-semibold">⚽ Goles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {match.players.map((player, idx) => {
                          const s = stats[player.playerId] ?? { yellowCards: 0, redCards: 0, goals: 0 };
                          return (
                            <tr
                              key={player.playerId}
                              className={`border-b border-white/5 ${idx % 2 === 0 ? "bg-white/[0.03]" : ""}`}
                            >
                              <td className="px-4 py-3 text-white font-semibold">
                                #{player.dorsalNumber} {player.playerName}
                              </td>
                              <td className="px-3 py-3 text-white/50 text-xs">{player.teamName}</td>
                              {(
                                [
                                  { field: "yellowCards" as const, val: s.yellowCards },
                                  { field: "redCards" as const,    val: s.redCards    },
                                  { field: "goals" as const,       val: s.goals       },
                                ] as const
                              ).map(({ field, val }) => (
                                <td key={field} className="px-3 py-3 text-center">
                                  <input
                                    type="number"
                                    min={0}
                                    value={val}
                                    onChange={(e) => updateStat(player.playerId, field, Number(e.target.value))}
                                    className="w-16 bg-white/5 border border-white/15 rounded-lg px-2 py-1 text-white text-center text-sm focus:outline-none focus:border-[#39D17D] transition-colors"
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Error de envío */}
                {submitError && (
                  <p className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {submitError}
                  </p>
                )}

                {/* Éxito */}
                {success && (
                  <div className="flex items-center gap-2 bg-[#17A65B]/20 border border-[#39D17D]/40 text-[#39D17D] px-4 py-3 rounded-xl text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Resultado registrado exitosamente.
                  </div>
                )}

                {/* Error de validación */}
                {validationError && (
                  <p className="flex items-center gap-2 text-yellow-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {validationError}
                  </p>
                )}

                {/* Botón CREAR */}
                {!success && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        if (!match) return;
                        setValidationError(null);

                        const localPlayers   = match.players.filter(p => p.teamId === match.localTeamId);
                        const visitorPlayers = match.players.filter(p => p.teamId === match.visitorTeamId);

                        const localGoals   = localPlayers.reduce((sum, p) => sum + (stats[p.playerId]?.goals ?? 0), 0);
                        const visitorGoals = visitorPlayers.reduce((sum, p) => sum + (stats[p.playerId]?.goals ?? 0), 0);

                        if (localGoals !== localScore) {
                          setValidationError(
                            `Los goles de ${match.localTeamName} suman ${localGoals} pero el marcador indica ${localScore}.`
                          );
                          return;
                        }
                        if (visitorGoals !== visitorScore) {
                          setValidationError(
                            `Los goles de ${match.visitorTeamName} suman ${visitorGoals} pero el marcador indica ${visitorScore}.`
                          );
                          return;
                        }
                        setShowConfirm(true);
                      }}
                      disabled={submitting}
                      className="px-8 py-3 rounded-xl bg-[#17A65B] text-white font-bold text-sm hover:bg-[#39D17D] transition-all disabled:opacity-50 flex items-center gap-2"
                      style={{ fontFamily: "'Russo One', sans-serif" }}
                    >
                      {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      CREAR
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal de confirmación */}
      {showConfirm && match && (
        <ConfirmModal
          localName={match.localTeamName}
          visitorName={match.visitorTeamName}
          localScore={localScore}
          visitorScore={visitorScore}
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirm(false)}
          loading={submitting}
        />
      )}
    </div>
  );
}
