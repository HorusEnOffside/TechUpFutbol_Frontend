
import { User, Users, Calendar, AlertCircle, DollarSign, Loader2, ChartColumnBig, History } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparentNoBack";
import { PagoPendienteCard } from "../components/PagoPendienteCard";
import { QuickActionButton } from "../components/QuickActionButton";
import canchaImg from "../assets/cancha.png";
// import { usePendingPayments } from "../hooks/usePendingPayments";
import { useNavigate } from "react-router";



export default function OrganizadorHomePage() {
  const navigate = useNavigate();
  // Lista quemada de pagos pendientes
  const pagosPendientes = [
    {
      id: '1',
      status: 'PENDING',
      description: 'Equipo Los Tigres',
      paymentDate: '2026-04-15 10:30',
      urlComprobante: '',
      monto: 80000,
    },
    {
      id: '2',
      status: 'PENDING',
      description: 'Equipo Los Leones',
      paymentDate: '2026-04-14 15:00',
      urlComprobante: '',
      monto: 90000,
    },
  ];
  const loading = false;
  const error = null;
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
          {/* Banner principal estilo Standings */}
          <section className="mb-12 mt-16">
            <div className="rounded-2xl shadow-2xl overflow-hidden border-2 border-[#144C9F]/30" style={{background: "rgba(7,31,74,0.92)"}}>
              <div className="flex flex-col items-start gap-2 px-10 py-8">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-2 bg-[#17A65B]/20 border border-[#39D17D]/40 text-[#39D17D] px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                    <span className="w-2 h-2 bg-[#39D17D] rounded-full animate-pulse" aria-hidden="true" />
                    Organizador
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">

                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Panel del Organizador</h1>
                <p className="text-base md:text-lg text-white/80">Gestiona el torneo Tech Cup Fútbol Universitario</p>
              </div>
            </div>
          </section>

          {/* Pagos pendientes y acciones rápidas */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Pagos pendientes */}
            <div className="lg:col-span-2 rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col" style={{background: "rgba(7,31,74,0.92)"}}>
              <div className="flex justify-between items-center mb-4">
                <div className="text-[#17A65B] font-black text-2xl" style={{fontFamily: 'Montserrat, sans-serif'}}>Pagos Pendientes de Aprobación</div>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white font-bold">{pagosPendientes.length}</span>
              </div>
              <div className="text-base text-white/80 mb-4">Revisa y aprueba los pagos de los equipos</div>
              <div className="flex flex-col gap-3 min-h-[120px]">
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
                {!loading && !error && pagosPendientes.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/60">
                    <User className="w-7 h-7" />
                    <span className="text-sm">Aún no hay pagos pendientes.</span>
                  </div>
                )}
                {!loading && !error && pagosPendientes.length > 0 &&
                  pagosPendientes
                    .filter((pago) => pago.status === 'PENDING')
                    .map((pago) => (
                      <PagoPendienteCard
                        key={pago.id}
                        equipo={pago.description}
                        monto={pago.monto}
                        fecha={pago.paymentDate}
                        onVer={() => navigate('/organizador/Payments')}
                        revisarMode
                      />
                    ))}
              </div>
            </div>
            {/* Acciones rápidas */}
            <div className="rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col gap-4 h-fit" style={{background: "rgba(7,31,74,0.92)"}}>
              <div className="text-[#39D17D] font-black text-2xl mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>Acciones Rápidas</div>
              <QuickActionButton label="Crear Torneo" icon={<Calendar className="w-5 h-5" />} primary onClick={() => {navigate('/organizador/creacion-torneo')}} />
              <QuickActionButton label="Revisar Pagos" icon={<DollarSign className="w-5 h-5" />} onClick={() => navigate('/organizador/Payments')} primary={false} />
              <QuickActionButton label="Ver Equipos" icon={<Users className="w-5 h-5" />} onClick={() => {}} primary={false} />
              <QuickActionButton label="Reportes" icon={<ChartColumnBig className="w-5 h-5" />} onClick={() => {}} primary={false} />
              <QuickActionButton label="Historial Torneos" icon={<History className="w-5 h-5" />} onClick={() => {}} primary={false} />
            </div>
          </section>
        </div>
    </div>
  );
}
