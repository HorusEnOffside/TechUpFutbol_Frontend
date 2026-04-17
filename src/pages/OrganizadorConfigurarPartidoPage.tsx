import { useState } from "react";
import { NavBarTransparent } from "../components/NavBarTransparentNoBack";
import canchaImg from "../assets/cancha.png";

// Simulación de partidos actuales
const partidosMock = [
  {
    id: 1,
    fecha: "2026-04-20",
    hora: "15:00",
    arbitro: "Juan Pérez",
    cancha: "Cancha 1",
  },
  {
    id: 2,
    fecha: "2026-04-21",
    hora: "17:00",
    arbitro: "María López",
    cancha: "Cancha 2",
  },
  {
    id: 3,
    fecha: "2026-04-22",
    hora: "19:00",
    arbitro: "Carlos Ruiz",
    cancha: "Cancha 3",
  },
];

export default function OrganizadorConfigurarPartidoPage() {
  const [partidos, setPartidos] = useState(partidosMock);
  const [selectedId, setSelectedId] = useState(partidos[0].id);
  const partido = partidos.find(p => p.id === selectedId)!;

  const [fecha, setFecha] = useState(partido.fecha);
  const [hora, setHora] = useState(partido.hora);
  const [arbitro, setArbitro] = useState(partido.arbitro);
  const [cancha, setCancha] = useState(partido.cancha);

  const arbitros = ["Juan Pérez", "María López", "Carlos Ruiz"];
  const canchas = ["Cancha 1", "Cancha 2", "Cancha 3"];

  function handleSelect(id: number) {
    setSelectedId(id);
    const p = partidos.find(x => x.id === id)!;
    setFecha(p.fecha);
    setHora(p.hora);
    setArbitro(p.arbitro);
    setCancha(p.cancha);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPartidos(prev => prev.map(p => p.id === selectedId ? { ...p, fecha, hora, arbitro, cancha } : p));
    alert(`Partido actualizado!`);
  }

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
                <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Configurar Partido</h2>
                <p className="text-base md:text-lg text-white/80">Configura los detalles del partido</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12 mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de partidos */}
            <div className="w-full lg:w-1/3">
              <div className="rounded-2xl shadow-2xl overflow-hidden border-2 border-[#144C9F]/30 mb-4" style={{background: "rgba(7,31,74,0.92)"}}>
                <div className="px-6 py-6">
                  <h3 className="text-xl font-bold text-white mb-4">Partidos actuales</h3>
                  <ul className="flex flex-col gap-2">
                    {partidos.map(p => (
                      <li key={p.id}>
                        <button
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all font-semibold ${selectedId === p.id ? 'bg-[#144C9F]/60 text-[#39D17D]' : 'bg-[#0e2347] text-white/80 hover:bg-[#144C9F]/30'}`}
                          onClick={() => handleSelect(p.id)}
                        >
                          {p.fecha} {p.hora} - {p.cancha}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Formulario de edición */}
            <div className="w-full lg:w-2/3">
              <div className="max-w-2xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-2 border-[#144C9F]/30" style={{background: "rgba(7,31,74,0.92)"}}>
                <div className="flex flex-col items-start gap-2 px-10 py-8">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Detalles del Partido</h2>
                  <p className="text-base md:text-lg text-white/80 mb-6">Asigna la fecha, hora, árbitro y cancha para el partido</p>
                  <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                      <div className="flex-1">
                        <label className="block text-white/80 mb-1 font-semibold">Fecha</label>
                        <input type="date" className="w-full rounded-lg px-4 py-2 bg-[#0e2347] text-white border border-[#144C9F]/40 focus:outline-none focus:ring-2 focus:ring-[#39D17D]" value={fecha} onChange={e => setFecha(e.target.value)} required />
                      </div>
                      <div className="flex-1">
                        <label className="block text-white/80 mb-1 font-semibold">Hora</label>
                        <input type="time" className="w-full rounded-lg px-4 py-2 bg-[#0e2347] text-white border border-[#144C9F]/40 focus:outline-none focus:ring-2 focus:ring-[#39D17D]" value={hora} onChange={e => setHora(e.target.value)} required />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                      <div className="flex-1">
                        <label className="block text-white/80 mb-1 font-semibold">Árbitro</label>
                        <select className="w-full rounded-lg px-4 py-2 bg-[#0e2347] text-white border border-[#144C9F]/40 focus:outline-none focus:ring-2 focus:ring-[#39D17D]" value={arbitro} onChange={e => setArbitro(e.target.value)} required>
                          <option value="">Selecciona un árbitro</option>
                          {arbitros.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-white/80 mb-1 font-semibold">Cancha</label>
                        <select className="w-full rounded-lg px-4 py-2 bg-[#0e2347] text-white border border-[#144C9F]/40 focus:outline-none focus:ring-2 focus:ring-[#39D17D]" value={cancha} onChange={e => setCancha(e.target.value)} required>
                          <option value="">Selecciona una cancha</option>
                          {canchas.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="mt-4 bg-[#39D17D] hover:bg-[#2fa364] text-white font-bold py-2 px-6 rounded-lg shadow transition-all">Guardar Configuración</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
