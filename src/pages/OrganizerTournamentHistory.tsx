
import { Loader2, AlertCircle, History } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import canchaImg from "../assets/cancha.png";
import { TournamentHistoryCard } from "../components/TournamentHistoryCard";
import { useAllTournaments } from "../hooks/useAllTournaments";

export default function OrganizerTournamentHistory() {
  const { tournaments, loading, error } = useAllTournaments();

  // Solo mostrar torneos finalizados
  const torneosFinalizados = (tournaments || []).filter(t => t.status === 'COMPLETED');

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12 mt-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Banner principal */}
            <div className="flex-1 rounded-2xl shadow-2xl overflow-hidden border-2 border-[#144C9F]/30" style={{background: "rgba(7,31,74,0.92)"}}>
              <div className="flex flex-col items-start gap-2 px-10 py-8">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-2 bg-[#17A65B]/20 border border-[#39D17D]/40 text-[#39D17D] px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                    <span className="w-2 h-2 bg-[#39D17D] rounded-full animate-pulse" aria-hidden="true" />Organizador</span>
                  <span className="inline-flex items-center gap-1.5 text-white/40 text-xs"></span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Historial de Torneos</h2>
                <p className="text-base md:text-lg text-white/80">Revisa el historial de tus torneos</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 mb-16">
          <div className="rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col" style={{background: "rgba(7,31,74,0.92)"}}>
            <div className="text-[#39D17D] font-black text-2xl mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>Torneos finalizados</div>
            <div className="flex flex-col gap-6 min-h-[120px]">
              {loading && (
                <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                  <Loader2 className="w-7 h-7 animate-spin text-[#39D17D]" />
                  <span className="text-sm">Cargando torneos…</span>
                </div>
              )}
              {!loading && error && (
                <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                  <AlertCircle className="w-7 h-7 text-red-400" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {!loading && !error && torneosFinalizados.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                  <History className="w-7 h-7" />
                  <span className="text-sm">No hay torneos finalizados aún.</span>
                </div>
              )}
              {!loading && !error && torneosFinalizados.length > 0 &&
                torneosFinalizados.map((t) => (
                  <div key={t.id} className="mb-4">
                    <div className="rounded-2xl px-6 py-4 bg-[#12336a] border-2 border-[#39D17D]/40 shadow flex flex-col gap-2 text-white w-full">
                      <TournamentHistoryCard
                        nombre={t.name}
                        fechaInicio={t.startDate}
                        fechaFin={t.endDate}
                        jugadores={t.teamsAmount}
                        costoInscripcion={t.teamCost}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
