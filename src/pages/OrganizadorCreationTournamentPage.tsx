
import { ArrowLeft } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import { QuickActionButton } from "../components/QuickActionButton";

import canchaImg from "../assets/cancha.png";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function OrganizadorCreationTournamentPage() {
  const navigate = useNavigate();

  // Estados del formulario
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [cierreInscripciones, setCierreInscripciones] = useState("");
  const [maxEquipos, setMaxEquipos] = useState("");
  const [costoEquipo, setCostoEquipo] = useState("");
  const [reglamento, setReglamento] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Validación simple: todos los campos requeridos deben estar llenos
  const formularioValido =
    fechaInicio && fechaFin && cierreInscripciones && maxEquipos && costoEquipo && reglamento;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formularioValido) return;
    setEnviando(true);
    // Aquí iría la lógica para crear el torneo (API, etc.)
    setTimeout(() => {
      setEnviando(false);
      alert("¡Torneo creado exitosamente!");
      // navigate("/alguna-ruta");
    }, 1200);
  };
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
                        <span className="w-2 h-2 bg-[#39D17D] rounded-full animate-pulse" aria-hidden="true" />
                        Organizador
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white/40 text-xs"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Creacion de Torneo</h2>
                    <p className="text-base md:text-lg text-white/80">Crea y gestiona tu torneo</p>
                  </div>
                </div>
              </div>
            </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">    
            <div className="lg:col-span-3 rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col" style={{background: "rgba(7,31,74,0.92)"}}>
                <div className="text-[#39D17D] font-black text-2xl mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>Formulario de Creación de Torneo</div>  
                <div className="flex flex-col gap-8">



                      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {/* Fechas */}
                        <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                          <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Fechas</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block mb-1 text-white/80">Fecha de inicio</label>
                              <input
                                type="datetime-local"
                                className="w-full rounded px-3 py-2 bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition"
                                required
                                value={fechaInicio}
                                onChange={e => setFechaInicio(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-white/80">Fecha de fin</label>
                              <input
                                type="datetime-local"
                                className="w-full rounded px-3 py-2 bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition"
                                required
                                value={fechaFin}
                                onChange={e => setFechaFin(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-white/80">Cierre de inscripciones</label>
                              <input
                                type="datetime-local"
                                className="w-full rounded px-3 py-2 bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition"
                                value={cierreInscripciones}
                                onChange={e => setCierreInscripciones(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Equipos y costo */}
                        <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                          <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Equipos</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block mb-1 text-white/80">Máximo de equipos</label>
                              <input
                                type="number"
                                min={2}
                                className="w-full rounded px-3 py-2 bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition"
                                required
                                value={maxEquipos}
                                onChange={e => setMaxEquipos(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-white/80">Costo por equipo</label>
                              <input
                                type="number"
                                min={0}
                                step={1000}
                                className="w-full rounded px-3 py-2 bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition"
                                required
                                value={costoEquipo}
                                onChange={e => setCostoEquipo(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Reglamento */}
                        <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                          <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Reglamento</h3>
                          <textarea
                            className="w-full rounded px-3 py-2 min-h-[120px] bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition"
                            maxLength={2000}
                            placeholder="Escribe aquí el reglamento del torneo..."
                            required
                            value={reglamento}
                            onChange={e => setReglamento(e.target.value)}
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className={`px-6 py-3 rounded-full font-semibold text-sm shadow-sm transition ${formularioValido && !enviando ? "bg-green-600/80 text-white hover:bg-green-600" : "bg-gray-400 text-white cursor-not-allowed"}`}
                            disabled={!formularioValido || enviando}
                          >
                            {enviando ? "Creando..." : "Crear Torneo"}
                          </button>
                        </div>
                      </form>

                  
                </div>
            </div>

          </section>

          
        </div>
    </div>
  );
}
