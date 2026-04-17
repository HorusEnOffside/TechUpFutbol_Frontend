import { useState } from 'react';
import type { Jugador } from '../../types/jugador';
import cartaVacia from '../../assets/CartaVacia.png';

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
          <img src={jugador.foto} alt={jugador.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded border border-white/10 bg-black/70 text-white text-[10px] font-bold italic"
            style={{ fontFamily: 'Russo One' }}
          >
            {jugador.posicion}
          </span>

          <div className="absolute bottom-3 left-0 right-0 text-center px-2">
            <p className="text-white text-[12px] leading-tight truncate uppercase italic" style={{ fontFamily: 'Russo One' }}>
              {jugador.nombre}
            </p>
            <p className="text-green-500 text-[9px] mt-0.5 truncate font-bold uppercase tracking-wider">
              {jugador.carrera}
            </p>
          </div>
        </div>

        {/* ── Cara trasera — CartaVacia como silueta ── */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Carta vacía — contiene su propia forma/transparencia */}
          <img
            src={cartaVacia}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'contain',
              filter: selected ? 'drop-shadow(0 0 10px rgba(23,166,91,0.8))' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.7))',
            }}
          />

          {/* Contenido dentro de la silueta de la carta */}
          <div className="absolute inset-0 flex flex-col justify-center gap-2"
            style={{ padding: '30px 22px 45px' }}>

            <div className="flex flex-col gap-[4px]">
              {(
                [
                  ['ID',       jugador.identificacion.slice(-4)],
                  ['Edad',     `${jugador.edad} años`],
                  ['Semestre', `${jugador.semestre}º`],
                  ['Género',   jugador.genero === 'M' ? 'Masc.' : 'Fem.'],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 pb-[3px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)', marginRight: 10 }}>
                  <span className="text-[8px] text-white/50 uppercase font-bold w-14 flex-shrink-0" style={{ fontFamily: 'Russo One' }}>{k}</span>
                  <span className="text-[9px] text-white font-bold" style={{ fontFamily: 'Russo One' }}>{v}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onAdd}
              className="w-3/4 mx-auto py-1 rounded-md text-white text-[8px] font-black uppercase tracking-widest hover:brightness-125 transition-all"
              style={{ fontFamily: 'Russo One', background: 'linear-gradient(to right, #04156B, #046B10)' }}
            >
              Añadir
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
