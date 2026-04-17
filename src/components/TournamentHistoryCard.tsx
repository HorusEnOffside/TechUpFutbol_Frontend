import React from "react";

interface TournamentHistoryCardProps {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  jugadores: number;
  costoInscripcion: number;
}




export const TournamentHistoryCard: React.FC<TournamentHistoryCardProps> = ({
  nombre,
  fechaInicio,
  fechaFin,
  jugadores,
  costoInscripcion,
}) => {
  return (
    <div className="flex flex-col gap-3 text-white">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
        <div className="font-black text-2xl text-[#39D17D]">{nombre}</div>
      </div>
      <div className="flex flex-wrap gap-6 text-white/80 text-base">
        <div>
          <span className="font-semibold">Inicio:</span> <span className="font-bold">{new Date(fechaInicio).toLocaleDateString('es-CO')}</span>
        </div>
        <div>
          <span className="font-semibold">Fin:</span> <span className="font-bold">{new Date(fechaFin).toLocaleDateString('es-CO')}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 text-white/80 text-base">
        <div>
          <span className="font-semibold">Jugadores:</span> <span className="font-bold">{jugadores}</span>
        </div>
        <div>
          <span className="font-semibold">Inscripción:</span> <span className="font-bold">${costoInscripcion}</span>
        </div>
      </div>
    </div>
  );
};
