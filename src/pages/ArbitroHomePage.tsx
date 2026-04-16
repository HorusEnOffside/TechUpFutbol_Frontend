import { useNavigate } from 'react-router';
import '../styles/player.css';
import { useAuth } from '../store/AuthContext';

import { Users, Calendar} from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import canchaImg from "../assets/cancha.png";


  // Simulación de partidos asignados al árbitro
  const partidos = [
    {
      id: 1,
      fecha: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana
      equipoA: "Los Tigres",
      equipoB: "Los Leones",
      hora: "10:00 a. m.",
      cancha: "Cancha 1",
    },
    {
      id: 2,
      fecha: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana
      equipoA: "Las Águilas",
      equipoB: "Los Halcones",
      hora: "12:00 p. m.",
      cancha: "Cancha 2",
    },
    {
      id: 3,
      fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Pasado mañana
      equipoA: "Los Pumas",
      equipoB: "Los Jaguares",
      hora: "9:00 a. m.",
      cancha: "Cancha 1",
    },
  ];

  // Agrupar partidos por fecha (formato: 'D/M/YYYY')
  const partidosPorFecha: { [fecha: string]: typeof partidos } = {};
  partidos.forEach((p) => {
    const key = p.fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'numeric', year: 'numeric' });
    if (!partidosPorFecha[key]) partidosPorFecha[key] = [];
    partidosPorFecha[key].push(p);
  });

export default function ArbitroHomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();



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
                        Arbitro
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white/40 text-xs"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Panel del Arbitro</h2>
                    <p className="text-base md:text-lg text-white/80">Bienvenido al panel del arbitro, aquí puedes gestionar tus partidos responsables.</p>
                  </div>
                </div>
                
              </div>
            </section>


            
            {/* Próximos partidos */}
            <section className="mb-12">
              <div className="rounded-2xl shadow-2xl border-2 border-[#144C9F]/30 bg-[#071F4A]/80 p-8">
                <h3 className="text-2xl font-bold text-[#39D17D] mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>Próximos partidos que arbitras</h3>
                {Object.keys(partidosPorFecha).length === 0 && (
                  <div className="text-white/60 text-center py-8">No tienes partidos asignados próximamente.</div>
                )}
                <div className="flex flex-col gap-8">
                  {Object.entries(partidosPorFecha).map(([fecha, lista]) => (
                    <div key={fecha}>
                      <div className="text-lg font-bold text-white mb-3 border-l-4 border-[#39D17D] pl-3">{fecha}</div>
                      <div className="flex flex-col gap-4">
                        {lista.map((p) => (
                          <div key={p.id} className="rounded-xl bg-white/10 border border-white/20 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                              <span className="font-bold text-white text-base">{p.equipoA} <span className="text-white/60 font-normal">vs</span> {p.equipoB}</span>
                              <span className="text-white/80 text-sm flex items-center gap-1"><Calendar className="w-4 h-4 inline" /> {p.hora}</span>
                              <span className="text-white/80 text-sm flex items-center gap-1"><Users className="w-4 h-4 inline" /> {p.cancha}</span>
                            </div>
                          </div>
                        ))}
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
