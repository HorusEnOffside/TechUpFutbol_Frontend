import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import sjBg   from '../assets/sj_bg.png';
import sjLogo from '../assets/sj_logo.png';

import { PlayerCard }  from '../components/jugadores/PlayerCard';
import { FilterLabel } from '../components/jugadores/FilterLabel';
import { useJugadores } from '../hooks/useJugadores';
import { POSICIONES } from '../types/jugador';

// --- Componentes de Estado ---
function CardSkeleton() {
  return <div className="rounded-2xl animate-pulse" style={{ width: 155, height: 210, background: 'rgba(255,255,255,0.08)' }} />;
}

export function SeleccionJugadoresPage() {
  const navigate = useNavigate();
  const {
    filtered, selected, addedIds,
    isLoading: isFetching, error: fetchError,
    filtros, setFiltro, resetFiltros,
    selectJugador, addJugador, retry,
  } = useJugadores();

  // Estados para el proceso de envío
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lógica de Reglas de Negocio (Heurística de Equipo)
  const total = addedIds.length;
  const cumpleHeuristica = total >= 7 && total <= 12;

  const confirmarEquipo = async () => {
    if (!cumpleHeuristica) return;

    setIsSending(true);
    setErrorMessage(null);

    try {
      // Simulación de envío masivo al backend
      await new Promise(res => setTimeout(res, 1500)); 
      setShowSuccessModal(true);
    } catch (err: any) {
      setErrorMessage(err.response?.data || "Error al procesar las solicitudes.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <img src={sjBg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* ── Sidebar Izquierdo con Filtros ── */}
      <aside className="absolute left-0 top-0 h-full flex flex-col z-30" style={{ width: 243, background: 'rgba(0,0,0,0.90)' }}>
        <div className="px-4 pt-4 pb-2 flex-shrink-0">
          <img src={sjLogo} alt="TechCup" className="h-14 w-auto object-contain" />
        </div>

        <div className="flex flex-col gap-4 px-4 py-3 overflow-y-auto flex-1 relative z-10">
          <FilterLabel label="Posición">
            <select value={filtros.posicion} onChange={(e) => setFiltro('posicion', e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500">
              {POSICIONES.map((p) => <option key={p.value} value={p.value} style={{ background: '#1a1a1a' }}>{p.label}</option>)}
            </select>
          </FilterLabel>

          <FilterLabel label="Semestre">
            <input type="number" min={1} max={12} value={filtros.semestre} onChange={(e) => setFiltro('semestre', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500" />
          </FilterLabel>

          <FilterLabel label="Edad">
            <input type="number" min={15} max={60} value={filtros.edad} onChange={(e) => setFiltro('edad', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500" />
          </FilterLabel>

          <FilterLabel label="Genero:">
            <select value={filtros.genero} onChange={(e) => setFiltro('genero', e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500">
              <option value="" style={{ background: '#1a1a1a' }}>Todos</option>
              <option value="M" style={{ background: '#1a1a1a' }}>Masculino</option>
              <option value="F" style={{ background: '#1a1a1a' }}>Femenino</option>
            </select>
          </FilterLabel>

          <FilterLabel label="Nombre">
            <input type="text" placeholder="Buscar..." value={filtros.nombre} onChange={(e) => setFiltro('nombre', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500" />
          </FilterLabel>

          <FilterLabel label="Identificación">
            <input type="text" placeholder="ID Jugador" value={filtros.identificacion} onChange={(e) => setFiltro('identificacion', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500" />
          </FilterLabel>

          <button onClick={resetFiltros} className="text-green-400/70 hover:text-green-400 text-[11px] underline text-left font-bold" style={{ fontFamily: 'Russo One' }}>
            Limpiar filtros
          </button>
        </div>
      </aside>

      {/* ── Contenido Principal ── */}
      <main className="absolute top-0 right-0 bottom-0 flex flex-col z-10" style={{ left: 243 }}>
        
        {/* Header Transparente con Degradado */}
        <header className="flex items-center justify-between px-8 flex-shrink-0 z-20" 
          style={{ 
            height: 90, 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)' 
          }}>
          <h1 style={{ fontFamily: 'Russo One', fontSize: 28, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Selección de Equipo
          </h1>
          
          <div className={`px-4 py-1.5 rounded-full border text-[11px] font-bold backdrop-blur-md transition-colors ${
            cumpleHeuristica 
              ? 'border-green-500 text-green-400 bg-green-500/20' 
              : 'border-red-500/40 text-red-400 bg-black/40'
          }`}>
            {cumpleHeuristica ? 'EQUIPO VÁLIDO' : `MÍNIMO 7 JUGADORES (${total}/7)`}
          </div>
        </header>

        {/* Zona de Cards con fondo traslúcido */}
        <div className="flex-1 overflow-y-auto px-8 pb-10 pt-2" 
          style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)' }}>
          
          {isFetching ? (
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))' }}>
              {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))' }}>
              {filtered.map((j) => (
                <PlayerCard
                  key={j.id}
                  jugador={j}
                  selected={addedIds.includes(j.id)}
                  onClick={() => selectJugador(j.id)}
                  onAdd={(e) => { e.stopPropagation(); addJugador(j.id); }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer de Confirmación */}
        {total > 0 && (
          <footer className="flex items-center justify-between px-8 py-4 flex-shrink-0" 
            style={{ background: 'rgba(0,0,0,0.95)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex flex-col">
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Russo One' }}>{total} SELECCIONADOS</span>
              {errorMessage && <span className="text-red-500 text-xs font-bold">{errorMessage}</span>}
            </div>

            <button
              onClick={confirmarEquipo}
              disabled={!cumpleHeuristica || isSending}
              className={`px-10 py-3 rounded-lg text-white font-bold transition-all flex items-center gap-3 ${
                cumpleHeuristica && !isSending ? 'hover:scale-105 shadow-lg shadow-green-900/20' : 'opacity-30 grayscale'
              }`}
              style={{
                fontFamily: 'Russo One',
                background: cumpleHeuristica ? 'linear-gradient(to right, #04156B, #046B10)' : '#222',
              }}
            >
              {isSending ? 'ENVIANDO SOLICITUDES...' : 'CONFIRMAR EQUIPO →'}
            </button>
          </footer>
        )}
      </main>

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-green-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
            <div className="text-6xl mb-4">⚽</div>
            <h2 className="text-2xl text-white mb-2" style={{ fontFamily: 'Russo One' }}>¡SOLICITUDES ENVIADAS!</h2>
            <p className="text-gray-400 text-sm mb-6">
              Se han generado {total} invitaciones correctamente para tu equipo en <strong>TechCup</strong>.
            </p>
            <button
              onClick={() => navigate('/player/menu')}
              className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
              style={{ fontFamily: 'Russo One' }}
            >
              VOLVER AL MENÚ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}