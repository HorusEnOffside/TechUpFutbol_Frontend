
import { User, Users, Calendar, AlertCircle, DollarSign, Loader2, ArrowLeft } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import { PagoDetalleCard } from "../components/PagoDetalleCard";
import { QuickActionButton } from "../components/QuickActionButton";

import canchaImg from "../assets/cancha.png";
import { useNavigate } from "react-router";

import { useState, useEffect } from "react";

export default function OrganizadorPaymentManagement() {
  const navigate = useNavigate();
  // Simulación de pagos pendientes
  const pagosPendientes = [
    {
      id: '10000088456',
      status: 'PENDING' as const,
      equipo: 'Los Tigres',
      description: 'Monto de $80.000 confirmado. Inscripción exitosa para la fase de grupos.',
      descripcionComprobante: 'Pago realizado por el equipo Los Tigres. Referencia: 123456.',
      paymentDate: '2026-04-15T10:30:00Z',
    },
    {
      id: '10000088457',
      status: 'PENDING' as const,
      equipo: 'Los Leones',
      description: 'Pago pendiente de verificación.',
      descripcionComprobante: 'Pago realizado por el equipo Los Leones. Referencia: 654321.',
      paymentDate: '2026-04-14T15:00:00Z',
    },
    {
      id: '10000088458',
      status: 'PENDING' as const,
      equipo: 'Las Águilas',
      description: 'Pago recibido, falta comprobante.',
      descripcionComprobante: 'Pago realizado por el equipo Las Águilas. Referencia: 789012.',
      paymentDate: '2026-04-13T18:45:00Z',
    }
    
  ];
  const [busqueda, setBusqueda] = useState("");
  const [pagoSeleccionado, setPagoSeleccionado] = useState<typeof pagosPendientes[0] | null>(null);

  // Limpiar selección si el pago seleccionado ya no está en la lista filtrada
  useEffect(() => {
    if (pagoSeleccionado && !pagosFiltrados.some(p => p.id === pagoSeleccionado.id)) {
      setPagoSeleccionado(null);
    }
  }, [busqueda]);

  // Filtrar pagos por nombre de equipo
  const pagosFiltrados = pagosPendientes.filter(p =>
    p.equipo.toLowerCase().includes(busqueda.toLowerCase())
  );

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
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Gestión de Pagos</h2>
                    <p className="text-base md:text-lg text-white/80">Gestiona los pagos</p>
                  </div>
                </div>
                {/* Acciones rápidas */}
                <div className="w-full lg:w-[340px] rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col gap-4 h-fit" style={{background: "rgba(7,31,74,0.92)"}}>
                  <div className="text-[#39D17D] font-black text-2xl mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>Acciones Rápidas</div>
                  <QuickActionButton label="Historial de Pagos" icon={<Calendar className="w-5 h-5" />} primary onClick={() => { navigate('/organizador/historial-pagos') }} />
                  <QuickActionButton label="Volver" icon={<ArrowLeft className="w-5 h-5" />} onClick={() => navigate('/organizador')} primary={false} />
                </div>
              </div>
            </section>

          

          {/* Layout maestro: lateral izquierda (buscador + lista), lateral derecha (detalle o mensaje) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Lateral izquierda: buscador y lista */}
            <div className="col-span-1 rounded-2xl p-6 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col gap-4 bg-[#071F4A]/80 min-h-[400px]">
              <input
                type="text"
                placeholder="Buscar equipo..."
                className="mb-4 px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#39D17D]"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] scrollbar-hide">
                {pagosFiltrados.length === 0 && (
                  <div className="text-white/60 text-center py-8">No hay pagos para mostrar.</div>
                )}
                {pagosFiltrados.map((pago) => (
                  <button
                    key={pago.id}
                    type="button"
                    className={`flex flex-col items-start w-full text-left rounded-lg px-4 py-3 border bg-white/5 hover:bg-[#144C9F]/40 transition
                      ${pagoSeleccionado && pagoSeleccionado.id === pago.id
                        ? 'bg-[#144C9F] border-4 border-[#39FFB0] shadow-lg text-white'
                        : 'border border-white/10'}
                    `}
                    onClick={() => setPagoSeleccionado(pago)}
                  >
                    <span className="font-bold text-white text-base">{pago.equipo}</span>
                    <span className="text-xs text-white/60">{new Date(pago.paymentDate).toLocaleDateString()} {new Date(pago.paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Lateral derecha: detalle o mensaje */}
            <div className="col-span-2 rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col justify-center items-center bg-[#071F4A]/80 min-h-[400px]">
              {!pagoSeleccionado ? (
                <div className="text-white/60 text-lg text-center">Escoge un pago de la lista para revisarlo.</div>
              ) : (
                <PagoDetalleCard
                  id={pagoSeleccionado.id}
                  status={pagoSeleccionado.status}
                  description={pagoSeleccionado.description}
                  descripcionComprobante={pagoSeleccionado.descripcionComprobante}
                  monto={undefined}
                  fecha={pagoSeleccionado.paymentDate}
                  onAprobar={() => {}}
                  onRechazar={() => {}}
                />
              )}
            </div>
          </section>
        </div>
    </div>
  );
}
