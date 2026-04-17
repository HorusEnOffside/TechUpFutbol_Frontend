import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BarChart2 } from 'lucide-react';
import { NavBarTransparent } from '../components/NavBarTransparent';
import canchaImg from '../assets/cancha.png';

type Tab = 'goleadores' | 'asistidores' | 'porteros' | 'amarillas' | 'rojas';

const TABS: { id: Tab; label: string; statCol: string }[] = [
  { id: 'goleadores',  label: 'Goleadores',   statCol: 'Goles'         },
  { id: 'asistidores', label: 'Asistidores',  statCol: 'Asistencias'   },
  { id: 'porteros',    label: 'Port. imbat.', statCol: 'P. Imbatidos'  },
  { id: 'amarillas',   label: 'Amarillas',    statCol: 'Amarillas'     },
  { id: 'rojas',       label: 'Rojas',        statCol: 'Rojas'         },
];

export function EstadisticasPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('goleadores');
  const [teamId, setTeamId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedTeamId = localStorage.getItem('teamId');
    setTeamId(savedTeamId);
    setChecked(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050d1a]">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${canchaImg})`,
          filter: 'blur(3px) brightness(0.35)',
          transform: 'scale(1.06)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(5,13,26,0.92) 0%, rgba(7,31,74,0.75) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 85% 55%, rgba(23,166,91,0.22) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <NavBarTransparent onLogoClick={() => navigate('/player/menu')} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Sin equipo */}
        {checked && !teamId && (
          <div
            className="w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center py-20 gap-4"
            style={{ background: 'rgba(5, 13, 26, 0.70)', backdropFilter: 'blur(16px)' }}
          >
            <BarChart2 className="w-10 h-10 text-white/30" />
            <p className="text-white/60 text-base text-center" style={{ fontFamily: "'Russo One', sans-serif" }}>
              Primero debes crear un equipo
            </p>
            <button
              onClick={() => navigate('/player/capitanes')}
              className="mt-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #144C9F, #17A65B)' }}
            >
              Ir a Capitanes
            </button>
          </div>
        )}

        {/* Tarjeta */}
        {checked && teamId && (
        <div
          className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: 'rgba(5, 13, 26, 0.70)', backdropFilter: 'blur(16px)' }}
        >
          {/* Encabezado título */}
          <div
            className="px-6 sm:px-8 py-5 flex items-center gap-3"
            style={{
              borderRadius: '20px',
              background: 'linear-gradient(90deg, rgba(4,107,16,0.90) 0%, rgba(4,21,107,0.90) 100%)',
            }}
          >
            <BarChart2 className="w-6 h-6 text-white shrink-0" aria-hidden="true" />
            <h1
              className="text-white text-2xl sm:text-3xl tracking-wide"
              style={{ fontFamily: "'Russo One', sans-serif" }}
            >
              Estadísticas
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-white/10" style={{ background: 'rgba(7,31,74,0.4)' }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-white/45 hover:text-white/70'
                }`}
                style={{ fontFamily: "'Russo One', sans-serif" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b border-white/10 text-white/60 text-xs uppercase tracking-widest"
                  style={{ background: 'rgba(7,31,74,0.55)' }}
                >
                  {['Jugador', 'Equipo', TABS.find(t => t.id === activeTab)!.statCol, 'Partidos'].map((col) => (
                    <th
                      key={col}
                      className={`py-4 font-semibold select-none ${col === 'Jugador' ? 'text-left px-6' : 'text-center px-4'}`}
                      style={{ fontFamily: "'Russo One', sans-serif" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* Próximamente */}
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/50">
            <BarChart2 className="w-8 h-8" />
            <p className="text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>
              Próximamente
            </p>
          </div>
        </div>
        )}

      </main>
    </div>
  );
}
