import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';

/**
 * Botón de volver fijo en la esquina superior izquierda.
 * Posicionado debajo del navbar/topbar (top-[88px]) en todas las pantallas.
 */
export function BackButton({ to }: { to?: string } = {}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => to ? navigate(to) : navigate(-1)}
      aria-label="Volver a la pantalla anterior"
      style={{ position: 'fixed', top: '88px', left: '16px', zIndex: 100 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 text-sm hover:bg-white/15 hover:text-white transition-all"
    >
      <ChevronLeft className="w-4 h-4" />
      <span>Volver</span>
    </button>
  );
}
