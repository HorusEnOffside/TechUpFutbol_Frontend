import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Trophy, GitBranch } from 'lucide-react';
import { NavBarTransparent } from '../components/NavBarTransparent';
import canchaImg from '../assets/cancha.png';

type Tab = 'GRUPOS' | 'LLAVES';

export function GruposPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('GRUPOS');

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

        {/* Tarjeta */}
        <div
          className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: 'rgba(5, 13, 26, 0.70)', backdropFilter: 'blur(16px)' }}
        >
          {/* Encabezado con tabs */}
          <div
            className="px-6 sm:px-8 py-5 flex items-center gap-6"
            style={{
              borderRadius: '20px',
              background: 'linear-gradient(90deg, rgba(4,107,16,0.90) 0%, rgba(4,21,107,0.90) 100%)',
            }}
          >
            <button
              onClick={() => setActiveTab('GRUPOS')}
              className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
                activeTab === 'GRUPOS'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              <Trophy className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-xl sm:text-2xl tracking-wide" style={{ fontFamily: "'Russo One', sans-serif" }}>
                Grupos
              </span>
            </button>

            <button
              onClick={() => setActiveTab('LLAVES')}
              className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
                activeTab === 'LLAVES'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              <GitBranch className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-xl sm:text-2xl tracking-wide" style={{ fontFamily: "'Russo One', sans-serif" }}>
                Llaves
              </span>
            </button>
          </div>

          {/* Contenido */}
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50">
            {activeTab === 'GRUPOS' ? (
              <Trophy className="w-8 h-8" />
            ) : (
              <GitBranch className="w-8 h-8" />
            )}
            <p className="text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>
              Próximamente
            </p>
          </div>
        </div>

        <p className="mt-6 text-white/30 text-xs text-center">
          Los 3 primeros equipos de cada grupo clasifican a las llaves eliminatorias
        </p>
      </main>
    </div>
  );
}
