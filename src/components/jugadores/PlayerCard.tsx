import { useState } from 'react';
import type { Jugador } from '../../types/jugador';

interface PlayerCardProps {
  jugador: Jugador;
  selected: boolean;
  onClick: () => void;
  onAdd: (e: React.MouseEvent) => void;
}

export function PlayerCard({ jugador, selected, onClick, onAdd }: PlayerCardProps) {
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
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Cara frontal ── */}
        <div
          onClick={onClick}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            border: selected ? '3px solid #17A65B' : '1px solid rgba(255,255,255,0.2)',
            boxShadow: selected
              ? '0 0 25px rgba(23,166,91,0.7)'
              : '0 15px 35px rgba(0,0,0,0.5)',
          }}
        >
          <img
            src={jugador.foto}
            alt={jugador.nombre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          {/* Posición badge */}
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded border border-white/10 bg-black/70 text-white text-[10px] font-bold italic"
            style={{ fontFamily: 'Russo One' }}
          >
            {jugador.posicion}
          </span>

          {/* Nombre y carrera */}
          <div className="absolute bottom-3 left-0 right-0 text-center px-2">
            <p
              className="text-white text-[12px] leading-tight truncate uppercase italic"
              style={{ fontFamily: 'Russo One' }}
            >
              {jugador.nombre}
            </p>
            <p className="text-green-500 text-[9px] mt-0.5 truncate font-bold uppercase tracking-wider">
              {jugador.carrera}
            </p>
          </div>
        </div>

        {/* ── Cara trasera ── */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl flex flex-col p-3 shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(145deg, #050505, #151515)',
            border: selected ? '3px solid #17A65B' : '1px solid rgba(255,255,255,0.4)',
          }}
        >
          <div className="flex flex-col h-full">
            <div className="border-b border-green-500/40 pb-1 mb-2">
              <p
                className="text-green-500 text-[10px] uppercase font-bold text-center"
                style={{ fontFamily: 'Russo One' }}
              >
                PERFIL TÉCNICO
              </p>
            </div>

            <div className="flex flex-col gap-2 flex-1 justify-center">
              {(
                [
                  ['ID', jugador.identificacion.slice(-4)],
                  ['Edad', `${jugador.edad} años`],
                  ['Semestre', `${jugador.semestre}º`],
                  ['Género', jugador.genero === 'M' ? 'Masculino' : 'Femenino'],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between items-center border-b border-white/5 pb-1"
                >
                  <span className="text-[8px] text-white/50 uppercase font-bold tracking-tighter">
                    {k}:
                  </span>
                  <span
                    className="text-[9px] text-white font-bold"
                    style={{ fontFamily: 'Russo One' }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onAdd}
              className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-white text-[10px] font-black italic uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_0_15px_rgba(22,163,74,0.4)]"
              style={{ fontFamily: 'Russo One' }}
            >
              Añadir
            </button>

            <div
              className="mt-2 pt-1 text-center opacity-30 uppercase text-[7px] tracking-[0.2em]"
              style={{ fontFamily: 'Russo One' }}
            >
              TechCup ECI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
