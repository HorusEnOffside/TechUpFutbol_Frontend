import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import sjBg from '../assets/sj_bg.png';
import sjLogo from '../assets/sj_logo.png';
import p1 from '../assets/sj_player1.png';
import p2 from '../assets/sj_player2.png';
import p3 from '../assets/sj_player3.png';
import p4 from '../assets/sj_player4.png';
import p5 from '../assets/sj_player5.png';
import p6 from '../assets/sj_player6.png';

// ─── Tipos y Datos ───────────────────────────────────────────────────────────
type Posicion = 'DL' | 'DF' | 'MD' | 'AR';
type Genero = 'M' | 'F';

interface Jugador {
  id: number;
  nombre: string;
  carrera: string;
  posicion: Posicion;
  semestre: number;
  edad: number;
  genero: Genero;
  identificacion: string;
  foto: string;
}

const JUGADORES: Jugador[] = [
  { id: 1, nombre: 'Juan David', carrera: 'Ing. Sistemas', posicion: 'DL', semestre: 6, edad: 21, genero: 'M', identificacion: '1001234567', foto: p1 },
  { id: 2, nombre: 'Manuel', carrera: 'Ing. Sistemas', posicion: 'DF', semestre: 4, edad: 20, genero: 'M', identificacion: '1002345678', foto: p2 },
  { id: 3, nombre: 'Daniel', carrera: 'Ing. Sistemas', posicion: 'MD', semestre: 8, edad: 23, genero: 'M', identificacion: '1003456789', foto: p3 },
  { id: 4, nombre: 'Mariana', carrera: 'Ing. Estadística', posicion: 'DL', semestre: 5, edad: 22, genero: 'F', identificacion: '1004567890', foto: p4 },
  { id: 5, nombre: 'Tatiana', carrera: 'Ing. Estadística', posicion: 'AR', semestre: 3, edad: 19, genero: 'F', identificacion: '1005678901', foto: p5 },
  { id: 6, nombre: 'Marcos', carrera: 'Ing. Sistemas', posicion: 'DF', semestre: 7, edad: 24, genero: 'M', identificacion: '1006789012', foto: p6 },
];

const POSICIONES: { value: Posicion | ''; label: string }[] = [
  { value: '', label: 'Todas las posiciones' },
  { value: 'DL', label: 'Delantero (DL)' },
  { value: 'DF', label: 'Defensa (DF)' },
  { value: 'MD', label: 'Mediocampo (MD)' },
  { value: 'AR', label: 'Arquero (AR)' },
];

// ─── Componente de Carta Modificado ──────────────────────────

function PlayerCard({ jugador, selected, onClick, onAdd }: { jugador: Jugador; selected: boolean; onClick: () => void; onAdd: (e: React.MouseEvent) => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 transition-all duration-300"
      style={{ perspective: '1000px', width: '155px', height: '210px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full cursor-pointer transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* PARTE FRONTAL */}
        <div 
          onClick={onClick}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            border: selected ? '3px solid #17A65B' : '1px solid rgba(255,255,255,0.2)',
            boxShadow: selected ? '0 0 25px rgba(23,166,91,0.7)' : '0 15px 35px rgba(0,0,0,0.5)'
          }}
        >
          <img src={jugador.foto} alt={jugador.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded border border-white/10 text-white text-[10px] font-bold italic" style={{ fontFamily: 'Russo One' }}>
            {jugador.posicion}
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center px-2">
            <p className="text-white text-[12px] leading-tight truncate uppercase italic" style={{ fontFamily: 'Russo One' }}>{jugador.nombre}</p>
            <p className="text-green-500 text-[9px] mt-0.5 truncate font-bold uppercase tracking-wider">{jugador.carrera}</p>
          </div>
        </div>

        {/* PARTE TRASERA CON BOTÓN AÑADIR */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl flex flex-col p-3 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
            background: 'linear-gradient(145deg, #050505, #151515)',
            border: selected ? '3px solid #17A65B' : '1px solid rgba(255,255,255,0.4)',
          }}
        >
          <div className="flex flex-col h-full">
            <div className="border-b border-green-500/40 pb-1 mb-2">
              <p className="text-green-500 text-[10px] uppercase font-bold text-center" style={{ fontFamily: 'Russo One' }}>PERFIL TÉCNICO</p>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 justify-center">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-[8px] text-white/50 uppercase font-bold tracking-tighter">ID:</span>
                <span className="text-[9px] text-white font-bold" style={{ fontFamily: 'Russo One' }}>{jugador.identificacion.slice(-4)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-[8px] text-white/50 uppercase font-bold tracking-tighter">Edad:</span>
                <span className="text-[9px] text-white font-bold" style={{ fontFamily: 'Russo One' }}>{jugador.edad} AÑOS</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-[8px] text-white/50 uppercase font-bold tracking-tighter">Semestre:</span>
                <span className="text-[9px] text-white font-bold" style={{ fontFamily: 'Russo One' }}>{jugador.semestre}º</span>
              </div>
            </div>

            {/* BOTÓN AÑADIR */}
            <button 
              onClick={onAdd}
              className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-white text-[10px] font-black italic uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_0_15px_rgba(22,163,74,0.4)]"
              style={{ fontFamily: 'Russo One' }}
            >
              Añadir
            </button>
            
            <div className="mt-2 pt-1 text-center opacity-30 uppercase text-[7px] tracking-[0.2em]" style={{ fontFamily: 'Russo One' }}>TechCup ECI</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Componente Principal ────────────────────────────────────────────────────

export function SeleccionJugadoresPage() {
  const navigate = useNavigate();
  const [filtPosicion, setFiltPosicion] = useState<Posicion | ''>('');
  const [filtSemestre, setFiltSemestre] = useState('');
  const [filtEdad, setFiltEdad] = useState('');
  const [filtGenero, setFiltGenero] = useState<Genero | ''>('');
  const [filtNombre, setFiltNombre] = useState('');
  const [filtId, setFiltId] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 hover:bg-white/10";

  const filtered = useMemo(() => JUGADORES.filter(j => {
    if (filtPosicion && j.posicion !== filtPosicion) return false;
    if (filtSemestre && j.semestre !== Number(filtSemestre)) return false;
    if (filtEdad && j.edad !== Number(filtEdad)) return false;
    if (filtGenero && j.genero !== filtGenero) return false;
    if (filtNombre && !j.nombre.toLowerCase().includes(filtNombre.toLowerCase())) return false;
    if (filtId && !j.identificacion.includes(filtId)) return false;
    return true;
  }), [filtPosicion, filtSemestre, filtEdad, filtGenero, filtNombre, filtId]);

  const handleAddToTeam = (e: React.MouseEvent, jugador: Jugador) => {
    e.stopPropagation(); // Evita que se dispare el onClick de la carta
    console.log(`Añadiendo a equipo: ${jugador.nombre}`);
    alert(`${jugador.nombre} ha sido añadido a tu equipo de TechCup.`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505] flex flex-col">
      
      {/* FONDO GLOBAL */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${sjBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }} 
      />
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* HEADER TRANSPARENTE */}
      <header className="relative z-50 w-full h-20 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-10 shadow-xl">
        <div className="flex items-center gap-4">
          <img 
            src={sjLogo} 
            alt="TechCup" 
            className="h-12 w-auto object-contain cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => navigate('/player/menu')} 
          />
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-white text-3xl italic leading-none font-black" style={{ fontFamily: 'Russo One' }}>JUGADORES</h1>
          <p className="text-green-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-1">Mercado de fichajes ({filtered.length})</p>
        </div>
      </header>

      {/* CONTENEDOR INFERIOR */}
      <div className="relative z-10 flex flex-1 w-full overflow-hidden">
        
        {/* SIDEBAR SIN SCROLL */}
        <aside className="relative w-72 h-full bg-black/80 backdrop-blur-xl border-r border-white/5 flex flex-col shadow-2xl overflow-hidden">
          <div className="flex-1 px-8 py-8 space-y-6">
            <header>
              <h2 className="text-white text-lg italic uppercase font-black" style={{ fontFamily: 'Russo One' }}>FILTRAR</h2>
              <div className="h-1 w-12 bg-green-500 mt-1 rounded-full"></div>
            </header>

            <section className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Nombre</label>
                <input type="text" placeholder="Ej: Juan David..." value={filtNombre} onChange={e => setFiltNombre(e.target.value)} className={inputClasses} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Posición</label>
                <select value={filtPosicion} onChange={e => setFiltPosicion(e.target.value as Posicion | '')} className={inputClasses}>
                  {POSICIONES.map(p => <option key={p.value} value={p.value} className="bg-zinc-900">{p.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Semestre</label>
                  <input type="number" value={filtSemestre} onChange={e => setFiltSemestre(e.target.value)} className={inputClasses} placeholder="1-12" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Edad</label>
                  <input type="number" value={filtEdad} onChange={e => setFiltEdad(e.target.value)} className={inputClasses} placeholder="Edad" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Identificación</label>
                <input type="text" placeholder="Buscar ID..." value={filtId} onChange={e => setFiltId(e.target.value)} className={inputClasses} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Género</label>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                  {['', 'M', 'F'].map((g) => (
                    <button key={g} type="button" onClick={() => setFiltGenero(g as Genero | '')} className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${filtGenero === g ? 'bg-green-500 text-black' : 'text-white/50'}`} style={{ fontFamily: 'Russo One' }}>
                      {g === '' ? 'TODO' : g === 'M' ? 'MASC' : 'FEM'}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <button type="button" onClick={() => { setFiltNombre(''); setFiltPosicion(''); setFiltSemestre(''); setFiltEdad(''); setFiltGenero(''); setFiltId(''); }} className="w-full py-2 text-[10px] text-white/30 hover:text-red-400 uppercase tracking-widest font-bold">
              Limpiar Filtros
            </button>
          </div>

          <div className="p-6 border-t border-white/5 flex items-center gap-3 bg-black/40">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold shadow-lg">S</div>
            <span className="text-white/60 text-[11px] font-medium tracking-tight">Sebastián</span>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main className="flex-1 overflow-y-auto px-12 py-10 pb-40 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-16 gap-x-8 justify-items-center">
            {filtered.map(j => (
              <PlayerCard 
                key={j.id} 
                jugador={j} 
                selected={selected === j.id} 
                onClick={() => setSelected(prev => prev === j.id ? null : j.id)} 
                onAdd={(e) => handleAddToTeam(e, j)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}