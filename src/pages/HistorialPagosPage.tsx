
import { User, Users, Calendar, AlertCircle, DollarSign, Loader2, ArrowLeft, Home } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import { PagoHistorialCard } from "../components/PagoHistorialCard";
import { QuickActionButton } from "../components/QuickActionButton";

import canchaImg from "../assets/cancha.png";

import { useAllPayments } from "../hooks/usePendingPayments";
import type { PaymentStatus } from "../types/payment";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HistorialPagosPage() {
  const navigate = useNavigate();
  // Estado de filtro interactivo
  const [filtro, setFiltro] = useState<'ALL' | PaymentStatus>('ALL');
  const { payments: pagosHistorial, loading, error } = useAllPayments();

  const etiquetasEstado = {
    ALL: 'Todos',
    PENDING: 'Pendiente',
    IN_REVIEW: 'En revisión',
    APPROVED: 'Aprobado',
    REJECTED: 'Rechazado',
  };

  const pagosFiltrados = filtro === 'ALL'
    ? pagosHistorial
    : pagosHistorial.filter((p) => p.status === filtro);

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
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Historial de Pagos</h2>
                    <p className="text-base md:text-lg text-white/80">Revisa el historial de los pagos</p>
                  </div>
                </div>
              </div>
            </section>


          <section className="grid gap-8 mb-16">
            {/* Pagos pendientes */}
            <div className="lg:col-span-2 rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col" style={{background: "rgba(7,31,74,0.92)"}}>
              
              <div className="flex flex-col gap-3 min-h-[120px]">
                {/* Filtros tipo viñetas */}
                <div className="flex gap-2 mb-4">
                  {(['ALL', 'PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED'] as const).map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setFiltro(key)}
                      className={`px-3 py-1 rounded-full border-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#39D17D] ${filtro === key ? 'bg-[#144C9F] border-[#39D17D] text-[#39D17D]' : 'bg-transparent border-white/20 text-white/60 hover:border-[#39D17D]/60'}`}
                    >
                      {etiquetasEstado[key]}
                    </button>
                  ))}
                </div>
                {loading && (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                    <Loader2 className="w-7 h-7 animate-spin text-[#39D17D]" />
                    <span className="text-sm">Cargando pagos…</span>
                  </div>
                )}
                {!loading && error && (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                    <AlertCircle className="w-7 h-7 text-red-400" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                {!loading && !error && pagosFiltrados.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                    <User className="w-7 h-7" />
                    <span className="text-sm">No hay pagos para mostrar.</span>
                  </div>
                )}
                {!loading && !error && pagosFiltrados.length > 0 && pagosFiltrados.map((pago) => (
                  <PagoHistorialCard
                    key={pago.id}
                    id={pago.id}
                    status={pago.status}
                    description={pago.description}
                    descripcionComprobante={pago.description}
                    monto={undefined}
                    fecha={pago.paymentDate}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}
