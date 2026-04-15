
import { User, Users, Calendar, AlertCircle, DollarSign } from "lucide-react";
import { AuthenticatedLayout } from "../components/AuthenticatedLayout";
import { ResumenCard } from "../components/ResumenCard";
import { PagoPendienteCard } from "../components/PagoPendienteCard";
import { QuickActionButton } from "../components/QuickActionButton";
import bgImage from '../assets/Background1.png';



export default function OrganizadorHomePage() {
  // Datos de ejemplo
  const pagosPendientes = [
    { equipo: "Sistemas FC", monto: 2000, fecha: "11/4/2026" },
    { equipo: "Industrial United", monto: 2000, fecha: "12/4/2026" },
    { equipo: "Electrónica FC", monto: 2000, fecha: "13/4/2026" },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Fondo */}
      <div className="absolute inset-0 w-full h-full -z-10" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      
      <AuthenticatedLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Banner principal */}
          <section className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#144C9F] to-[#17A65B] text-white rounded-full text-xs font-semibold mb-4">Organizador</span>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Panel de Administración</h1>
            <p className="text-lg text-gray-700">Gestiona el torneo Tech Cup Fútbol Universitario</p>
          </section>

          {/* Pagos pendientes y acciones rápidas */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Pagos pendientes */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[#17A65B] font-bold text-lg">Pagos Pendientes de Aprobación</div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">{pagosPendientes.length} pendientes</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">Revisa y aprueba los pagos de los equipos</div>
              <div className="flex flex-col gap-3">
                {pagosPendientes.map((pago) => (
                  <PagoPendienteCard key={pago.equipo} {...pago} onVer={() => {}} onAprobar={() => {}} onRechazar={() => {}} />
                ))}
              </div>
            </div>
            {/* Acciones rápidas */}
            <div className="bg-white rounded-2xl p-8 shadow border border-gray-100 flex flex-col gap-4 h-fit">
              <div className="text-[#144C9F] font-bold text-lg mb-2">Acciones Rápidas</div>
              <QuickActionButton label="Crear Torneo" icon={<Calendar className="w-5 h-5" />} primary onClick={() => {}} />
              <QuickActionButton label="Revisar Pagos" icon={<DollarSign className="w-5 h-5" />} onClick={() => {}} primary={false} />
              <QuickActionButton label="Ver Equipos" icon={<Users className="w-5 h-5" />} onClick={() => {}} primary={false} />
              <QuickActionButton label="Reportes" icon={<User className="w-5 h-5" />} onClick={() => {}} primary={false} />
            </div>
          </section>
        </div>
      </AuthenticatedLayout>
    </div>
  );
}
